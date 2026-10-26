'use client';

import { useEffect, useState } from 'react';
import {
  getLang,
  normalize,
  pageLangs,
  registerLang,
  setLang,
  subscribeLang,
  subscribeLangs,
  unregisterLang,
} from '@/lib/lang-store';

// Renders children only when the global language choice (LangTabs /
// LangSelect) matches `value`. If the stored language isn't offered on this
// page (or none was ever chosen), all language content stays visible so
// nothing silently disappears.
export function LangContent({ value, children }) {
  const [lang, setLang] = useState(undefined);
  const [, bump] = useState(0); // re-render when the page's language set changes

  useEffect(() => {
    registerLang(value);
    const update = () => setLang(getLang());
    const u1 = subscribeLang(update);
    const u2 = subscribeLangs(() => bump((n) => n + 1));
    update();
    return () => {
      unregisterLang(value);
      u1();
      u2();
    };
  }, [value]);

  const known = [...pageLangs].some((l) => normalize(l) === normalize(lang ?? ''));
  const show = lang === undefined || !known || normalize(value) === normalize(lang);
  return show ? <>{children}</> : null;
}

export const Python = (props) => <LangContent value="Python" {...props} />;
export const Cpp = (props) => <LangContent value="C++" {...props} />;
export const Java = (props) => <LangContent value="Java" {...props} />;

const ORDER = ['Python', 'C++', 'Java'];

// Rendered at the top of every module page. Shows a language dropdown only
// when the page contains two or more distinct LangContent languages, sharing
// the same localStorage state as LangTabs.
export function LangSelect() {
  const [state, setState] = useState({ langs: [], lang: undefined });

  useEffect(() => {
    const update = () => {
      const langs = [...pageLangs];
      let lang = getLang();
      // Always show a real selection: default to the page's first language
      // when nothing (or a language this page doesn't offer) is stored.
      if (langs.length > 0 && !langs.some((l) => normalize(l) === normalize(lang ?? ''))) {
        lang = normalize(langs[0]);
        setLang(lang);
      }
      setState({ langs, lang });
    };
    const u1 = subscribeLang(update);
    const u2 = subscribeLangs(update);
    update();
    return () => {
      u1();
      u2();
    };
  }, []);

  // Dedupe case-insensitively, then sort canonically.
  const seen = new Set();
  const langs = [];
  for (const l of state.langs) {
    const n = normalize(l);
    if (!seen.has(n)) {
      seen.add(n);
      langs.push(l);
    }
  }
  if (langs.length < 2) return null;

  const sorted = [...langs].sort((a, b) => {
    const ia = ORDER.indexOf(a);
    const ib = ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });
  const current = sorted.find((l) => normalize(l) === normalize(state.lang ?? ''));

  return (
    <div className="mb-4 flex items-center gap-2 text-sm">
      <span className="font-medium text-fd-foreground/80">Language:</span>
      <select
        value={current ?? ''}
        onChange={(e) => setLang(normalize(e.target.value))}
        aria-label="Programming language"
        className="rounded-md border border-fd-border bg-fd-background px-2 py-1 text-sm text-fd-foreground/80 outline-none transition-colors hover:text-fd-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-fd-ring"
      >
        {sorted.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
