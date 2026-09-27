import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';

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

export default function DocsRootLayout({ children }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      sidebar={{ tabs: sectionTabs() }}
    >
      {children}
    </DocsLayout>
  );
}
