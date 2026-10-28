import { SiteHeader } from '@/components/site-header';
import { ProblemsExplorer } from '@/components/problems-explorer';
import { getSortedProblems, TOPICS } from '@/lib/problems-data';

export const metadata = {
  title: 'Problems',
  description: 'Browse every CCC problem from 2012 to 2026.',
  alternates: { canonical: '/problems' },
};

export default function ProblemsPage() {
  const problems = getSortedProblems();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-10 pb-24">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Problems</h1>
          <p className="mt-3 text-fd-muted-foreground">
            CCC Guide collects every CCC problem from 2012 to 2026 — {problems.length} in total.
            <br />
            If you're looking for solutions,{" "}
            <a
              href="https://cccsolutions.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-fd-foreground underline decoration-fd-border underline-offset-4 transition-colors hover:decoration-fd-primary"
            >
              <img
                src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cccsolutions.ca&size=32"
                alt=""
                width={14}
                height={14}
                className="size-3.5"
              />
              CCCSolutions
            </a>{" "}
            is another open-source resource with an archive spanning over 20 years of CCC problems.
          </p>
        </div>
        <ProblemsExplorer problems={problems} topics={TOPICS} />
      </main>
    </>
  );
}
