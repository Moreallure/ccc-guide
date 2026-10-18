import { defineDocs } from 'fumadocs-mdx/macro';
import { z } from 'zod';
import { pageSchema } from 'fumadocs-core/source/schema';
import { loader } from 'fumadocs-core/source';
const docs = defineDocs({
  dir: 'content',
  // content/problems + content/problems-html hold raw problem data — not part of the docs tree.
  docs: {
    files: ['**/*.{mdx,md}', '!problems/**'],
    schema: pageSchema.extend({
      freq: z.number().int().min(0).max(4).optional(),
      wip: z.boolean().optional(),
    }),
  },
  meta: { files: ['**/*.{json,yaml}', '!problems/**'] },
});
export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
});
