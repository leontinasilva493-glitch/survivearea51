import { ExternalLink, RadioTower } from "lucide-react";
import Link from "next/link";

import { ROBLOX_GAME_URL } from "@/lib/roblox";

const links = [
  ["Beginner guide", "/beginner-guide/"],
  ["Gamepasses", "/gamepasses/"],
  ["Updates", "/updates/"],
  ["Codes", "/codes/"],
  ["Weapons", "/weapons/"],
  ["Coins & Rebirth", "/coins-rebirth/"],
  ["Map", "/map/"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[rgba(4,13,16,0.86)]">
      <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 text-[var(--cyan)]">
            <RadioTower className="h-5 w-5" aria-hidden="true" />
            <span className="mono text-xs font-bold uppercase tracking-[0.16em]">Independent field desk</span>
          </div>
          <p className="max-w-md text-sm text-[var(--muted)]">
            Verity Field Guide is a fan-made information site. It is not affiliated with,
            endorsed by, or operated by Roblox Corporation, Mochi Productions!, or the
            creators of Verity.
          </p>
        </div>
        <div>
          <h2 className="mono mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--paper)]">Field files</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 p-0 text-sm text-[var(--muted)]">
            {links.map(([label, href]) => (
              <li className="list-none" key={href}><Link className="no-underline hover:text-[var(--cyan)]" href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mono mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--paper)]">Official access</h2>
          <a className="text-link text-sm" href={ROBLOX_GAME_URL} rel="noopener noreferrer" target="_blank">
            Open the Roblox game <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mono mt-8 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">© {new Date().getFullYear()} Verity Field Guide</p>
        </div>
      </div>
    </footer>
  );
}
