import { notFound, redirect } from 'next/navigation';
import { DocsBody, DocsPage } from 'fumadocs-ui/layouts/docs/page';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { source } from '@/lib/source';
import { baseOptions, GITHUB_URL } from '@/lib/layout.shared';
import { Landing } from '@/components/landing';

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
      tree={source.getPageTree()}
      sidebar={{ tabs: sectionTabs() }}
      githubUrl={GITHUB_URL}
    >
      <DocsPage toc={page.data.toc}>
        <DocsBody>
          <MDX
          components={{
            ...defaultMdxComponents,
            Steps,
            Step,
            Accordion,
            Accordions,
          }}
        />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}
