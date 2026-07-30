import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function PageShell({ label, title, intro, children }: { label: string; title: string; intro: string; children: ReactNode }) {
  return (
    <main className="page-shell" id="main-content">
      <nav aria-label="Breadcrumb" className="mono mb-8 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
        <Link className="no-underline hover:text-[var(--cyan)]" href="/">Field desk</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span aria-current="page" className="text-[var(--cyan)]">{label}</span>
      </nav>
      <header className="mb-10 max-w-4xl">
        <p className="eyebrow">File / {label}</p>
        <h1 className="display-font m-0 text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.055em] text-[var(--paper)]">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg text-[var(--muted)]">{intro}</p>
      </header>
      {children}
    </main>
  );
}
export function RelatedLinks({ links }: { links: readonly (readonly [string, string, string])[] }) {
  return (
    <aside className="section-space border-t border-[var(--line)] pt-8" aria-labelledby="related-guides">
      <p className="eyebrow">Continue scanning</p>
      <h2 className="display-font text-3xl font-bold tracking-tight" id="related-guides">Related field files</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {links.map(([label, href, copy]) => (
          <Link className="terminal-panel group block p-5 no-underline" href={href} key={href}>
            <span className="mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cyan)]">Open file →</span>
            <span className="display-font mt-3 block text-xl font-bold group-hover:text-[var(--cyan)]">{label}</span>
            <span className="mt-1 block text-sm text-[var(--muted)]">{copy}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
