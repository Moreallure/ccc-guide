import { Fragment } from 'react';
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

/**
 * Renders an imported problem MDX component with each h3 section collapsed
 * into an accordion. The problem's h2 title is dropped as redundant next to
 * the module's heading; content before the first h3 renders as-is.
 */
export function ProblemSections({ component: Problem }) {
  let el = Problem({ components });
  // Unwrap component wrappers (e.g. MDXContent) until the flat child array shows up
  for (let i = 0; i < 5 && el && typeof el.type === 'function' && !Array.isArray(el.props?.children); i++) {
    el = el.type(el.props);
  }
  const children = el?.props?.children;
  const nodes = Array.isArray(children) ? children : children != null ? [children] : [];

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
    <div className="problem-content">
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
