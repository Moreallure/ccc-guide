import { Children, Fragment } from 'react';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import defaultMdxComponents from 'fumadocs-ui/mdx';

// h2/h3 stay native so section grouping can detect them by type; the rest of
// the problem content keeps the site defaults (image, code block, etc.).
const components = { ...defaultMdxComponents, h2: 'h2', h3: 'h3' };

function textOf(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node.props) return textOf(node.props.children);
  return '';
}

// Calls the MDX component and unwraps MDXContent wrappers to its flat child array.
export function flattenMdx(Problem, components) {
  let el = Problem({ components: components ?? defaultMdxComponents });
  for (let i = 0; i < 5 && el && typeof el.type === 'function' && !Array.isArray(el.props?.children); i++) {
    el = el.type(el.props);
  }
  const problemChildren = el?.props?.children;
  return Array.isArray(problemChildren) ? problemChildren : problemChildren != null ? [problemChildren] : [];
}

/**
 * Renders an imported problem MDX component with each h3 section collapsed
 * into an accordion. The problem's h2 title is dropped as redundant. Pass the
 * problem's `frontmatter` export as `meta` to enable the metadata line. Pass
 * `imageSize` (any CSS length, e.g. "6rem") to cap the problem's images;
 * the default is 24rem.
 *
 * The section heading is passed as an h2 JSX child (markdown inside the
 * component tags), e.g. `<ProblemSections ...>## J1 Walkthrough</...>`. That
 * keeps it in the page's MDX AST, so fumadocs assigns the id and "On this
 * page" entry; here its text and id are lifted into the heading line instead
 * of rendering the wrapped heading. Without an h2 child, meta.title is used.
 */
export function ProblemSections({ component: Problem, meta, imageSize, children }) {
  const heading = Children.toArray(children).find((child) => child?.props);
  const headingId = heading?.props?.id;
  const rawTitle = heading?.props?.children;
  // The anchored-heading component appends its anchor button after the title,
  // so only the first child is the actual heading text.
  const headingTitle = heading ? textOf(Array.isArray(rawTitle) ? rawTitle[0] : rawTitle) : undefined;
  const nodes = flattenMdx(Problem, components);

  const out = []; // {node} renders as-is, {items} renders as an accordion group
  let group = null; // current [{title, nodes}]
  for (const node of nodes) {
    if (node?.type === 'h2') {
      // The problem's own "Problem JN: Title" heading is redundant next to the module's heading
      group = null;
    } else if (node?.type === 'h3') {
      if (!group) {
        group = [];
        out.push({ items: group });
      }
      group.push({ title: textOf(node.props?.children), nodes: [] });
    } else if (group?.length) {
      group[group.length - 1].nodes.push(node);
    } else {
      out.push({ node });
    }
  }

  return (
    <div
      className="problem-content"
      style={imageSize ? { '--problem-img-w': imageSize } : undefined}
    >
      {(headingTitle ?? meta?.title) && (
        <h2
          id={headingId}
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1 scroll-mt-20"
        >
          <span>{headingTitle ?? meta?.title}</span>
          {meta && (
            <span className="ml-auto text-fd-muted-foreground text-xs font-normal uppercase tracking-widest">
              {meta.year} · {meta.problem} ·{' '}
              <a
                href={meta.source}
                target="_blank"
                rel="noreferrer"
                className="text-fd-muted-foreground underline decoration-fd-muted-foreground/40 underline-offset-2 transition-colors hover:text-fd-foreground hover:decoration-fd-foreground/60"
              >
                Original problem
              </a>{' '}
              ·{' '}
              <a
                href={`https://dmoj.ca/problem/ccc${String(meta.year).slice(-2)}${meta.problem.toLowerCase()}`}
                target="_blank"
                rel="noreferrer"
                className="text-fd-muted-foreground underline decoration-fd-muted-foreground/40 underline-offset-2 transition-colors hover:text-fd-foreground hover:decoration-fd-foreground/60"
              >
                DMOJ
              </a>
            </span>
          )}
        </h2>
      )}
      {out.map((entry, i) =>
        entry.node ? (
          <Fragment key={i}>{entry.node}</Fragment>
        ) : (
          <Accordions key={i} multiple defaultValue={entry.items.map((item) => item.title)}>
            {entry.items.map((item, j) => (
              <Accordion key={j} title={item.title}>
                {item.nodes}
              </Accordion>
            ))}
          </Accordions>
        ),
      )}
    </div>
  );
}
