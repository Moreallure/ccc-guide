import { GITHUB_URL } from '@/lib/layout.shared';
import { GithubIcon } from '@/components/github-icon';

export function WorkInProgress() {
  return (
    <aside className="not-prose my-6 rounded-lg border border-dashed border-amber-500/30 bg-amber-500/5 p-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-600/90 dark:text-amber-400/90">
        Work in progress
      </p>
      <p className="mb-3 text-sm text-fd-muted-foreground">
        This module is still being written — the content here is a placeholder.
        This guide is open source, and contributions are welcome.
      </p>
      <p className="m-0 text-sm leading-relaxed">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-fd-foreground underline decoration-amber-500/50 underline-offset-4 hover:decoration-amber-500"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          Contribute on GitHub
        </a>{' '}
        — help write this module by{' '}
        <a
          href={`${GITHUB_URL}/compare`}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-fd-foreground underline decoration-amber-500/50 underline-offset-4 hover:decoration-amber-500"
        >
          opening a pull request
        </a>
        .
      </p>
    </aside>
  );
}
