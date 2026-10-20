'use client';

import { usePathname } from 'fumadocs-core/framework';
import { SidebarItem, useFolderDepth } from 'fumadocs-ui/components/sidebar/base';

// Our Item override replaces fumadocs' styled default wholesale, so replicate
// the docs-layout item styles here (itemVariants + depth offset, from
// fumadocs-ui/dist/layouts/docs/slots/sidebar.js).
function itemClasses(depth) {
  return (
    'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-foreground/70 wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0 ' +
    'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none ' +
    'data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors' +
    (depth >= 1
      ? " data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:inset-s-2.5"
      : '')
  );
}

function itemOffset(depth) {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

export function WipSidebarItem({ item }) {
  const pathname = usePathname();
  const depth = useFolderDepth();
  return (
    <SidebarItem
      href={item.url}
      external={item.external}
      active={item.url === pathname}
      icon={item.icon}
      className={itemClasses(depth) + (item.wip ? ' opacity-60' : '')}
      style={{ paddingInlineStart: itemOffset(depth) }}
      title={item.wip ? 'Work in progress' : undefined}
    >
      {item.name}
    </SidebarItem>
  );
}
