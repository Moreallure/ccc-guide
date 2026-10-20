'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

const LEVELS = [
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
];

const DIFFICULTIES = [
  {
    value: 'easy',
    label: 'Easy',
    color:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300',
  },
  {
    value: 'difficult',
    label: 'Difficult',
    color:
      'bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-300',
  },
  {
    value: 'very-difficult',
    label: 'Very Difficult',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-300',
  },
  {
    value: 'na',
    label: 'N/A',
    color: 'bg-fd-muted text-fd-muted-foreground',
  },
];

function toggle(set, value) {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function FilterGroup({ title, children }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs font-semibold tracking-wider text-fd-muted-foreground uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

function FilterRow({ selected, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-start text-sm transition-colors duration-150 ${
        selected
          ? 'bg-fd-primary/10 font-medium text-fd-primary'
          : 'text-fd-muted-foreground hover:bg-fd-muted hover:text-fd-foreground'
      }`}
    >
      <span
        aria-hidden
        className={`size-3.5 shrink-0 rounded-[5px] border transition-colors ${
          selected ? 'border-fd-primary bg-fd-primary' : 'border-fd-border bg-fd-card'
        }`}
      >
        {selected && (
          <svg viewBox="0 0 14 14" className="size-full text-fd-primary-foreground">
            <path
              d="M3.5 7.5l2.5 2.5 4.5-5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span className="text-xs tabular-nums opacity-60">{count}</span>
    </button>
  );
}

function DifficultyTag({ difficulty }) {
  if (difficulty === 'na') return null;
  const d = DIFFICULTIES.find((x) => x.value === difficulty);
  return (
    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${d.color}`}>
      {d.label}
    </span>
  );
}

export function ProblemsExplorer({ problems, topics }) {
  const [query, setQuery] = useState('');
  const [levels, setLevels] = useState(new Set());
  const [difficulties, setDifficulties] = useState(new Set());
  const [topicSet, setTopicSet] = useState(new Set());

  const topicCounts = useMemo(() => {
    const counts = new Map();
    for (const p of problems) counts.set(p.topic, (counts.get(p.topic) ?? 0) + 1);
    return counts;
  }, [problems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter(
      (p) =>
        (!q || `${p.year} ${p.slot} ${p.name}`.toLowerCase().includes(q)) &&
        (!levels.size || levels.has(p.level)) &&
        (!difficulties.size || difficulties.has(p.difficulty)) &&
        (!topicSet.size || topicSet.has(p.topic)),
    );
  }, [problems, query, levels, difficulties, topicSet]);

  const hasFilters =
    query.trim() !== '' || levels.size > 0 || difficulties.size > 0 || topicSet.size > 0;
  const clearAll = () => {
    setQuery('');
    setLevels(new Set());
    setDifficulties(new Set());
    setTopicSet(new Set());
  };

  const filters = (
    <div>
      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="mb-4 flex items-center gap-1.5 text-xs text-fd-primary underline-offset-4 transition-colors hover:underline"
        >
          <X className="size-3.5" /> Clear all filters
        </button>
      )}
      <div className="relative mb-6">
        <Search className="absolute inset-y-0 start-3 my-auto size-4 text-fd-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
          placeholder="Search problems…"
          className="h-9 w-full rounded-lg border border-fd-border bg-fd-card ps-9 pe-8 text-sm text-fd-foreground outline-none transition-colors placeholder:text-fd-muted-foreground/60 focus-visible:border-fd-primary/50 focus-visible:outline-2 focus-visible:outline-fd-ring/50"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute inset-y-0 end-2.5 my-auto text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <FilterGroup title="Level">
        {LEVELS.map((l) => (
          <FilterRow
            key={l.value}
            selected={levels.has(l.value)}
            onClick={() => setLevels((s) => toggle(s, l.value))}
            label={l.label}
            count={problems.filter((p) => p.level === l.value).length}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Difficulty">
        {DIFFICULTIES.map((d) => (
          <FilterRow
            key={d.value}
            selected={difficulties.has(d.value)}
            onClick={() => setDifficulties((s) => toggle(s, d.value))}
            label={d.label}
            count={problems.filter((p) => p.difficulty === d.value).length}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Topic">
        {topics.map((t) => (
          <FilterRow
            key={t.value}
            selected={topicSet.has(t.value)}
            onClick={() => setTopicSet((s) => toggle(s, t.value))}
            label={t.label}
            count={topicCounts.get(t.value)}
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-10">
      {/* Filters: sidebar on desktop, block above the grid on mobile */}
      <aside className="not-prose mb-8 lg:mb-0">
        <div>{filters}</div>
      </aside>

      <div className="min-w-0">
        {filtered.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <Link
                key={p.href}
                href={p.href}
                className="anim-fade-up group rounded-xl border border-fd-border bg-fd-card p-4 transition-colors duration-200 hover:border-fd-primary/40 focus-visible:outline-2 focus-visible:outline-fd-ring/50"
                style={{ animationDelay: `${Math.min(i, 24) * 15}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium leading-snug text-fd-foreground transition-colors group-hover:text-fd-primary">
                    {p.name}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 text-xs text-fd-muted-foreground">
                  <span className="tabular-nums">
                    {p.year} · {p.slot} · {p.topic}
                  </span>
                  <DifficultyTag difficulty={p.difficulty} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center text-sm text-fd-muted-foreground">
            No problems match.
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="ms-1.5 text-fd-primary underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
