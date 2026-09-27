import { defineDocs } from 'fumadocs-mdx/macro';
import { loader } from 'fumadocs-core/source';
const docs = defineDocs({
  dir: 'content',
});
export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});
