'use client';

import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { getLang, normalize, setLang, subscribeLang } from '@/lib/lang-store';

// All LangTabs instances share one selection: switching Python/C++ in one
// implementation switches every other one, and the choice persists across
// pages via localStorage (shared with LangContent / LangSelect). Fumadocs
// Tabs is uncontrolled, so switching remounts each instance with the new
// defaultValue.
export function LangTabs({ items, children }) {
  const [lang, setLangState] = useState(undefined); // undefined -> first item

  useEffect(() => {
    const unsub = subscribeLang(setLangState);
    const stored = getLang();
    if (stored && items.some((item) => normalize(item) === stored)) setLangState(stored);
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- subscribe once; items are static
  }, []);

  return (
    <Tabs
      key={lang ?? 'initial'}
      items={items}
      defaultValue={lang}
      onValueChange={(v) => setLang(v)}
    >
      {children}
    </Tabs>
  );
}

export { Tab };
