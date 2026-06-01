"use client";

import React, { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface PipelineStage {
  label: string;
  count: string;
  dropped: string | null;
  cardBg: string;
  cardBorder: string;
  accentColor: string; // for the dropped badge
}

interface ReasonItem {
  label: string;
  pct: number; // numeric for bar width
  pctLabel: string;
  barColor: string; // tailwind bg-*
}

interface StageReason {
  stageNum: number;
  stageLabel: string;
  failurePct: string;
  failurePctNum: number; // for donut / ring
  reasons: ReasonItem[];
  ringColor: string; // stroke colour for the mini ring
}

interface SummaryRow {
  stage: string;
  entered: string;
  failed: string;
  failurePct: string;
  vsPrev: string;
  topReason: string;
  topReasonPct: string;
  highlight: boolean; // red-50 row
}

// ── Pipeline flow nodes ──────────────────────────────────────────────────────
const PIPELINE: PipelineStage[] = [
  { label: "Leads Created", count: "8,250", dropped: null,   cardBg: "#F6F9FE", cardBorder: "#003CA0", accentColor: "" },
  { label: "Contacted",     count: "5,840", dropped: "2,410 dropped", cardBg: "#F8FCFB", cardBorder: "#00946F", accentColor: "#00946F" },
  { label: "Demo Not Joined",count:"3,430", dropped: "2,410 dropped", cardBg: "#FAF7FE", cardBorder: "#43009C", accentColor: "#43009C" },
  { label: "Trial Started", count: "2,150", dropped: "1,280 dropped", cardBg: "#FEFBF3", cardBorder: "#946B00", accentColor: "#946B00" },
  { label: "Payment Intent",count:  "820",  dropped: "1,330 dropped", cardBg: "#FDF7F9", cardBorder: "#990033", accentColor: "#990033" },
  { label: "Paid",          count:  "360",  dropped:  "460 dropped",  cardBg: "#F9FFF8", cardBorder: "#148C00", accentColor: "#148C00" },
];

// ── Per-stage failure reasons ────────────────────────────────────────────────
const STAGE_REASONS: StageReason[] = [
  {
    stageNum: 1, stageLabel: "did not get contacted", failurePct: "29.2%", failurePctNum: 29.2, ringColor: "#ef4444",
    reasons: [
      { label: "No Call Made",         pct: 13.6, pctLabel: "13.6 %", barColor: "bg-red-500"     },
      { label: "Call Made - No Pickup",pct:  9.5, pctLabel: "9.5%",   barColor: "bg-pink-500"    },
      { label: "Invalid/Wrg No.",      pct:  4.4, pctLabel: "4.4%",   barColor: "bg-violet-500"  },
      { label: "Others",               pct:  1.8, pctLabel: "1.8%",   barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 2, stageLabel: "contacted but no response", failurePct: "42.8%", failurePctNum: 42.8, ringColor: "#f97316",
    reasons: [
      { label: "No Response",      pct: 12.1, pctLabel: "12.1%", barColor: "bg-red-500"     },
      { label: "Will Think Later", pct: 13.3, pctLabel: "13.3%", barColor: "bg-pink-500"    },
      { label: "Not Interested",   pct: 24.0, pctLabel: "24.0%", barColor: "bg-violet-500"  },
      { label: "Lang/Trust Issue", pct:  3.9, pctLabel: "3.9%",  barColor: "bg-blue-500"    },
      { label: "Others",           pct:  2.0, pctLabel: "2.0%",  barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 3, stageLabel: "demo not joined", failurePct: "37.3%", failurePctNum: 37.3, ringColor: "#a855f7",
    reasons: [
      { label: "No Show",          pct: 20.9, pctLabel: "20.9%", barColor: "bg-red-500"     },
      { label: "Rescheduled / NJ", pct: 10.5, pctLabel: "10.5",  barColor: "bg-pink-500"    },
      { label: "Lost Interest",    pct:  4.4, pctLabel: "4.4",   barColor: "bg-violet-500"  },
      { label: "Technical Issue",  pct:  0.9, pctLabel: "0.9%",  barColor: "bg-blue-500"    },
      { label: "Others",           pct:  0.6, pctLabel: "0.6%",  barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 4, stageLabel: "trial not activated", failurePct: "61.9%", failurePctNum: 61.9, ringColor: "#f59e0b",
    reasons: [
      { label: "Did Not Install",       pct: 24.2, pctLabel: "24.2%", barColor: "bg-red-500"     },
      { label: "Installed Not Activated",pct:19.5, pctLabel: "19.5%", barColor: "bg-pink-500"    },
      { label: "Conf Or Need Help",     pct: 11.2, pctLabel: "11.2%", barColor: "bg-violet-500"  },
      { label: "No Time",               pct:  4.7, pctLabel: "4.7%",  barColor: "bg-blue-500"    },
      { label: "Others",                pct:  2.3, pctLabel: "2.3%",  barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 5, stageLabel: "payment not completed", failurePct: "56.1%", failurePctNum: 56.1, ringColor: "#ec4899",
    reasons: [
      { label: "Price Objection",  pct: 17.1, pctLabel: "17.1%", barColor: "bg-red-500"     },
      { label: "Pay Link Not Used",pct: 22.0, pctLabel: "22.0%", barColor: "bg-pink-500"    },
      { label: "Pay Failed",       pct: 11.0, pctLabel: "11.0%", barColor: "bg-violet-500"  },
      { label: "Need More Time",   pct:  3.7, pctLabel: "3.7%",  barColor: "bg-blue-500"    },
      { label: "Others",           pct:  2.4, pctLabel: "2.4%",  barColor: "bg-emerald-500" },
    ],
  },
  {
    stageNum: 6, stageLabel: "did not become paid", failurePct: "44.0%", failurePctNum: 44.0, ringColor: "#10b981",
    reasons: [
      { label: "Last Min Drop",    pct: 17.1, pctLabel: "17.1%", barColor: "bg-red-500"     },
      { label: "Trust Issue",      pct: 22.0, pctLabel: "22.0%", barColor: "bg-pink-500"    },
      { label: "Chose Competitor", pct: 11.0, pctLabel: "11.0%", barColor: "bg-violet-500"  },
      { label: "Others",           pct:  2.4, pctLabel: "2.4%",  barColor: "bg-emerald-500" },
    ],
  },
];

// ── Failure Summary Table rows ───────────────────────────────────────────────
const SUMMARY_ROWS: SummaryRow[] = [
  { stage: "1. Did Not Get Contacted",  entered: "8,250", failed: "2,410", failurePct: "29.2%", vsPrev: "▲ 5.2 pp", topReason: "1A. No Call Made",           topReasonPct: "13.6%", highlight: false },
  { stage: "2. Contacted but No Response", entered:"5,840",failed:"2,410", failurePct: "42.8%", vsPrev: "▲ 6.8 pp", topReason: "2C. No Response",            topReasonPct: "24.0%", highlight: true  },
  { stage: "3. Demo Not Joined",        entered: "3,430", failed: "1,280", failurePct: "37.3%", vsPrev: "▲ 4.1 pp", topReason: "3A. No Show",                topReasonPct: "20.9%", highlight: false },
  { stage: "4. Trial Not Activated",    entered: "2,150", failed: "1,330", failurePct: "61.9%", vsPrev: "▲ 7.6 pp", topReason: "4A. Did Not Install",        topReasonPct: "24.2%", highlight: false },
  { stage: "5. Payment Not Completed",  entered:   "820", failed:   "460", failurePct: "56.1%", vsPrev: "▲ 5.9 pp", topReason: "5B. Payment Link Not Used",  topReasonPct: "22.0%", highlight: false },
  { stage: "6. Did Not Become Paid",    entered:   "360", failed:   "360", failurePct: "44.0%", vsPrev: "▲ 3.2 pp", topReason: "6A. Last Minute Drop",       topReasonPct: "14.6%", highlight: false },
  { stage: "Total",                     entered: "8,250", failed: "5,630", failurePct: "68.2%", vsPrev: "▲ 3.8 pp", topReason: "2C. No Response",            topReasonPct: "24.0%", highlight: false },
];

// ─── Mini ring (SVG donut) component ─────────────────────────────────────────
const R = 32;
const CIRC = 2 * Math.PI * R;

function MiniRing({ pct, color }: { pct: number; color: string }) {
  const filled = (pct / 100) * CIRC;
  return (
    <div className="relative flex-shrink-0" style={{ width: 78, height: 78 }}>
      <svg width="78" height="78" viewBox="0 0 78 78">
        <circle cx="39" cy="39" r={R} fill="none" stroke="#E8EAF0" strokeWidth="7" />
        <circle
          cx="39" cy="39" r={R} fill="none"
          stroke={color} strokeWidth="7"
          strokeDasharray={`${filled} ${CIRC - filled}`}
          transform="rotate(-90 39 39)"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#1A1D23] text-[13px] font-bold">{pct}%</span>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FailureFlow() {
  const [showCount, setShowCount] = useState(true);

  return (
    <div className="flex flex-col gap-[15px] w-full">

      {/* ── Section header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="text-[#1B1B24] text-[22px] font-bold leading-none">
            Failure Flow Every stage
          </span>
          <span className="text-gray-400 text-[11px] mt-1">(Last 48 Hours)</span>
          <span className="w-[18px] h-[18px] rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] text-[#464555] font-bold flex-shrink-0">i</span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Show count toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#4B5568] text-[11px]">Show count</span>
            <button
              onClick={() => setShowCount(true)}
              className={`flex items-center py-[3px] rounded-[19px] w-9 transition-colors ${showCount ? "bg-indigo-500 justify-end pr-0.5" : "bg-gray-200 justify-start pl-0.5"}`}
            >
              <div className="bg-white w-[13px] h-[13px] rounded-md" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
          {/* Show % toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#4B5568] text-[11px]">Show %</span>
            <button
              onClick={() => setShowCount(false)}
              className={`flex items-center py-[3px] rounded-[19px] w-9 transition-colors ${!showCount ? "bg-indigo-500 justify-end pr-0.5" : "bg-gray-200 justify-start pl-0.5"}`}
            >
              <div className="bg-white w-[13px] h-[13px] rounded-md" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-[7px] py-[7px] px-3 text-gray-700 text-[11px]">
            All Stages
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5l3 3 3-3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Pipeline flow bar ────────────────────────────────────────────── */}
      <div
        className="flex items-start bg-white py-[15px] px-[9px] rounded-[13px] border border-[#EDEEF5]"
        style={{ boxShadow: "0px 1px 5px rgba(0,0,0,0.07)" }}
      >
        {PIPELINE.map((s, i) => (
          <React.Fragment key={i}>
            {/* Stage node */}
            <div
              className="flex flex-1 flex-col items-center py-4 px-2 rounded-[7px] min-w-0"
              style={{ backgroundColor: s.cardBg, border: `1px solid ${s.cardBorder}` }}
            >
              {/* Count badge */}
              <div
                className="flex items-center justify-center rounded-md px-3 py-1 mb-2"
                style={{ backgroundColor: s.cardBorder + "18", border: `1px solid ${s.cardBorder}33` }}
              >
                <span className="text-[#1A1D23] text-[15px] font-bold">{s.count}</span>
              </div>
              <span className="text-black text-[11px] text-center leading-tight">{s.label}</span>

              {/* Dropped badge */}
              {s.dropped && (
                <div
                  className="mt-2 w-full text-center rounded-[5px] py-1 px-1 text-[10px] font-semibold"
                  style={{
                    backgroundColor: s.accentColor + "12",
                    border: `1px solid ${s.accentColor}33`,
                    color: s.accentColor,
                  }}
                >
                  {s.dropped}
                </div>
              )}
            </div>

            {/* Arrow connector */}
            {i < PIPELINE.length - 1 && (
              <div className="flex-shrink-0 flex items-center self-center px-1">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d="M1 7h14M11 2l5 5-5 5" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Top Failure Reasons by Stage ─────────────────────────────────── */}
      <div
        className="bg-white pt-6 pb-8 rounded-[15px] gap-[18px] flex flex-col"
        style={{ boxShadow: "0px 1px 5px rgba(0,0,0,0.07)" }}
      >
        {/* Sub-header */}
        <div className="flex items-center gap-[17px] ml-[25px]">
          <span className="text-[#1A1D23] text-[13px] font-bold">Top Failure Reasons by Stage</span>
          <span className="text-[#7C85A2] text-[11px]">(Click a stage to see details)</span>
          <span className="w-[18px] h-[18px] rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] text-[#464555] font-bold">i</span>
        </div>

        {/* 6-column reason grid */}
        <div
          className="flex items-start self-stretch mx-[25px] rounded-[11px] border border-[#E8EAF0] overflow-hidden"
        >
          {STAGE_REASONS.map((sr, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col min-w-0"
              style={{ borderRight: i < STAGE_REASONS.length - 1 ? "1px solid #E8EAF0" : "none" }}
            >
              {/* Stage header */}
              <div className="flex flex-col items-center bg-white pt-4 pb-2 px-2 border-b border-[#E8EAF0]">
                <span className="text-[#1A1D23] text-[11px] font-bold mb-[3px]">Stage {sr.stageNum}</span>
                <span className="text-gray-400 text-[9px] mb-3 text-center leading-tight">{sr.stageLabel}</span>

                {/* Mini donut ring */}
                <MiniRing pct={sr.failurePctNum} color={sr.ringColor} />
              </div>

              {/* Reason items */}
              <div className="bg-white px-3 py-3 flex flex-col gap-[6px]">
                {sr.reasons.map((r, ri) => (
                  <div key={ri}>
                    <div className="flex items-center gap-1 mb-[2px]">
                      <div className="w-1.5 h-1.5 rounded-[3px] bg-[#1A1D23] flex-shrink-0" />
                      <span className="text-[#1A1D23] text-[10px] flex-1 leading-tight">{r.label}</span>
                      <span className="text-[#1A1D23] text-[10px] font-bold flex-shrink-0">{r.pctLabel}</span>
                    </div>
                    {/* Bar */}
                    <div className="bg-[#E8EAF0] rounded-sm" style={{ height: 4 }}>
                      <div
                        className={`h-full rounded-sm ${r.barColor}`}
                        style={{ width: `${Math.min(r.pct * 4, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Failure Summary Table ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-[19px]">
        <div className="flex items-center gap-4">
          <span className="text-slate-900 text-[18px] font-bold">Failure Summary Table (Last 48H)</span>
          <span className="w-[18px] h-[18px] rounded-full bg-[#EDEEF5] flex items-center justify-center text-[10px] text-[#464555] font-bold">i</span>
        </div>

        <div
          className="bg-white rounded-[10px] border border-slate-200 overflow-hidden"
          style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.05)" }}
        >
          {/* Header */}
          <div className="grid grid-cols-[2fr_90px_90px_90px_100px_2fr_100px] bg-slate-50 py-[15px] px-5 border-b border-slate-200">
            {["Stage", "Entered", "Failed", "Failure %", "vs Prev 48H", "Top Reason", "Top Reason %"].map((h) => (
              <span key={h} className="text-slate-500 text-[13px] font-bold">{h}</span>
            ))}
          </div>

          {/* Rows */}
          {SUMMARY_ROWS.map((row, i) => {
            const isTotal = row.stage === "Total";
            return (
              <div
                key={i}
                className={`grid grid-cols-[2fr_90px_90px_90px_100px_2fr_100px] items-center px-5 py-4 border-b border-slate-100 last:border-0 ${
                  row.highlight ? "bg-red-50" : isTotal ? "bg-slate-50" : "hover:bg-slate-50/60"
                } transition-colors`}
              >
                <span className={`text-[13px] ${isTotal ? "text-slate-900 font-bold" : row.highlight ? "text-red-800 font-bold" : "text-slate-700"}`}>
                  {row.stage}
                </span>
                <span className={`text-[13px] ${isTotal ? "text-slate-900 font-bold" : "text-slate-600"}`}>{row.entered}</span>
                <span className={`text-[13px] ${isTotal ? "text-slate-900 font-bold" : row.highlight ? "text-red-800" : "text-slate-600"}`}>{row.failed}</span>
                <span className={`text-[13px] ${isTotal ? "text-slate-900 font-bold" : row.highlight ? "text-red-800" : "text-slate-600"}`}>{row.failurePct}</span>
                <span className={`text-[13px] font-bold ${isTotal ? "text-red-800" : "text-green-800"}`}>{row.vsPrev}</span>
                <span className={`text-[13px] ${isTotal ? "text-slate-900 font-bold" : "text-slate-500"}`}>{row.topReason}</span>
                <span className={`text-[13px] ${isTotal ? "text-slate-900 font-bold" : "text-slate-600"}`}>{row.topReasonPct}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
