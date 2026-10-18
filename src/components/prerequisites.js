export function Prerequisites({ items, resources }) {
  const multiple = items.length > 1;
  return (

<aside className="not-prose my-6 rounded-lg border border-dashed border-slate-400/35 bg-slate-400/10 p-4">
  <p className="mb-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
    Prerequisites
  </p>

  {multiple ? (
    <ul className="m-0 mb-4 list-none space-y-1.5 p-0">
      {items.map((item) => (
        <li key={item.name} className="flex gap-2 text-sm leading-snug">
          <span
            className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400/80"
            aria-hidden
          />
          <span>
            <span className="font-medium text-fd-foreground">
              {item.name}
            </span>
            {item.body && (
              <span className="text-fd-muted-foreground"> — {item.body}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <section className="mb-4">
      <p className="mb-1 text-sm font-semibold text-fd-foreground">
        {items[0].name}
      </p>
      {items[0].body && (
        <p className="m-0 text-sm text-fd-muted-foreground">
          {items[0].body}
        </p>
      )}
    </section>
  )}

  {resources?.length > 0 && (
    <>
      <p className="mb-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
        Resources
      </p>
      <div className="space-y-1.5 text-sm leading-snug">
        {resources.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="block w-fit font-medium text-fd-foreground underline decoration-slate-400/50 underline-offset-4 hover:decoration-slate-500 dark:hover:decoration-slate-300"
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )}
</aside>

  );
}
