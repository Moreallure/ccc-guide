import { defineCollections, defineDocs } from 'fumadocs-mdx/macro';
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

// Problem pages (served standalone at /problem/[year]-[problem])
const problems = defineCollections({
  type: 'doc',
  dir: 'content/problems',
  files: ['**/*.mdx'],
  schema: z.object({
    title: z.string(),
    problem: z.string(),
    year: z.number().int(),
    level: z.string(),
    source: z.string().url(),
  }),
});

export const problemsSource = loader({
  baseUrl: '/problem',
  source: problems.toFumadocsSource(),
});
