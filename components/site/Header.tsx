"use client";

import { ExternalLink, Menu, RadioTower, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ROBLOX_GAME_URL } from "@/lib/roblox";

const navigation = [
  ["Start", "/beginner-guide/"],
  ["Weapons", "/weapons/"],
  ["Gamepasses", "/gamepasses/"],
  ["Coins", "/coins-rebirth/"],
  ["Map", "/map/"],
  ["Updates", "/updates/"],
  ["Codes", "/codes/"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(6,17,21,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] w-[min(1180px,calc(100%-2rem))] items-center justify-between gap-5">
        <Link className="group flex items-center gap-3 no-underline" href="/" onClick={() => setOpen(false)}>
          <span className="relative grid h-9 w-9 place-items-center border border-[var(--line-strong)] text-[var(--cyan)]">
            <RadioTower className="h-4 w-4" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 h-2 w-2 bg-[var(--amber)]" />
          </span>
          <span>
            <span className="mono block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">SYS://51-FIELD</span>
            <span className="display-font block text-lg font-bold leading-none tracking-[-0.03em] text-[var(--paper)] group-hover:text-[var(--cyan)]">Verity Guide</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link className="mono text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)] no-underline transition-colors hover:text-[var(--cyan)]" href={href} key={href}>
              {label}
            </Link>
          ))}
          <a className="button-primary !min-h-[40px] !px-3 !py-2" href={ROBLOX_GAME_URL} rel="noopener noreferrer" target="_blank">
            Play on Roblox <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] bg-transparent text-[var(--paper)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-[var(--line)] bg-[var(--ink)] px-4 py-4 lg:hidden" id="mobile-navigation" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-2">
            {navigation.map(([label, href]) => (
              <Link className="mono border border-[var(--line)] px-3 py-3 text-xs font-bold uppercase text-[var(--paper)] no-underline" href={href} key={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <a className="button-primary col-span-2 mt-1" href={ROBLOX_GAME_URL} rel="noopener noreferrer" target="_blank">
              Play on Roblox <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
