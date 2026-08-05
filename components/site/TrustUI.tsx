import { AlertTriangle, Check, ExternalLink, Radio, ShieldQuestion } from "lucide-react";
import type { ReactNode } from "react";

import type { DataSource } from "@/lib/roblox";

export type VerificationKind =
  | "confirmed"
  | "official-announcement"
  | "gameplay-tested"
  | "community-reported"
  | "unverified"
  | "outdated";

const statusCopy: Record<VerificationKind, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "border-[rgba(130,248,230,.42)] text-[var(--cyan)]" },
  "official-announcement": { label: "Official announcement", className: "border-[rgba(255,201,107,.48)] text-[var(--amber)]" },
  "gameplay-tested": { label: "Gameplay tested", className: "border-[rgba(130,248,230,.42)] text-[var(--cyan)]" },
  "community-reported": { label: "Community reported", className: "border-[rgba(255,201,107,.48)] text-[var(--amber)]" },
  unverified: { label: "Not verified", className: "border-[rgba(255,117,109,.5)] text-[var(--red)]" },
  outdated: { label: "Outdated", className: "border-[rgba(144,170,168,.4)] text-[var(--muted)]" },
};

export function VerificationStatus({ status, label }: { status: VerificationKind; label?: string }) {
  const item = statusCopy[status];
  return <span className={`mono inline-flex items-center gap-1.5 border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${item.className}`}><span className="h-1.5 w-1.5 bg-current" />{label ?? item.label}</span>;
}
export function SourceBadge({ source = "Official Roblox Data", state = "live" }: { source?: string; state?: DataSource }) {
  return (
    <span className="mono inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.11em] text-[var(--muted)]">
      {state === "live" ? <Radio className="h-3 w-3 text-[var(--cyan)]" aria-hidden="true" /> : <AlertTriangle className="h-3 w-3 text-[var(--amber)]" aria-hidden="true" />}
      {source}{state === "snapshot" ? " · Cached snapshot" : ""}
    </span>
  );
}

export function LastVerified({ date, label = "Last verified" }: { date: string; label?: string }) {
  const formatted = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" }).format(new Date(date));
  return <span className="mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">{label}: <time dateTime={date}>{formatted}</time></span>;
}

export function GameStatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="min-h-32 p-4 sm:p-5">
      <p className="mono m-0 text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">{label}</p>
      <p className="display-font my-2 text-3xl font-bold leading-none text-[var(--paper)] sm:text-4xl">{value}</p>
      {note ? <p className="mono m-0 text-[10px] uppercase tracking-[0.08em] text-[var(--cyan)]">{note}</p> : null}
    </div>
  );
}

export function EmptyVerifiedState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="terminal-panel flex flex-col items-start gap-4 p-6 sm:p-8">
      <span className="grid h-11 w-11 place-items-center border border-[rgba(255,201,107,.45)] text-[var(--amber)]"><ShieldQuestion aria-hidden="true" /></span>
      <div><h2 className="display-font m-0 text-2xl font-bold tracking-tight">{title}</h2><div className="mt-2 max-w-2xl text-[var(--muted)]">{children}</div></div>
    </div>
  );
}

export function EvidenceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="text-link text-sm" href={href} rel="noopener noreferrer" target="_blank">{children}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>;
}

export function FactLabel({ children }: { children: ReactNode }) {
  return <span className="mono inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--cyan)]"><Check className="h-3 w-3" aria-hidden="true" />{children}</span>;
}
