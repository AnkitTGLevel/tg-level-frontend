"use client";

import React, { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

interface StageCard {
  label: string;         // display name
  pct: number;           // retention % (used for bar width)
  dropOff: number;       // drop-off % shown below (0 = no drop-off badge for "paid")
  cardBg: string;        // card background colour
  cardBorder: string;    // card border colour
  barFill: string;       // progress bar fill colour
  icon: string;          // emoji / symbol standing in for the original SVG icon
}

const STAGES: StageCard[] = [
  {
    label: "trail stared",
    pct: 100,
    dropOff: 22.4,
    cardBg: "#F6F9FE",
    cardBorder: "#003CA0",
    barFill: "#003CA1",
    icon: "🚀",
  },
  {
    label: "community\njoined",
    pct: 77.6,
    dropOff: 22.2,
    cardBg: "#F8FCFB",
    cardBorder: "#00946F",
    barFill: "#00946F",
    icon: "👥",
  },
  {
    label: "viewed trades",
    pct: 60.4,
    dropOff: 24.7,
    cardBg: "#FAF7FE",
    cardBorder: "#43009C",
    barFill: "#43009C",
    icon: "📈",
  },
  {
    label: "engaged in poll",
    pct: 45.5,
    dropOff: 22.7,
    cardBg: "#FEFBF3",
    cardBorder: "#946B00",
    barFill: "#946B00",
    icon: "📊",
  },
  {
    label: "asked questions",
    pct: 35.2,
    dropOff: 30.3,
    cardBg: "#FDF7F9",
    cardBorder: "#990033",
    barFill: "#990033",
    icon: "💬",
  },
  {
    label: "viewed pricing",
    pct: 24.5,
    dropOff: 56.3,
    cardBg: "#F5FDFC",
    cardBorder: "#008C7B",
    barFill: "#008D7B",
    icon: "💰",
  },
  {
    label: "payment intent",
    pct: 10.5,
    dropOff: 58.6,
    cardBg: "#F7FDF9",
    cardBorder: "#00802A",
    barFill: "#00812B",
    icon: "💳",
  },
  {
    label: "paid",
    pct: 4.4,
    dropOff: 0,
    cardBg: "#F9FFF8",
    cardBorder: "#148C00",
    barFill: "#148C00",
    icon: "✅",
  },
];

interface ScoreBand {
  range: string;
  label: string;
  count: string;
  pct: string;
  dot: string;          // tailwind bg colour class
  countColor: string;   // tailwind text class
}

const SCORE_BANDS: ScoreBand[] = [
  { range: "90 – 100", label: "Highly Engaged", count: "1,120", pct: "13.6%", dot: "bg-green-400",  countColor: "text-green-700"  },
  { range: "70 – 89",  label: "Engaged",         count: "2,130", pct: "30.9%", dot: "bg-blue-500",  countColor: "text-blue-700"   },
  { range: "40 – 69",  label: "Moderate",         count: "2,260", pct: "37.2%", dot: "bg-amber-400", countColor: "text-amber-700"  },
  { range: "20 – 39",  label: "Low",              count: "800",   pct: "12.4%", dot: "bg-[#F97316]", countColor: "text-orange-700" },
  { range: "0 – 19",   label: "Not Engaged",      count: "1,400", pct: "5.9%",  dot: "bg-red-500",   countColor: "text-red-700"    },
];

// ─── Donut chart (pure SVG, no library) ─────────────────────────────────────
// Bands in order: green, blue, amber, orange, red — proportional to pct
const DONUT_BANDS = [
  { pct: 13.6, color: "#4ade80" },
  { pct: 30.9, color: "#3b82f6" },
  { pct: 37.2, color: "#fbbf24" },
  { pct: 12.4, color: "#f97316" },
  { pct:  5.9, color: "#ef4444" },
];
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function buildDonutArcs() {
  let offset = 0;
  return DONUT_BANDS.map((b) => {
    const dash = (b.pct / 100) * CIRCUMFERENCE;
    const gap  = CIRCUMFERENCE - dash;
    const rotation = (offset / 100) * 360 - 90; // start from top
    offset += b.pct;
    return { ...b, dash, gap, rotation };
  });
}
const ARCS = buildDonutArcs();

// ─── Component ──────────────────────────────────────────────────────────────

export default function EngagementFunnel() {
  const [showCount, setShowCount] = useState(true);

  return (
    <div
      className="flex flex-col gap-[26px] bg-white rounded-[13px] border border-[#EDEEF5]"
      style={{ boxShadow: "0px 3px 6px rgba(0,0,0,0.05)" }}
    >
      {/* ── Section header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 pt-5 gap-6">
        <div className="flex items-center gap-2.5">
          <span className="text-[#1B1B24] text-[22px] font-bold leading-none">
            Engagement funnel Flow
          </span>
          <span className="text-gray-400 text-[11px] mt-1">(Last 48 Hours)</span>
          {/* info icon */}
          <span className="w-[18px] h-[18px] rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] text-[#464555] font-bold flex-shrink-0">
            i
          </span>
        </div>

        {/* Toggle + All Stages */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Show count toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#4B5568] text-[11px]">Show count</span>
            <button
              onClick={() => setShowCount(true)}
              className={`flex items-center py-[3px] px-0.5 rounded-[19px] w-9 transition-colors ${
                showCount ? "bg-indigo-500 justify-end" : "bg-gray-200 justify-start"
              }`}
            >
              <div className="bg-white w-[13px] h-[13px] rounded-md" style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
          {/* Show % toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#4B5568] text-[11px]">Show %</span>
            <button
              onClick={() => setShowCount(false)}
              className={`flex items-center py-[3px] px-0.5 rounded-[19px] w-9 transition-colors ${
                !showCount ? "bg-indigo-500 justify-end" : "bg-gray-200 justify-start"
              }`}
            >
              <div className="bg-white w-[13px] h-[13px] rounded-md" style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
          {/* All Stages pill */}
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-[7px] py-[7px] px-3 text-gray-700 text-[11px]">
            All Stages
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M3 5l3.5 3.5L10 5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Stage cards row ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-[3px] px-4 pb-0">
        {STAGES.map((s, i) => (
          <React.Fragment key={i}>
            <div
              className="flex flex-1 flex-col items-center rounded-lg py-[21px] px-[13px]"
              style={{
                backgroundColor: s.cardBg,
                border: `1px solid ${s.cardBorder}`,
              }}
            >
              {/* Icon */}
              <span className="text-[22px] mb-[14px] leading-none">{s.icon}</span>

              {/* Label — supports newline */}
              <span className="text-black text-[11px] text-center mb-3 leading-[1.3] whitespace-pre-line">
                {s.label}
              </span>

              {/* Progress bar */}
              <div className="items-start self-stretch bg-[#D9D9D9] mb-2 rounded-md" style={{ height: 6 }}>
                <div
                  className="h-full rounded-md"
                  style={{
                    width: `${s.pct}%`,
                    backgroundColor: s.barFill,
                    minWidth: s.pct > 0 ? 4 : 0,
                  }}
                />
              </div>

              {/* Retention % */}
              <span className="text-black text-[11px] font-medium">{s.pct} %</span>
            </div>

            {/* Connector line between cards */}
            {i < STAGES.length - 1 && (
              <div className="flex-shrink-0 w-4 h-[1px] bg-gray-300" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Drop-off badges row ──────────────────────────────────────────── */}
      <div className="flex items-center px-4 gap-0">
        {STAGES.map((s, i) => (
          <React.Fragment key={i}>
            {s.dropOff > 0 ? (
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-black text-[11px]">drop off</span>
                <button
                  className="flex flex-col items-center self-stretch bg-white py-2 rounded text-black text-[15px] font-medium border-0"
                  style={{ boxShadow: "0px 1px 4px rgba(0,0,0,0.25)" }}
                >
                  {s.dropOff} %
                </button>
              </div>
            ) : (
              /* "paid" — no drop-off, keep spacing */
              <div className="flex-1" />
            )}
            {/* spacer between items to align with connector lines */}
            {i < STAGES.length - 1 && <div className="flex-shrink-0 w-4" />}
          </React.Fragment>
        ))}
      </div>

      {/* ── Bottom row: Engagement Score Distribution + Band Insights ─────── */}
      <div className="flex items-start gap-5 px-4 pb-6">

        {/* Left: Donut + legend list */}
        <div
          className="flex flex-col items-start bg-white py-5 rounded-lg flex-shrink-0"
          style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", minWidth: 260 }}
        >
          {/* Title */}
          <div className="flex flex-col mb-4 px-6">
            <span className="text-slate-700 text-[14px] font-bold">Engagement Score Distribution</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-slate-500 text-[11px]">(Last 48 Hours)</span>
              <span className="w-[18px] h-[18px] rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] text-[#464555] font-bold flex-shrink-0">i</span>
            </div>
          </div>

          {/* Donut + band list side-by-side */}
          <div className="flex items-start gap-4 px-4">
            {/* SVG Donut */}
            <div className="relative flex-shrink-0" style={{ width: 110, height: 110 }}>
              <svg width="110" height="110" viewBox="0 0 110 110">
                {/* Background track */}
                <circle
                  cx="55" cy="55" r={RADIUS}
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="12"
                />
                {/* Coloured arcs */}
                {ARCS.map((arc, i) => (
                  <circle
                    key={i}
                    cx="55" cy="55" r={RADIUS}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="12"
                    strokeDasharray={`${arc.dash} ${arc.gap}`}
                    strokeDashoffset={0}
                    transform={`rotate(${arc.rotation} 55 55)`}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>
              {/* Centre label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-[9px] font-medium leading-none">AVG. SCORE</span>
                <div className="flex items-baseline gap-0.5 mt-1">
                  <span className="text-slate-800 text-[22px] font-bold leading-none">68</span>
                  <span className="text-slate-400 text-[11px] leading-none">/100</span>
                </div>
              </div>
            </div>

            {/* Band list */}
            <div className="flex flex-col gap-[10px] pt-1">
              {SCORE_BANDS.map((b) => (
                <div key={b.range} className="flex flex-col gap-0.5">
                  {/* dot + range + label */}
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${b.dot}`} />
                    <span className="text-slate-600 text-[11px]">
                      {b.range} ({b.label})
                    </span>
                  </div>
                  {/* count bold */}
                  <span className={`text-[11px] font-bold ml-4 ${b.countColor}`}>
                    {b.count} ({b.pct})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Band Insights table + Engagement Trend */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Band Insights table */}
          <div
            className="bg-white rounded-[13px] border border-[#EDEEF5] overflow-hidden"
            style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center gap-1.5 px-6 py-4 border-b border-[#EDEEF5]">
              <span className="text-[#1A1D23] text-[13px] font-bold">Engagement Score Band Insights</span>
              <span className="text-slate-500 text-[11px]">(Last 48H)</span>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[160px_80px_1fr_120px] px-6 py-2 bg-[#F8FAFC]">
              <span className="text-slate-600 text-[11px] font-bold">BAND</span>
              <span className="text-slate-600 text-[11px] font-bold">LEADS</span>
              <span className="text-slate-600 text-[11px] font-bold">KEY BEHAVIOR</span>
              <span className="text-slate-600 text-[11px] font-bold text-right">CONVERSION RATE</span>
            </div>

            {/* Table rows */}
            {[
              { band: "90 – 100", label: "Highly Engaged", dot: "bg-green-400",  leads: "1,120", behavior: "Active in community, views trades, reacts", rate: "12.4%", rateColor: "text-green-700"  },
              { band: "70 – 89",  label: "Engaged",         dot: "bg-blue-500",  leads: "2,130", behavior: "Regular activity, consuming content",       rate: "7.1%",  rateColor: "text-blue-700"   },
              { band: "40 – 69",  label: "Moderate",         dot: "bg-amber-400", leads: "2,260", behavior: "Some activity, inconsistent",               rate: "3.2%",  rateColor: "text-amber-700"  },
              { band: "20 – 39",  label: "Low",              dot: "bg-[#F97316]", leads: "800",   behavior: "Low activity, rarely interacts",             rate: "1.2%",  rateColor: "text-orange-700" },
              { band: "0 – 19",   label: "Not Engaged",      dot: "bg-red-500",   leads: "1,400", behavior: "Inactive, no meaningful actions",           rate: "0.4%",  rateColor: "text-red-700"    },
            ].map((row) => (
              <div
                key={row.band}
                className="grid grid-cols-[160px_80px_1fr_120px] items-center px-6 py-[14px] border-b border-[#EDEEF5] last:border-0 hover:bg-[#FAFAFA] transition-colors"
              >
                {/* Band badge */}
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${row.dot}`} />
                  <div className="flex flex-col">
                    <span className="text-slate-700 text-[12px] font-semibold">{row.band}</span>
                    <span className="text-slate-500 text-[10px]">({row.label})</span>
                  </div>
                </div>
                <span className="text-slate-700 text-[12px]">{row.leads}</span>
                <span className="text-slate-600 text-[12px]">{row.behavior}</span>
                <span className={`text-[12px] font-bold text-right ${row.rateColor}`}>{row.rate}</span>
              </div>
            ))}
          </div>

          {/* Engagement Trend mini chart */}
          <div
            className="bg-white rounded-[13px] border border-[#EAECF0] px-5 py-4"
            style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-gray-800 text-[13px] font-bold">Engagement Trend</span>
              {/* Legend */}
              {[
                { label: "90–100", color: "#4ade80" },
                { label: "70–89",  color: "#3b82f6" },
                { label: "40–69",  color: "#fbbf24" },
                { label: "20–39",  color: "#f97316" },
                { label: "0–19",   color: "#ef4444" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
                  <div className="w-[9px] h-[1px] flex-shrink-0" style={{ backgroundColor: l.color }} />
                  <span className="text-gray-700 text-[10px]">{l.label}</span>
                </div>
              ))}
            </div>

            {/* Y axis + chart */}
            <div className="flex items-start gap-2">
              <div className="flex flex-col justify-between items-end" style={{ height: 142, paddingBottom: 4 }}>
                {["100", "75", "50", "25", "0"].map((v) => (
                  <span key={v} className="text-gray-500 text-[10px] leading-none">{v}</span>
                ))}
              </div>
              <div className="flex-1" style={{ height: 142 }}>
                <svg viewBox="0 0 528 142" width="100%" height="142" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 35, 71, 107, 142].map((y) => (
                    <line key={y} x1="0" y1={y} x2="528" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                  ))}
                  {/* 5 engagement band trend lines — approximate data */}
                  <path d="M0,10 L66,8 L132,12 L198,7 L264,9 L330,6 L396,8 L462,5 L528,4" stroke="#4ade80" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,38 L66,32 L132,36 L198,28 L264,30 L330,24 L396,26 L462,20 L528,18" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,60 L66,58 L132,64 L198,55 L264,58 L330,50 L396,52 L462,46 L528,44" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,90 L66,88 L132,92 L198,85 L264,87 L330,80 L396,82 L462,76 L528,74" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M0,115 L66,112 L132,118 L198,110 L264,113 L330,108 L396,110 L462,105 L528,103" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* X axis labels */}
            <div className="flex items-center ml-7 mr-2 mt-1">
              {["May 13, 8 AM", "12 PM", "4 PM", "8 PM", "May 14, 12 AM", "4 AM", "8 AM"].map((t, i) => (
                <span key={i} className="flex-1 text-gray-500 text-[10px] text-center">{t}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}