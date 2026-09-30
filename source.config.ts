import { defineConfig } from 'fumadocs-mdx/config';
import remarkLatexMath from './src/lib/remark-latex-math';
import rehypeKatex from 'rehype-katex';

// Global (non-macro) fumadocs-mdx options. The macro collections in
// src/lib/source.ts are unaffected; these plugins are merged into the default
// MDX preset by fumadocs-mdx.
export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkLatexMath],
    rehypePlugins: [rehypeKatex],
  },
});
