import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { SiteHeader } from '@/components/site-header';
import { flattenMdx } from '@/components/problem-sections';
import { problemsSource } from '@/lib/source';

const LEVEL_LABELS = { jr: 'Junior', sr: 'Senior' };

function problemSlug(data) {
  return `${data.year}-${data.problem.toLowerCase()}`;
}

function dmojUrl(data) {
  return `https://dmoj.ca/problem/ccc${data.year % 100}${data.problem.toLowerCase()}`;
}

const metaLinkClasses =
  'text-fd-muted-foreground underline decoration-fd-muted-foreground/40 underline-offset-2 transition-colors hover:text-fd-foreground hover:decoration-fd-foreground/60';

export function generateStaticParams() {
  return problemsSource.getPages().map((page) => ({ slug: problemSlug(page.data) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = problemsSource.getPages().find((p) => problemSlug(p.data) === slug);
  if (!page) notFound();
  const { title, year, problem, level } = page.data;
  return {
    title: `Problem ${problem}: ${title}`,
    description: `Problem ${problem} from the ${year} CCC (${LEVEL_LABELS[level] ?? level}).`,
  };
}

export default async function ProblemPage({ params }) {
  const { slug } = await params;
  const page = problemsSource.getPages().find((p) => problemSlug(p.data) === slug);
  if (!page) notFound();
  const { title, year, problem, level, source } = page.data;
  // The problem's own "Problem JN: Title" h2 duplicates the page title — drop it.
  // h2 is forced native (as in ProblemSections) so the node is detectable by type.
  const flatComponents = { ...defaultMdxComponents, h2: 'h2' };
  const nodes = flattenMdx(page.data.body, flatComponents).filter((node) => node?.type !== 'h2');

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-8 pb-24">
        <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-fd-border pb-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Problem {problem}: {title}
          </h1>
          <span className="ml-auto text-xs font-normal uppercase tracking-widest text-fd-muted-foreground">
            {year} · {problem} ·{' '}
            <a href={source} target="_blank" rel="noreferrer" className={metaLinkClasses}>
              Original problem
            </a>{' '}
            ·{' '}
            <a href={dmojUrl(page.data)} target="_blank" rel="noreferrer" className={metaLinkClasses}>
              DMOJ
            </a>
          </span>
        </div>
        {/* DocsBody supplies the prose typography; 24rem figure cap gives standalone
            pages more room than the 12rem embed default */}
        <DocsBody
          className="problem-content"
          style={{ '--problem-img-w': '24rem' }}
        >
          {nodes.map((node, i) => (
            <Fragment key={i}>{node}</Fragment>
          ))}
        </DocsBody>
      </main>
    </>
  );
}
