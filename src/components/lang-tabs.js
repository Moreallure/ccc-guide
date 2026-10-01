'use client';

import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

// All LangTabs instances share one selection: switching Python/C++ in one
// implementation switches every other one, and the choice persists across
// pages via localStorage. Fumadocs Tabs is uncontrolled, so switching remounts
// each instance with the new defaultValue.
const KEY = 'code-lang';
const listeners = new Set();
const escape = (v) => v.toLowerCase().replace(/\s/, '-'); // same as fumadocs' internal escapeValue

export function LangTabs({ items, children }) {
  const [lang, setLang] = useState(undefined); // undefined -> first item

  useEffect(() => {
    const onUpdate = (v) => setLang(v);
    listeners.add(onUpdate);
    const stored = localStorage.getItem(KEY);
    if (stored && items.some((item) => escape(item) === stored)) setLang(stored);
    return () => {
      listeners.delete(onUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- subscribe once; items are static
  }, []);

  return (
    <Tabs
      key={lang ?? 'initial'}
      items={items}
      defaultValue={lang}
      onValueChange={(v) => {
        try {
          localStorage.setItem(KEY, v);
        } catch {}
        listeners.forEach((fn) => fn(v));
      }}
    >
      {children}
    </Tabs>
  );
}

export { Tab };
