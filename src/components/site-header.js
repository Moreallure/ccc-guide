"use client";

import Link from "next/link";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { FullSearchTrigger } from "fumadocs-ui/layouts/shared/slots/search-trigger";
import {
  Braces,
  Calculator,
  ChevronDown,
  Database,
  Layers,
  LetterText,
  Repeat,
  Terminal,
  Waypoints,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { GithubIcon } from "@/components/github-icon";
import { GITHUB_URL } from "@/lib/layout.shared";
import PixelCard from "@/components/pixel-card";

const menus = [
  {
    label: "Junior",
    promo: {
      eyebrow: "Start Here",
      title: "New to competitive programming? Start here.",
      cta: "Getting Started",
      ctaDesc: "Build your first CCC solution",
      href: "/craft/orientation/getting-started",
      variant: "blue",
    },
    links: [
      { title: "Basics & I/O", href: "/craft/orientation/intro-ccc", description: "Input, output, and simple variables", icon: Terminal },
      { title: "Loops & Conditionals", href: "/craft/orientation/intro-ccc", description: "Repetition and decision making", icon: Repeat },
      { title: "Strings", href: "/craft/orientation/intro-ccc", description: "Text processing and manipulation", icon: LetterText },
      { title: "Simple Math", href: "/craft/orientation/intro-ccc", description: "Arithmetic, modulos, and number tricks", icon: Calculator },
    ],
  },
  {
    label: "Senior",
    promo: {
      eyebrow: "Level Up",
      title: "Ready to compete at the Senior level?",
      cta: "Explore Senior Topics",
      ctaDesc: "From data structures to graph theory",
      href: "/craft/orientation/intro-ccc",
      variant: "pink",
    },
    links: [
      { title: "Data Structures", href: "/craft/orientation/intro-ccc", description: "Arrays, sets, maps, and queues", icon: Database },
      { title: "Algorithms", href: "/craft/orientation/intro-ccc", description: "Sorting, searching, and greedy ideas", icon: Braces },
      { title: "Dynamic Programming", href: "/craft/orientation/intro-ccc", description: "Breaking problems into overlapping subproblems", icon: Layers },
      { title: "Graph Theory", href: "/craft/orientation/intro-ccc", description: "BFS, DFS, and shortest paths", icon: Waypoints },
    ],
  },
];

export function SiteHeader() {
  return (
    <header className="border-b border-fd-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-3 sm:gap-4 sm:px-4">
        <Link href="/" aria-label="Home" className="mr-1 sm:mr-4">
          <Logo className="text-lg sm:text-xl" />
        </Link>

        <NavigationMenu.Root className="hidden md:block">
          <NavigationMenu.List className="flex items-center">
            {menus.map((menu) => (
              <NavigationMenu.Item key={menu.label}>
                <NavigationMenu.Trigger className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-fd-ring data-popup-open:bg-fd-muted data-popup-open:text-fd-foreground">
                  {menu.label}
                  <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180">
                    <ChevronDown className="size-3" />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="h-full w-4xl p-2 transition-[opacity,transform] duration-200 ease-out data-starting-style:translate-x-2 data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-100">
                  <div className="flex h-full gap-1">
                    <NavigationMenu.Link
                      render={<Link href={menu.promo.href} />}
                      className="relative flex w-80 shrink-0 flex-col overflow-hidden rounded-xl bg-fd-primary p-4 text-fd-primary-foreground no-underline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-fd-ring"
                    >
                      <PixelCard
                        variant={menu.promo.variant}
                        noFocus
                        style={{
                          "--pixel-card-active-color":
                            menu.promo.variant === "pink"
                              ? "rgba(254, 205, 211, 0.2)"
                              : "rgba(224, 242, 254, 0.2)",
                        }}
                      />
                      <div className="pointer-events-none relative text-xs font-medium tracking-wider uppercase opacity-70">
                        {menu.promo.eyebrow}
                      </div>
                      <div className="pointer-events-none relative mt-2 text-lg leading-snug font-semibold">
                        {menu.promo.title}
                      </div>
                      <div className="pointer-events-none relative mt-auto">
                        <div className="text-sm font-medium">{menu.promo.cta}</div>
                        <div className="text-xs opacity-70">
                          {menu.promo.ctaDesc}
                        </div>
                      </div>
                    </NavigationMenu.Link>

                    <ul className="m-0 grid flex-1 list-none grid-cols-2 gap-1 p-0">
                      {menu.links.map((link) => (
                        <li key={link.title}>
                          <NavigationMenu.Link
                            render={<Link href={link.href} />}
                            className="group block h-full rounded-xl p-4 no-underline transition-colors hover:bg-fd-muted focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-fd-ring"
                          >
                            <div className="flex size-8 items-center justify-center rounded-lg bg-fd-primary text-fd-primary-foreground">
                              <link.icon className="size-4" />
                            </div>
                            <div className="mt-3 text-sm font-medium text-fd-foreground">
                              {link.title}
                            </div>
                            <div className="mt-1 text-sm leading-snug text-fd-muted-foreground">
                              {link.description}
                            </div>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner
              sideOffset={8}
              className="z-50 outline-none"
            >
              <NavigationMenu.Popup className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-xl border border-fd-border bg-fd-popover text-fd-popover-foreground shadow-xl outline-none transition-[opacity,transform,width,height,scale] duration-150 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0">
                <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-4">
          <FullSearchTrigger />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="flex size-9 items-center justify-center rounded-full text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
