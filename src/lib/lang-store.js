// Shared language state for LangTabs / LangContent / LangSelect.
// One localStorage key ('code-lang'), one listener bus for same-page sync,
// plus a registry of languages present on the current page so the auto
// language dropdown knows what to offer.

const KEY = 'code-lang';

// Same normalization fumadocs Tabs uses for Tab values.
export const normalize = (v) => v.toLowerCase().replace(/\s/, '-');

const langListeners = new Set();
const setListeners = new Set();

// Languages registered by LangContent instances on the current page.
// Cleaned up on unmount, so it tracks the mounted page during SPA navigation.
export const pageLangs = new Set();

export function getLang() {
  try {
    return localStorage.getItem(KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

export function setLang(v) {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  langListeners.forEach((fn) => fn(v));
}

export function subscribeLang(fn) {
  langListeners.add(fn);
  return () => langListeners.delete(fn);
}

export function registerLang(v) {
  pageLangs.add(v);
  setListeners.forEach((fn) => fn());
}

export function unregisterLang(v) {
  pageLangs.delete(v);
  setListeners.forEach((fn) => fn());
}

export function subscribeLangs(fn) {
  setListeners.add(fn);
  return () => setListeners.delete(fn);
}
