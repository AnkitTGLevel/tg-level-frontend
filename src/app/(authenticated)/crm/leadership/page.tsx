"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "DAILY" | "MONTHLY" | "QUARTERLY";

interface Performer {
  name: string;
  deals: number;
  revenue: string;
  change: string;
  initials: string;
  avatarBg: string;
}

interface RankRow {
  rank: number;
  name: string;
  title: string;
  progress: number;
  weekChange: string;
  revenue: string;
  target: string;
  barColor: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const BEST_PERFORMERS: Performer[] = [
  { name: "Elena Rodriguez", deals: 12, revenue: "₹14,200", change: "+5.2%", initials: "ER", avatarBg: "bg-rose-400"   },
  { name: "Elena Rodriguez", deals: 12, revenue: "₹14,200", change: "+5.2%", initials: "ER", avatarBg: "bg-rose-400"   },
  { name: "Jordan Smith",    deals: 9,  revenue: "₹12,850", change: "+3.8%", initials: "JS", avatarBg: "bg-slate-500"  },
  { name: "Jordan Smith",    deals: 9,  revenue: "₹12,850", change: "+3.8%", initials: "JS", avatarBg: "bg-slate-500"  },
  { name: "James Wilson",    deals: 8,  revenue: "₹9,400",  change: "+2.1%", initials: "JW", avatarBg: "bg-gray-600"   },
  { name: "James Wilson",    deals: 8,  revenue: "₹9,400",  change: "+2.1%", initials: "JW", avatarBg: "bg-gray-600"   },
  { name: "Sarah Chen",      deals: 7,  revenue: "₹8,900",  change: "+1.5%", initials: "SC", avatarBg: "bg-amber-500"  },
];

const RANK_ROWS: RankRow[] = [
  {
    rank: 4,
    name: "Elena Rodriguez",
    title: "Senior Account Exec",
    progress: 85,
    weekChange: "+2% THIS WEEK",
    revenue: "₹680,000",
    target: "₹800k",
    barColor: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600",
  },
  {
    rank: 5,
    name: "James Wilson",
    title: "Mid-Market Specialist",
    progress: 79,
    weekChange: "",
    revenue: "₹553,000",
    target: "₹700k",
    barColor: "bg-blue-700",
  },
  {
    rank: 6,
    name: "Lila Thorne",
    title: "Enterprise Sales",
    progress: 72,
    weekChange: "",
    revenue: "₹504,000",
    target: "₹700k",
    barColor: "bg-green-500",
  },
];

// ─── Avatar placeholder ───────────────────────────────────────────────────────

function Avatar({
  initials,
  bg,
  size = "md",
  ring,
}: {
  initials: string;
  bg: string;
  size?: "sm" | "md" | "lg" | "xl";
  ring?: string;
}) {
  const sizeMap = {
    sm:  "size-9  text-[11px]",
    md:  "size-11 text-[12px]",
    lg:  "size-20 text-[20px]",
    xl:  "size-28 text-[28px]",
  };
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold text-white shrink-0",
        sizeMap[size],
        bg,
        ring && `ring-4 ${ring}`
      )}
    >
      {initials}
    </div>
  );
}

// ─── Podium ───────────────────────────────────────────────────────────────────

