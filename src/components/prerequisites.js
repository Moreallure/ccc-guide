export function Prerequisites({ items }) {
  const multiple = items.length > 1;
  return (

<aside className="not-prose my-6 rounded-lg border border-dashed border-amber-400/20 bg-amber-400/[0.04] p-4">
  <p className="mb-1 text-sm font-semibold text-amber-500/90 dark:text-amber-400/80">
    Prerequisites
  </p>

  {multiple ? (
    <ul className="m-0 list-none space-y-1.5 p-0">
      {items.map((item) => (
        <li key={item.name} className="flex gap-2 text-sm leading-snug">
          <span
            className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/40"
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
    <section>
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
</aside>

  );
}

