import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ListChecks,
  PenLine,
  Terminal,
  Trophy,
} from "lucide-react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { Logo } from "@/components/logo";
import { GithubIcon } from "@/components/github-icon";
import { GITHUB_URL } from "@/lib/layout.shared";
import "@/app/hero.css";

const code = [
  [["# CCC Senior · Grid Escape", "italic text-fd-muted-foreground/70"]],
  [
    ["from", "font-semibold"],
    [" collections ", "text-fd-muted-foreground"],
    ["import", "font-semibold"],
    [" deque", ""],
  ],
  [[""]],
  [
    ["def", "font-semibold"],
    [" escape", ""],
    ["(grid, start, end):", "text-fd-muted-foreground"],
  ],
  [
    ["    dist = {", ""],
    ["start", ""],
    [": ", "text-fd-muted-foreground"],
    ["0", "font-semibold"],
    ["}", ""],
  ],
  [
    ["    q = deque([", ""],
    ["start", ""],
    ["])", ""],
  ],
  [
    ["    ", ""],
    ["while", "font-semibold"],
    [" q:", "text-fd-muted-foreground"],
  ],
  [
    ["        r, c = q.", ""],
    ["popleft", "font-semibold"],
    ["()", "text-fd-muted-foreground"],
  ],
  [
    ["        ", ""],
    ["if", "font-semibold"],
    [" (r, c) == end: ", "text-fd-muted-foreground"],
    ["return", "font-semibold"],
    [" dist[(r, c)]", ""],
  ],
  [
    ["        ", ""],
    ["for", "font-semibold"],
    [" dr, dc ", "text-fd-muted-foreground"],
    ["in", "font-semibold"],
    [" ((1,0), (-1,0), (0,1), (0,-1)):", "text-fd-muted-foreground"],
  ],
  [
    ["            nxt = (r + dr, c + dc)", ""],
  ],
  [
    ["        ", ""],
    ["if", "font-semibold"],
    [" nxt ", "text-fd-muted-foreground"],
    ["in", "font-semibold"],
    [" grid ", "text-fd-muted-foreground"],
    ["and", "font-semibold"],
    [" nxt ", "text-fd-muted-foreground"],
    ["not in", "font-semibold"],
    [" dist:", ""],
  ],
  [
    ["            dist[nxt] = dist[(r, c)] + ", ""],
    ["1", "font-semibold"],
  ],
  [
    ["            q.", ""],
    ["append", "font-semibold"],
    ["(nxt)", ""],
  ],
  [
    ["    ", ""],
    ["return", "font-semibold"],
    [" -", "text-fd-muted-foreground"],
    ["1", "font-semibold"],
  ],
];

const path = ["J1", "J2", "J3", "J4", "J5", "S1", "S2", "S3", "S4", "S5", "CCO"];

const divisions = [
  {
    id: "01",
    name: "Junior",
    tagline: "For first-time competitors.",
    copy: "Start from zero. Read input, write your first loop, and finish your first contest with problems designed to welcome you in.",
    topics: ["Basics & I/O", "Loops & Conditionals", "Strings", "Simple Math"],
    icon: Terminal,
    inverted: false,
    href: "/junior",
  },
  {
    id: "02",
    name: "Senior",
    tagline: "For competitors chasing CCO.",
    copy: "Go beyond brute force. Master the structures and algorithms that separate a participation certificate from a top-5% honour roll.",
    topics: ["Data Structures", "Algorithms", "Dynamic Programming", "Graph Theory"],
    icon: Trophy,
    inverted: true,
    href: "/senior-core",
  },
];

const features = [
  {
    id: "01",
    icon: BookOpen,
    title: "Learn the idea first.",
    copy: "Every topic opens with the intuition — why the technique exists — before any code is written. No memorizing tricks you can't reconstruct.",
  },
  {
    id: "02",
    icon: PenLine,
    title: "Practice with worked solutions.",
    copy: "Real CCC problems with full editorial walkthroughs: the reasoning, the common mistakes, and the reference solution line by line.",
  },
  {
    id: "03",
    icon: Trophy,
    title: "Compete, then climb.",
    copy: "Each division ends where the next begins. Follow the path from your first J1 submission all the way to the CCO invite.",
  },
];

