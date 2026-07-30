import type { Metadata } from "next";

import { Dashboard } from "@/components/home/Dashboard";
import { loadRobloxDashboard } from "@/lib/roblox";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Weapons, Map & Gamepass Guide",
  description:
    "Verified weapon stats, coin farming routes, map locations and Gamepass values for Survive Verity in Area 51 on Roblox. Updated with real gameplay data.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const dashboard = await loadRobloxDashboard();
  return <Dashboard dashboard={dashboard} />;
}
