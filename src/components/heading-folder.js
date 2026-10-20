'use client';

import { usePathname } from 'fumadocs-core/framework';
import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  useFolderDepth,
} from 'fumadocs-ui/components/sidebar/base';

// Our Folder override replaces fumadocs' collapsible folders: the group name
// renders as a plain heading (or a link when the folder has an index page)
// and the children are always expanded. Styles replicate the docs-layout
// slot pieces (itemVariants + depth offset, from
// fumadocs-ui/dist/layouts/docs/slots/sidebar.js), which aren't exported.
function itemOffset(depth) {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

const ITEM_BASE =
  'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start wrap-anywhere w-full [&_svg]:size-4 [&_svg]:shrink-0';

function HeadingName({ item }) {
  const depth = useFolderDepth();
  return (
    <SidebarFolderTrigger
      className={ITEM_BASE + ' font-semibold text-fd-foreground/80'}
      style={{ paddingInlineStart: itemOffset(depth - 1) }}
    >
      {item.icon}
      {item.name}
    </SidebarFolderTrigger>
  );
}

function HeadingLink({ item }) {
  const depth = useFolderDepth();
  const pathname = usePathname();
  return (
    <SidebarFolderLink
      href={item.index.url}
      external={item.index.external}
      active={item.index.url === pathname}
      className={
        ITEM_BASE +
        ' font-semibold text-fd-foreground/80 transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors' +
        (depth > 1
          ? " data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:inset-s-2.5"
          : '')
      }
      style={{ paddingInlineStart: itemOffset(depth - 1) }}
    >
      {item.icon}
      {item.name}
    </SidebarFolderLink>
  );
}

export function HeadingFolder({ item, children }) {
  return (
    <SidebarFolder collapsible={false}>
      {item.index ? <HeadingLink item={item} /> : <HeadingName item={item} />}
      <SidebarFolderContent>{children}</SidebarFolderContent>
    </SidebarFolder>
  );
}