function Footer() {
  return (
    <footer className="border-t border-fd-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Logo className="text-xl" />
            <p className="mt-3 font-mono text-xs text-fd-muted-foreground">
              © 2026 Moreallure. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-16">
            <div>
              <p className="font-mono text-xs tracking-wider text-fd-muted-foreground uppercase">
                Guide
              </p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0 text-sm">
                <li><Link href="/essentials/introduction/using-this-guide" className="text-fd-muted-foreground no-underline transition-colors hover:text-fd-foreground">Documentation</Link></li>
                <li><Link href="/essentials/introduction/intro-ccc" className="text-fd-muted-foreground no-underline transition-colors hover:text-fd-foreground">Getting Started</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs tracking-wider text-fd-muted-foreground uppercase">
                Community
              </p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0 text-sm">
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-fd-muted-foreground no-underline transition-colors hover:text-fd-foreground">
                    <GithubIcon className="size-3.5" /> GitHub
                  </a>
                </li>
                <li>
                  <a href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-fd-muted-foreground no-underline transition-colors hover:text-fd-foreground">
                    <PenLine className="size-3.5" /> Contributing
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-fd-border pt-5 font-mono text-[11px] text-fd-muted-foreground/70 md:flex-row md:justify-between">
          <p>
            Not affiliated with or endorsed by the CEMC or the University of
            Waterloo.
          </p>
          <p>built by competitors, for competitors</p>
        </div>
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="relative flex flex-1 flex-col overflow-hidden">
        <div aria-hidden className="hero-grid absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-105 bg-[radial-gradient(ellipse_55%_65%_at_50%_-10%,var(--color-fd-primary)_0%,transparent_70%)] opacity-10"
        />

        <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-16 px-4 pt-16 pb-24 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-xl">
            <p className="reveal font-mono text-sm text-fd-muted-foreground">
              $ npx ccc-guide
              <span className="ml-2 inline-block h-4 w-2 translate-y-0.5 animate-[hero-blink_1.1s_steps(2)_infinite] bg-fd-foreground" />
            </p>
            <h1 className="reveal mt-5 text-5xl font-extrabold tracking-tight [animation-delay:100ms]">
              <span className="block">Canadian</span>
              <span className="block">Computing</span>
              <span className="block">Competition,</span>{" "}
              <span className="hero-outline">decoded.</span>
            </h1>
            <p className="reveal mt-5 max-w-xl text-lg leading-relaxed text-fd-foreground/80 [animation-delay:200ms]">
              An open-source guide for learning and preparing for the Canadian
              Computing Competition. Built to grow with the community.
            </p>
            <div className="reveal mt-8 flex flex-wrap items-center gap-3 [animation-delay:300ms]">
              <Link
                href="/essentials/introduction/using-this-guide"
                className={buttonVariants({
                  variant: "primary",
                  className: "group px-6 py-3 text-base",
                })}
              >
                Start Learning
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/junior"
                className={buttonVariants({
                  variant: "outline",
                  className: "px-6 py-3 text-base",
                })}
              >
                Browse Topics
              </Link>
            </div>
            <div className="reveal mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-fd-muted-foreground [animation-delay:400ms]">
              <span className="flex items-center gap-2">
                <Terminal className="size-3.5" /> real CCC problems
              </span>
              <span className="flex items-center gap-2">
                <ListChecks className="size-3.5" /> junior → senior path
              </span>
              <span className="flex items-center gap-2">
                <GithubIcon className="size-3.5" /> open source
              </span>
            </div>
          </div>

          <div className="reveal relative hidden md:block [animation-delay:350ms]">
            <div className="absolute -top-5 -right-3 z-10 animate-[hero-float_4s_ease-in-out_infinite] rounded-lg bg-fd-primary px-3 py-1.5 font-mono text-xs text-fd-primary-foreground shadow-lg">
              15/15 pts · Accepted
            </div>
            <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-2xl">
              <div className="flex items-center gap-1.5 border-b border-fd-border px-4 py-3">
                <span className="size-3 rounded-full bg-fd-border" />
                <span className="size-3 rounded-full bg-fd-border" />
                <span className="size-3 rounded-full bg-fd-border" />
                <span className="ml-3 rounded-md bg-fd-muted px-2.5 py-1 font-mono text-xs text-fd-foreground">
                  escape.py
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 px-4 py-5 font-mono text-[13px] leading-6">
                {code.map((line, i) => (
                  <div key={i} className="contents">
                    <span className="select-none text-fd-muted-foreground/50">
                      {i + 1}
                    </span>
                    <span
                      className="reveal whitespace-pre [animation-delay:calc(400ms+var(--i)*45ms)]"
                      style={{ "--i": i }}
                    >
                      {line.map(([text, cls], j) => (
                        <span key={j} className={cls}>
                          {text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-fd-border px-4 py-2.5 font-mono text-xs text-fd-muted-foreground">
                <span>Python 3 · BFS shortest path</span>
                <span className="rounded bg-fd-primary px-1.5 py-0.5 text-fd-primary-foreground">
                  ✓ 0.42s · 12 MB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divisions */}
        <section className="reveal-scroll relative mx-auto w-full max-w-6xl px-4 py-24">
          <p className="font-mono text-sm text-fd-muted-foreground">$ man ccc-guide</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-balance">
            A free, open guide to the CCC.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-fd-muted-foreground">
            Built by the community, for the community — every lesson and
            worked solution is open source, and anyone can help it grow. Pick
            where you are:
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {divisions.map((d) => (
              <Link
                key={d.id}
                href={d.href}
                className={`group relative flex flex-col overflow-hidden rounded-xl border p-8 no-underline transition-transform duration-300 hover:-translate-y-1 ${
                  d.inverted
                    ? "border-fd-border bg-fd-primary text-fd-primary-foreground"
                    : "border-fd-border bg-fd-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs tracking-wider ${
                      d.inverted ? "opacity-70" : "text-fd-muted-foreground"
                    }`}
                  >
                    DIVISION_{d.id}
                  </span>
                  <d.icon className="size-5" />
                </div>
                <h3 className="mt-8 text-3xl font-extrabold tracking-tight">
                  {d.name}
                </h3>
                <p
                  className={`mt-1 font-mono text-xs ${
                    d.inverted ? "opacity-70" : "text-fd-muted-foreground"
                  }`}
                >
                  {d.tagline}
                </p>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    d.inverted ? "opacity-80" : "text-fd-muted-foreground"
                  }`}
                >
                  {d.copy}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {d.topics.map((t) => (
                    <span
                      key={t}
                      className={`rounded-md px-2 py-1 font-mono text-[11px] ${
                        d.inverted
                          ? "bg-white/10"
                          : "bg-fd-muted text-fd-muted-foreground"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-8 flex items-center gap-1.5 text-sm font-medium">
                  Explore {d.name}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section className="border-t border-fd-border bg-fd-muted/30">
          <div className="reveal-scroll mx-auto w-full max-w-6xl px-4 py-24">
            <p className="font-mono text-sm text-fd-muted-foreground">$ cat approach.md</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight">
              Learn. Practice. Compete.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border md:grid-cols-3">
              {features.map((f) => (
                <div key={f.id} className="bg-fd-background p-8">
                  <div className="flex items-center justify-between">
                    <span className="hero-outline font-mono text-5xl font-extrabold">
                      {f.id}
                    </span>
                    <f.icon className="size-5 text-fd-muted-foreground" />
                  </div>
                  <h3 className="mt-8 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                    {f.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open source */}
        <section className="border-t border-fd-border">
          <div className="reveal-scroll mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-20 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-sm text-fd-muted-foreground">$ git clone ccc-guide</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                Open source, always.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-fd-muted-foreground">
                This guide is a community project — write
                lessons, improve editorials, add practice problems. Good first
                issues are waiting.
              </p>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: "outline",
                className: "shrink-0 px-5 py-3",
              })}
            >
              <GithubIcon className="size-4 mr-2" />
              Contribute on GitHub
            </a>
          </div>
        </section>

        {/* Path band */}
        <section className="relative overflow-hidden bg-fd-primary text-fd-primary-foreground">
          <div
            aria-hidden
            className="marquee flex w-max items-center gap-8 py-6 font-mono text-sm opacity-60"
          >
            <div className="marquee-track flex items-center gap-8">
              {Array.from({ length: path.length * 12 }, (_, i) => (
                <span key={i} className="flex items-center gap-8">
                  {path[i % path.length]}
                  {i % path.length !== path.length - 1 && (
                    <span aria-hidden>→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal-scroll mx-auto w-full max-w-6xl px-4 pb-24 pt-16">
            <p className="font-mono text-sm opacity-70">$ echo $DESTINATION</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-balance">
              Your route to CCO starts at J1.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed opacity-80">
              The path is long but never hidden — every problem, every topic,
              every step sits in order. Take the first one.
            </p>
            <Link
              href="/essentials/introduction/using-this-guide"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-fd-primary-foreground px-6 py-3 text-base font-medium text-fd-primary no-underline transition-opacity hover:opacity-90"
            >
              Start Learning
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
