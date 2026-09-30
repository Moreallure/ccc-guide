import { visit } from 'unist-util-visit';
import { mathToMarkdown } from 'mdast-util-math';

// CEMC problem papers use LaTeX \(inline\) and \[display\] delimiters.
// Emits remark-math-shaped nodes (className math-inline/math-display) that
// rehype-katex renders. The mathToMarkdown extension lets fumadocs'
// remark-structure stringifier serialize them; without it the unknown node
// type crashes structured data generation. If we ever author math by hand,
// prefer `$...$` + remark-math instead of extending this.
const MATH = /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;

function mathNode(value, display) {
  return {
    type: display ? 'math' : 'inlineMath',
    value,
    data: {
      // span for both: display math can sit mid-paragraph (CEMC embeds formulas
      // in prose), and div-in-p is invalid HTML nesting that breaks hydration.
      // .katex-display CSS still renders it as a block.
      hName: 'span',
      hProperties: { className: ['math', display ? 'math-display' : 'math-inline'] },
      hChildren: [{ type: 'text', value }],
    },
  };
}

// MDX parses `{...}` in prose as a JSX expression when the content is valid
// JS (`10^{18}` -> text + expression(18) + text), which splits a math span
// across sibling nodes. Rejoin such runs into one text node before span
// detection, restoring expressions to their literal `{...}` text for KaTeX.
// Invalid-JS braces like `{align*}` stay literal text and never split.
function unterminatedOpener(value) {
  const open = Math.max(value.lastIndexOf('\\('), value.lastIndexOf('\\['));
  if (open === -1) return null;
  const closer = value[open + 1] === '(' ? '\\)' : '\\]';
  return value.indexOf(closer, open + 2) === -1 ? closer : null;
}

function rejoinSplitSpans(parent) {
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].type !== 'text') continue;
    if (!unterminatedOpener(parent.children[i].value)) continue;
    const pieces = [parent.children[i].value];
    let end = i + 1; // exclusive index of consumed children
    let closed = false;
    while (end < parent.children.length) {
      const sib = parent.children[end];
      if (sib.type === 'text') {
        pieces.push(sib.value);
        end += 1;
        if (!unterminatedOpener(pieces.join(''))) {
          closed = true;
          break;
        }
      } else if (sib.type === 'mdxTextExpression') {
        pieces.push(`{${sib.value}}`);
        end += 1;
      } else {
        break;
      }
    }
    if (!closed) continue;
    parent.children.splice(i, end - i, { type: 'text', value: pieces.join('') });
  }
}

export default function remarkLatexMath() {
  // eslint-disable-next-line -- unified attacher: `this` is the processor
  const data = this.data();
  data.toMarkdownExtensions ||= [];
  data.toMarkdownExtensions.push(mathToMarkdown());

  return (tree) => {
    visit(tree, (node) => Array.isArray(node.children), (node) => rejoinSplitSpans(node));
    visit(tree, 'text', (node, index, parent) => {
      const value = node.value;
      if (!parent || typeof index !== 'number') return;
      if (!value.includes('\\(') && !value.includes('\\[')) return;
      const parts = [];
      let last = 0;
      for (const match of value.matchAll(MATH)) {
        if (match.index > last) parts.push({ type: 'text', value: value.slice(last, match.index) });
        const display = match[1] !== undefined;
        parts.push(mathNode(display ? match[1] : match[2], display));
        last = match.index + match[0].length;
      }
      if (parts.length === 0) return;
      if (last < value.length) parts.push({ type: 'text', value: value.slice(last) });
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}
