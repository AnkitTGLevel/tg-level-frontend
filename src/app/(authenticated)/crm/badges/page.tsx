"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Badge icon types ─────────────────────────────────────────────────────────

type BadgeMetal = "silver" | "bronze" | "gold";
type BadgeShape = "trophy-coin" | "rocket-shield" | "target-shield" | "crown-coin";

interface BadgeItem {
  shape: BadgeShape;
  metal: BadgeMetal;
  name: string;
  desc: string;
  unlockedDate: string;
  hasCheckIcon: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BADGES: BadgeItem[] = [
  // Row 1
  {
    shape: "trophy-coin",
    metal: "silver",
    name: "REVENUE CHAMPION",
    desc: "Closed ₹100k in 30 days",
    unlockedDate: "Unlocked Oct 12",
    hasCheckIcon: false,
  },
  {
    shape: "rocket-shield",
    metal: "silver",
    name: "REVENUE CHAMPION",
    desc: "Closed ₹100k in 30 days",
    unlockedDate: "Unlocked Oct 12",
    hasCheckIcon: true,
  },
  {
    shape: "target-shield",
    metal: "bronze",
    name: "REVENUE CHAMPION",
    desc: "Closed ₹100k in 30 days",
    unlockedDate: "Unlocked Oct 12",
    hasCheckIcon: true,
  },
  {
    shape: "crown-coin",
    metal: "gold",
    name: "REVENUE CHAMPION",
    desc: "Closed ₹100k in 30 days",
    unlockedDate: "Unlocked Oct 12",
    hasCheckIcon: true,
  },
  // Row 2
  {
    shape: "target-shield",
    metal: "bronze",
    name: "REVENUE CHAMPION",
    desc: "Closed ₹100k in 30 days",
    unlockedDate: "Unlocked Oct 12",
    hasCheckIcon: true,
  },
  {
    shape: "rocket-shield",
    metal: "silver",
    name: "REVENUE CHAMPION",
    desc: "Closed ₹100k in 30 days",
    unlockedDate: "Unlocked Oct 12",
    hasCheckIcon: true,
  },
  {
    shape: "trophy-coin",
    metal: "silver",
    name: "REVENUE CHAMPION",
    desc: "Closed ₹100k in 30 days",
    unlockedDate: "Unlocked Oct 12",
    hasCheckIcon: true,
  },
  {
    shape: "crown-coin",
    metal: "gold",
    name: "REVENUE CHAMPION",
    desc: "Closed ₹100k in 30 days",
    unlockedDate: "Unlocked Oct 12",
    hasCheckIcon: true,
  },
];

// ─── Metal palette ────────────────────────────────────────────────────────────

const METAL_STYLES: Record<
  BadgeMetal,
  { outer: string; inner: string; accent: string; rim: string }
> = {
  silver: {
    outer: "from-[#c8c8c8] via-[#e8e8e8] to-[#a0a0a0]",
    inner: "from-[#d8d8d8] via-[#f0f0f0] to-[#b0b0b0]",
    accent: "#888",
    rim: "border-[#b0b0b0]",
  },
  bronze: {
    outer: "from-[#b87333] via-[#d4956a] to-[#8b5a2b]",
    inner: "from-[#c8843c] via-[#e0a870] to-[#9a6030]",
    accent: "#7a4020",
    rim: "border-[#a06030]",
  },
  gold: {
    outer: "from-[#c8a000] via-[#f0d060] to-[#a07800]",
    inner: "from-[#d8b010] via-[#ffe070] to-[#b08808]",
    accent: "#806000",
    rim: "border-[#b09000]",
  },
};

// ─── Badge SVG icons ──────────────────────────────────────────────────────────

function TrophyCoinBadge({ metal }: { metal: BadgeMetal }) {
  const m = METAL_STYLES[metal];
  return (
    <div className="relative flex items-center justify-center size-28">
      {/* Coin outer ring */}
      <div
        className={cn(
          "size-28 rounded-full bg-gradient-to-br flex items-center justify-center border-4",
          m.outer,
          m.rim
        )}
      >
        {/* Coin inner */}
        <div
          className={cn(
            "size-[88px] rounded-full bg-gradient-to-br flex items-center justify-center border-2",
            m.inner,
            m.rim
          )}
        >
          {/* Decorative ring */}
          <div
            className={cn(
              "size-[72px] rounded-full border-2 flex items-center justify-center",
              m.rim
            )}
            style={{ borderStyle: "dashed" }}
          >
            {/* Trophy icon */}
            <svg
              viewBox="0 0 40 40"
              className="size-9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6h20v12a10 10 0 01-20 0V6z"
                fill={m.accent}
                stroke={m.accent}
                strokeWidth="1"
                opacity="0.8"
              />
              <path
                d="M6 8h4v8a4 4 0 01-4-4V8zM34 8h-4v8a4 4 0 004-4V8z"
                fill={m.accent}
                opacity="0.6"
              />
              <rect x="15" y="28" width="10" height="3" rx="1" fill={m.accent} opacity="0.8" />
              <rect x="12" y="31" width="16" height="2.5" rx="1" fill={m.accent} opacity="0.8" />
              <path d="M16 18l4-3 4 3-1.5-4.5 3.5-2.5h-4.5L20 9l-1.5 4.5H14l3.5 2.5L16 18z"
                fill="white" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function RocketShieldBadge({ metal }: { metal: BadgeMetal }) {
  const m = METAL_STYLES[metal];
  return (
    <div className="relative flex items-center justify-center size-28">
      {/* Shield shape via clip */}
      <div
        className={cn(
          "w-24 h-28 bg-gradient-to-b flex items-center justify-center border-4",
          m.outer,
          m.rim
        )}
        style={{
          clipPath: "polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)",
        }}
      >
        <div
          className={cn(
            "w-[76px] h-[92px] bg-gradient-to-b flex items-center justify-center",
            m.inner
          )}
          style={{
            clipPath: "polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)",
          }}
        >
          {/* Rocket */}
          <svg viewBox="0 0 36 36" className="size-10" fill="none">
            <path
              d="M18 4 C18 4, 26 10, 26 20 L18 28 L10 20 C10 10, 18 4, 18 4Z"
              fill={m.accent}
              opacity="0.85"
            />
            <ellipse cx="18" cy="17" rx="4" ry="5" fill="white" opacity="0.6" />
            <path d="M10 20 L6 26 L12 24Z" fill={m.accent} opacity="0.7" />
            <path d="M26 20 L30 26 L24 24Z" fill={m.accent} opacity="0.7" />
            <circle cx="18" cy="17" r="2" fill={m.accent} opacity="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TargetShieldBadge({ metal }: { metal: BadgeMetal }) {
  const m = METAL_STYLES[metal];
  return (
    <div className="relative flex items-center justify-center size-28">
      <div
        className={cn(
          "w-24 h-28 bg-gradient-to-b flex items-center justify-center border-4",
          m.outer,
          m.rim
        )}
        style={{
          clipPath: "polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)",
        }}
      >
        <div
          className={cn(
            "w-[76px] h-[92px] bg-gradient-to-b flex items-center justify-center",
            m.inner
          )}
          style={{
            clipPath: "polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)",
          }}
        >
          {/* Target crosshair */}
          <svg viewBox="0 0 36 36" className="size-10" fill="none">
            <circle cx="18" cy="18" r="12" stroke={m.accent} strokeWidth="2" opacity="0.7" />
            <circle cx="18" cy="18" r="7" stroke={m.accent} strokeWidth="2" opacity="0.8" />
            <circle cx="18" cy="18" r="3" fill={m.accent} opacity="0.9" />
            <line x1="18" y1="4" x2="18" y2="10" stroke={m.accent} strokeWidth="2" />
            <line x1="18" y1="26" x2="18" y2="32" stroke={m.accent} strokeWidth="2" />
            <line x1="4" y1="18" x2="10" y2="18" stroke={m.accent} strokeWidth="2" />
            <line x1="26" y1="18" x2="32" y2="18" stroke={m.accent} strokeWidth="2" />
            {/* Text overlay */}
            <text x="18" y="16" textAnchor="middle" fontSize="4" fill={m.accent} fontWeight="bold" opacity="0.6">QUARTERLY</text>
            <text x="18" y="21" textAnchor="middle" fontSize="3.5" fill={m.accent} fontWeight="bold" opacity="0.6">TOP BILLING</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function CrownCoinBadge({ metal }: { metal: BadgeMetal }) {
  const m = METAL_STYLES[metal];
  return (
    <div className="relative flex items-center justify-center size-28">
      <div
        className={cn(
          "size-28 rounded-full bg-gradient-to-br flex items-center justify-center border-4",
          m.outer,
          m.rim
        )}
      >
        <div
          className={cn(
            "size-[88px] rounded-full bg-gradient-to-br flex items-center justify-center border-2",
            m.inner,
            m.rim
          )}
        >
          <div
            className={cn(
              "size-[72px] rounded-full border-2 flex items-center justify-center",
              m.rim
            )}
          >
            {/* Crown */}
            <svg viewBox="0 0 40 40" className="size-10" fill="none">
              <path
                d="M6 28 L8 16 L15 22 L20 10 L25 22 L32 16 L34 28 Z"
                fill={m.accent}
                stroke={m.accent}
                strokeWidth="1"
                opacity="0.85"
              />
              <rect x="6" y="28" width="28" height="4" rx="1" fill={m.accent} opacity="0.8" />
              <circle cx="8" cy="16" r="2" fill="white" opacity="0.6" />
              <circle cx="20" cy="10" r="2" fill="white" opacity="0.6" />
              <circle cx="32" cy="16" r="2" fill="white" opacity="0.6" />
              <text x="20" y="38" textAnchor="middle" fontSize="3" fill={m.accent} opacity="0.5">CHAMPION</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeIcon({ shape, metal }: { shape: BadgeShape; metal: BadgeMetal }) {
  switch (shape) {
    case "trophy-coin":     return <TrophyCoinBadge metal={metal} />;
    case "rocket-shield":   return <RocketShieldBadge metal={metal} />;
    case "target-shield":   return <TargetShieldBadge metal={metal} />;
    case "crown-coin":      return <CrownCoinBadge metal={metal} />;
  }
}

// ─── Badge Card ───────────────────────────────────────────────────────────────

function BadgeCard({ badge }: { badge: BadgeItem }) {
  return (
    <div className="rounded-2xl bg-[#111318] border border-white/5 flex flex-col items-center px-5 pt-8 pb-5 text-center group hover:border-white/15 transition-colors">
      {/* Icon */}
      <div className="mb-6">
        <BadgeIcon shape={badge.shape} metal={badge.metal} />
      </div>

      {/* Name */}
      <p className="text-[13px] font-black tracking-[0.18em] text-white mb-1">
        {badge.name}
      </p>

      {/* Desc */}
      <p className="text-[11px] text-gray-400 mb-4">{badge.desc}</p>

      {/* Divider */}
      <div className="w-full border-t border-white/10 mb-4" />

      {/* Unlocked row */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-white/80">
        {badge.hasCheckIcon && (
          <CheckCircle2 className="size-3.5 text-white/60 shrink-0" />
        )}
        {badge.unlockedDate}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BadgesPage() {
  return (
    <CrmLayout showSubNav={false}>
      <div className="space-y-6">
        <h2 className="text-[26px] font-black tracking-tight text-foreground">
          Agent Performance Badges
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES.map((badge, i) => (
            <BadgeCard key={i} badge={badge} />
          ))}
        </div>
      </div>
    </CrmLayout>
  );
}