import { notFound, redirect } from 'next/navigation';
import { DocsBody, DocsPage } from 'fumadocs-ui/layouts/docs/page';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { source } from '@/lib/source';
import { baseOptions, GITHUB_URL } from '@/lib/layout.shared';
import { Landing } from '@/components/landing';
import { WorkInProgress } from '@/components/work-in-progress';
import { WipSidebarItem } from '@/components/wip-sidebar-item';

const FREQ_LABELS = { 0: 'rare', 1: 'occasional', 2: 'common', 3: 'frequent', 4: 'very-frequent' };
const FREQ_COLORS = { 0: 'bg-red-500', 1: 'bg-orange-500', 2: 'bg-amber-500', 3: 'bg-lime-500', 4: 'bg-emerald-500' };

export function generateStaticParams() {
  return source.generateParams();
}

function firstPage(node) {
  for (const child of node.children) {
    if (child.type === 'page') return child;
    if (child.type === 'folder') {
      const found = firstPage(child);
      if (found) return found;
    }
  }
}

// The default tab walker skips root folders whose direct children are all
// folders, so build the section tabs manually.
function sectionTabs() {
  const tree = source.getPageTree();
  return tree.children
    .filter((node) => node.type === 'folder' && node.root)
    .map((node) => ({
      title: node.name,
      description: node.description,
      url: firstPage(node)?.url,
      $folder: node,
    }))
    .filter((tab) => tab.url);
}

const wipUrls = new Set(
  source
    .getPages()
    .filter((p) => p.data.wip)
    .map((p) => p.url),
);

// Stamp `wip` onto tree items so the client sidebar Item can dim them
// (wipUrls itself can't cross the RSC boundary into a client component).
function pageTreeWithWip() {
  const tree = source.getPageTree();
  (function mark(nodes) {
    for (const node of nodes) {
      if (node.type === 'page') {
        if (wipUrls.has(node.url)) node.wip = true;
      } else if (node.type === 'folder') {
        mark(node.children);
      }
    }
  })(tree.children);
  return tree;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug?.length) return {};
  const page = source.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!slug?.length) return <Landing />;

  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsLayout
      {...baseOptions()}
      tree={pageTreeWithWip()}
      sidebar={{ tabs: sectionTabs(), components: { Item: WipSidebarItem } }}
      githubUrl={GITHUB_URL}
    >
      <DocsPage toc={page.data.toc} footer={{ className: 'mt-8' }}>
        <DocsBody>
          <MDX
          components={{
            ...defaultMdxComponents,
            Steps,
            Step,
            Accordion,
            Accordions,
            // freq badge renders right under the page title (the MDX h1)
            h1: (props) => {
              const H1 = defaultMdxComponents.h1 ?? 'h1';
              return (
                <>
                  <H1 {...props} />
                  {page.data.freq != null && (
                    <p className="-mt-4 mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-fd-foreground/70">
                      <span
                        className="flex items-center gap-0.5"
                        title={`Frequency ${page.data.freq} of 4 — ${FREQ_LABELS[page.data.freq]}`}
                      >
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className={`h-2 w-1.5 rounded-[1px] ${i < page.data.freq ? FREQ_COLORS[page.data.freq] : 'bg-fd-muted-foreground/40'}`}
                          />
                        ))}
                      </span>
                      {FREQ_LABELS[page.data.freq]}
                    </p>
                  )}
                  {page.data.wip && <WorkInProgress />}
                </>
              );
            },
          }}
        />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}
