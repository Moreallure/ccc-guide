import { defineDocs } from 'fumadocs-mdx/macro';
import { loader } from 'fumadocs-core/source';
const docs = defineDocs({
  dir: 'content',
  // content/problems + content/problems-html hold raw problem data — not part of the docs tree.
  docs: { files: ['**/*.{mdx,md}', '!problems/**'] },
  meta: { files: ['**/*.{json,yaml}', '!problems/**'] },
});
export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});
