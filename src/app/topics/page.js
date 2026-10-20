import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { getTopicMatrix } from '@/lib/problems-data';

export const metadata = { title: 'Topics' };

// Topic → the curriculum module that teaches it, per level. Same-level match
// wins; falls back to the other level's page when the topic has none here,
// and renders as plain text when no page exists at all.
const TOPIC_LINKS = {
  junior: {
    math: '/junior/warm-ups/first-30-marks',
    simulation: '/junior/simulation-adhoc/simulation',
    strings: '/junior/strings/junior-strings',
    greedy: '/junior/sorting-greedy/greedy-sorting',
    'brute-force': '/junior/graphs-search/complete-rec',
    recursion: '/junior/graphs-search/complete-rec',
    geometry: '/junior/simulation-adhoc/intro-geometry',
    'prefix-sums': '/junior/prefix-sums-dp/prefix-sums',
    'graph-search': '/junior/graphs-search/intro-graphs',
    'data-structures': '/junior/simulation-adhoc/intro-data-structures',
    counting: '/junior/counting-casework/casework',
    'dynamic-programming': '/junior/prefix-sums-dp/intro-dp',
  },
  senior: {
    math: '/senior-core/math-geometry/modular-arithmetic',
    'data-structures': '/senior-core/brute-force-ds/stacks-queues',
    geometry: '/senior-core/math-geometry/geometry',
    'number-theory': '/senior-advanced/number-theory-combinatorics/number-theory',
    strings: '/senior-core/strings-graphs/string-processing',
    greedy: '/senior-core/sorting-greedy/greedy-exchanges',
    'two-pointers': '/senior-core/sorting-greedy/two-pointers',
    'prefix-sums': '/senior-core/sorting-greedy/more-prefix-sums',
    'binary-search': '/senior-core/sorting-greedy/binary-search-answer',
    'brute-force': '/senior-core/brute-force-ds/complete-search',
    counting: '/senior-core/strings-graphs/counting',
    'graph-search': '/senior-core/strings-graphs/graph-search',
    trees: '/senior-core/strings-graphs/intro-tree',
    'graph-algorithms': '/senior-advanced/graph-algorithms/dijkstra',
    'dynamic-programming': '/senior-advanced/dp/dp-1d',
  },
};

// Heat tint scales with how often a topic hits a slot; tiered so the
// gradient stays subtle and the colors mix with the theme's primary.
const heat = (n) => (n >= 6 ? 30 : n >= 3 ? 18 : 9);

function LevelTable({ level, title, accent }) {
  const { slots, rows, count } = getTopicMatrix(level);
  const linkFor = (topic) =>
    TOPIC_LINKS[level]?.[topic] ??
    TOPIC_LINKS[level === 'junior' ? 'senior' : 'junior']?.[topic];
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${accent}`}>
          {count} problems
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-fd-border bg-fd-card">
        <table className="w-full min-w-160 border-collapse text-sm">
          <thead>
            <tr className="border-b border-fd-border text-left">
              <th scope="col" className="px-4 py-3 font-medium text-fd-muted-foreground">
                Topic
              </th>
              {slots.map((s) => (
                <th
                  key={s}
                  scope="col"
                  className="px-3 py-3 text-center text-xs font-medium tracking-wider uppercase text-fd-muted-foreground"
                >
                  {s}
                </th>
              ))}
              <th
                scope="col"
                className="border-l border-fd-border px-3 py-3 text-center text-xs font-medium tracking-wider uppercase text-fd-muted-foreground"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-medium tracking-wider uppercase text-fd-muted-foreground"
              >
                Share
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.topic}
                className={`border-b border-fd-border/60 transition-colors last:border-0 hover:bg-fd-muted/40 ${
                  i % 2 === 1 ? 'bg-fd-muted/30' : ''
                }`}
              >
                <th scope="row" className="px-4 py-3 text-left font-medium">
                  {linkFor(row.topic) ? (
                    <Link
                      href={linkFor(row.topic)}
                      className="text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:decoration-fd-primary"
                    >
                      {row.label}
                    </Link>
                  ) : (
                    <span className="text-fd-foreground">{row.label}</span>
                  )}
                </th>
                {slots.map((s) => {
                  const n = row.cells[s] ?? 0;
                  return (
                    <td key={s} className="px-3 py-3 text-center tabular-nums">
                      {n > 0 ? (
                        <span
                          className="inline-flex min-w-7 justify-center rounded-md py-0.5 font-semibold text-fd-foreground"
                          style={{
                            backgroundColor: `color-mix(in oklab, var(--color-fd-primary) ${heat(n)}%, transparent)`,
                          }}
                        >
                          {n}
                        </span>
                      ) : (
                        <span className="text-fd-muted-foreground/50">0</span>
                      )}
                    </td>
                  );
                })}
                <td className="border-l border-fd-border px-3 py-3 text-center font-semibold tabular-nums text-fd-foreground">
                  {row.total}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-fd-muted-foreground">
                  {(row.share * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function TopicsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-10 pb-24">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">Topics</h1>
          <p className="mt-3 text-fd-muted-foreground">
            How the CCC's 150 problems from 2012 to 2026 spread across topics and question slots.
          </p>
        </div>
        <LevelTable
          level="junior"
          title="Junior"
          accent="bg-indigo-500/15 text-indigo-700 dark:text-indigo-300"
        />
        <LevelTable
          level="senior"
          title="Senior"
          accent="bg-rose-500/15 text-rose-700 dark:text-rose-300"
        />
      </main>
    </>
  );
}