function Podium() {
  return (
    <div className="flex-1 min-w-0 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 p-6 flex flex-col">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-[34px] font-black tracking-tight text-gray-900">
          Sales Champions
        </h2>
        <p className="text-[14px] text-gray-500 mt-1">
          Celebrating this quarter's top revenue drivers
        </p>
      </div>

      {/* Three champions */}
      <div className="flex items-end justify-center gap-0 mt-auto">

        {/* ── #2 Silver ── */}
        <div className="flex flex-col items-center" style={{ marginBottom: 0 }}>
          <div className="relative mb-3">
            <Avatar initials="SC" bg="bg-amber-500" size="lg" ring="ring-gray-300" />
            <span className="absolute -bottom-1 -right-1 size-6 rounded-md bg-gray-400 text-white text-[11px] font-black flex items-center justify-center shadow">
              2
            </span>
          </div>
          <p className="font-black text-[16px] text-gray-900 text-center">Sarah Chen</p>
          <p className="text-[15px] font-bold text-blue-600">₹842,400</p>
          <p className="text-[10px] font-semibold text-gray-500 tracking-wider mb-3">
            94% OF TARGET
          </p>
          {/* Silver pedestal */}
          <div
            className="w-36 rounded-t-lg flex items-center justify-center"
            style={{
              height: 120,
              background: "linear-gradient(180deg,#e8e8e8 0%,#b0b0b0 50%,#d0d0d0 100%)",
            }}
          >
            <span className="text-[22px] font-black tracking-[0.25em] text-gray-600/80">
              SILVER
            </span>
          </div>
        </div>

        {/* ── #1 Gold ── */}
        <div className="flex flex-col items-center z-10" style={{ marginBottom: 0 }}>
          <div className="relative mb-3">
            <Avatar initials="JS" bg="bg-slate-500" size="xl" ring="ring-yellow-400" />
            <span className="absolute -bottom-1 -right-1 size-7 rounded-md bg-yellow-500 text-white text-[12px] font-black flex items-center justify-center shadow-lg">
              1
            </span>
          </div>
          <p className="font-black text-[20px] text-gray-900 text-center">Jordan Smith</p>
          <p className="text-[22px] font-black text-yellow-600">₹1,240,000</p>
          <div className="mt-1 mb-4 px-4 py-1 rounded-full bg-yellow-100 border border-yellow-300 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[10px] font-extrabold tracking-wider text-yellow-700">
              108% OF TARGET
            </span>
          </div>
          {/* Gold pedestal */}
          <div
            className="w-44 rounded-t-lg flex items-center justify-center"
            style={{
              height: 170,
              background: "linear-gradient(180deg,#ffe066 0%,#c8900a 50%,#e8c040 100%)",
            }}
          >
            <span className="text-[26px] font-black tracking-[0.25em] text-orange-700/80">
              GOLD
            </span>
          </div>
        </div>

        {/* ── #3 Bronze ── */}
        <div className="flex flex-col items-center" style={{ marginBottom: 0 }}>
          <div className="relative mb-3">
            <Avatar initials="MV" bg="bg-gray-600" size="lg" ring="ring-amber-700" />
            <span className="absolute -bottom-1 -right-1 size-6 rounded-md bg-amber-700 text-white text-[11px] font-black flex items-center justify-center shadow">
              3
            </span>
          </div>
          <p className="font-black text-[16px] text-gray-900 text-center">Marcus Voe</p>
          <p className="text-[15px] font-bold text-blue-600">₹790,200</p>
          <p className="text-[10px] font-semibold text-gray-500 tracking-wider mb-3">
            88% OF TARGET
          </p>
          {/* Bronze pedestal */}
          <div
            className="w-36 rounded-t-lg flex items-center justify-center"
            style={{
              height: 90,
              background: "linear-gradient(180deg,#e8b880 0%,#a0622a 50%,#c8845a 100%)",
            }}
          >
            <span className="text-[22px] font-black tracking-[0.25em] text-orange-900/80">
              BRONZE
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Best Performers Panel ─────────────────────────────────────────────────────

function BestPerformers() {
  return (
    <div className="w-[340px] shrink-0 rounded-2xl border border-border bg-white p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[16px] font-bold">Best Performers - Today</h3>
        <span className="text-[9px] font-extrabold tracking-widest text-white bg-blue-500 px-2.5 py-0.5 rounded">
          LIVE
        </span>
      </div>

      {/* List */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {BEST_PERFORMERS.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <Avatar initials={p.initials} bg={p.avatarBg} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-gray-900 truncate">{p.name}</p>
              <p className="text-[10px] font-semibold tracking-wider text-gray-400">
                {p.deals} DEALS
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[13px] font-bold text-gray-900">{p.revenue}</p>
              <p className="text-[11px] font-bold text-green-500 flex items-center justify-end gap-0.5">
                {p.change}
                <TrendingUp className="size-3" />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="mt-5 w-full py-2.5 rounded-xl border border-border text-[11px] font-extrabold tracking-widest text-gray-500 hover:bg-muted/40 transition-colors">
        VIEW ALL ACTIVITY
      </button>
    </div>
  );
}

// ─── Rankings Table (rank 4+) ─────────────────────────────────────────────────

function RankingsTable() {
  const agentBgs = ["bg-rose-400", "bg-gray-600", "bg-amber-500"];

  return (
    <div className="space-y-3">
      {/* Header row */}
      <div className="grid grid-cols-[80px_1fr_2fr_180px] px-6 py-2">
        {["RANK", "SALES AGENT", "PERFORMANCE PROGRESS", "REVENUE / TARGET"].map(
          (h, i) => (
            <span
              key={h}
              className={cn(
                "text-[10px] font-extrabold tracking-[0.15em] text-gray-400",
                i === 3 && "text-right"
              )}
            >
              {h}
            </span>
          )
        )}
      </div>

      {/* Rows */}
      {RANK_ROWS.map((r, idx) => (
        <div
          key={r.rank}
          className="card-elevated grid grid-cols-[80px_1fr_2fr_180px] items-center px-6 py-4 rounded-2xl"
        >
          {/* Rank */}
          <span className="text-[26px] font-black text-gray-800">{r.rank}</span>

          {/* Agent */}
          <div className="flex items-center gap-3">
            <Avatar
              initials={r.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
              bg={agentBgs[idx]}
              size="md"
            />
            <div>
              <p className="text-[14px] font-bold text-gray-900">{r.name}</p>
              <p className="text-[11px] text-gray-400">{r.title}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="pr-8">
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-2">
              <div
                className={cn("h-full rounded-full", r.barColor)}
                style={{ width: `${r.progress}%` }}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-gray-500">
                {r.progress}% COMPLETE
              </span>
              {r.weekChange && (
                <span className="text-[11px] font-bold text-blue-500">
                  {r.weekChange}
                </span>
              )}
            </div>
          </div>

          {/* Revenue */}
          <div className="text-right">
            <span className="text-[15px] font-black text-gray-900">{r.revenue}</span>
            <span className="text-[13px] text-gray-400 ml-1">/ {r.target}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeadershipPage() {
  const [tab, setTab] = React.useState<Tab>("QUARTERLY");

  return (
    <CrmLayout showSubNav={false} showMetrics={false}>
      <div className="space-y-6">

        {/* ── Section header + tabs ── */}
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-black tracking-tight">
            Quarterly Rankings
          </h2>
          <div className="flex rounded-xl border border-border overflow-hidden">
            {(["DAILY", "MONTHLY", "QUARTERLY"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-5 py-2 text-[12px] font-extrabold tracking-wider transition-colors",
                  tab === t
                    ? "bg-primary text-white"
                    : "bg-white text-muted-foreground hover:bg-muted/40"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── Podium + Best Performers ── */}
        <div className="flex gap-5">
          <Podium />
          <BestPerformers />
        </div>

        {/* ── Rankings table rows 4-6 ── */}
        <RankingsTable />

      </div>
    </CrmLayout>
  );
}