import data from './problems.json';

// Editorial problem metadata (topic, official average mark) — lives here,
// separate from the factual frontmatter in content/problems/*.mdx.
// Difficulty buckets from the official average mark (out of 15, lower = harder):
// avg >= 12 Easy · 6–12 Moderate · 1–6 Difficult · < 1 Very Difficult · no data N/A.
const difficultyOf = (avg) =>
  avg == null ? 'na' : avg >= 12 ? 'easy' : avg >= 6 ? 'moderate' : avg >= 1 ? 'difficult' : 'very-difficult';

const problems = data.map((p) => ({
  ...p,
  level: p.slot.startsWith('J') ? 'junior' : 'senior',
  difficulty: difficultyOf(p.avg),
  href: `/problem/${p.year}-${p.slot.toLowerCase()}`,
}));

export function getProblems() {
  return problems;
}

// New papers first, so the Problems page leads with recent contests.
const byNewest = (a, b) => b.year - a.year || a.slot.localeCompare(b.slot);

export function getSortedProblems() {
  return [...problems].sort(byNewest);
}

// 150 = 15 papers (2012–2026) × 10 slots. Guard against schema drift.
if (process.env.NODE_ENV !== 'production') {
  const ids = new Set(problems.map((p) => `${p.year}-${p.slot}`));
  if (problems.length !== 150 || ids.size !== 150) {
    throw new Error(`problems.json has ${ids.size} unique problems, expected 150`);
  }
}

const topicLabel = (topic) =>
  topic
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');

export const TOPICS = [...new Set(problems.map((p) => p.topic))].map((topic) => ({
  value: topic,
  label: topicLabel(topic),
}));

// Topic × slot count matrix for one level, rows sorted by total (desc).
export function getTopicMatrix(level) {
  const slots = level === 'junior' ? ['J1', 'J2', 'J3', 'J4', 'J5'] : ['S1', 'S2', 'S3', 'S4', 'S5'];
  const inLevel = problems.filter((p) => p.level === level);
  const rows = new Map();
  for (const p of inLevel) {
    if (!rows.has(p.topic)) {
      rows.set(p.topic, { topic: p.topic, label: topicLabel(p.topic), cells: {}, total: 0 });
    }
    const row = rows.get(p.topic);
    row.cells[p.slot] = (row.cells[p.slot] ?? 0) + 1;
    row.total++;
  }
  const list = [...rows.values()].sort(
    (a, b) => b.total - a.total || a.topic.localeCompare(b.topic),
  );
  for (const row of list) row.share = row.total / inLevel.length;
  return { slots, rows: list, count: inLevel.length };
}
