import { source } from '@/lib/source';
import { getProblems } from '@/lib/problems-data';

const BASE = 'https://cccguide.net';

export default function sitemap() {
  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/problems`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/topics`, changeFrequency: 'monthly', priority: 0.8 },
    ...source.getPages().map((page) => ({
      url: `${BASE}${page.url}`,
      changeFrequency: 'monthly',
      priority: page.data.wip ? 0.3 : 0.7,
    })),
    ...getProblems().map((p) => ({
      url: `${BASE}${p.href}`,
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
  ];
}
