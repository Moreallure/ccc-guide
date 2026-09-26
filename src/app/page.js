import Link from "next/link";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6">
      <h1 className="text-3xl tracking-tight">
        <Logo />
      </h1>
      <Link
        href="/docs"
        className={buttonVariants({ variant: "primary", className: "px-6 py-2.5" })}
      >
        Get Started
      </Link>
    </main>
  );
}
