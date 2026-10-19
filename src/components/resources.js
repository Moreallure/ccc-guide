export function Resources({ items }) {
  return (
    <aside className="not-prose my-6 rounded-lg border border-slate-400/40 bg-slate-400/8 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
        Resources
      </p>
      <div className="space-y-2.5">
        {items.map((item) => {
          const domain = new URL(item.href).origin;
          const faviconUrl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=32`;
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2.5 group"
            >
              <img
                src={faviconUrl}
                alt=""
                width={16}
                height={16}
                className="mt-0.5 size-4 shrink-0 rounded-sm"
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium text-fd-foreground underline decoration-slate-400/50 underline-offset-4 group-hover:decoration-slate-500 dark:group-hover:decoration-slate-300">
                  {item.label}
                </span>
                {item.description && (
                  <span className="block text-sm text-fd-muted-foreground">
                    {item.description}
                  </span>
                )}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
