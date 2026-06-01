"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

type Tab = "Count" | "Conversion %" | "Drop %" | "Velocity";

const STAGES = [
  {
    subLabel: "LEADS TO",
    label: "Contacted",
    current: 48720,
    prev: 23480,
    color: "#4F46E5", // Deep Indigo/Blue
    topColor: "#86EFAC",
  },
  {
    subLabel: "CONTACTED TO",
    label: "Interested",
    current: 23480,
    prev: 11230,
    color: "#6366F1",
    topColor: "#86EFAC",
  },
  {
    subLabel: "INTERESTED TO",
    label: "Trial",
    current: 11230,
    prev: 10000, // Adjusted to match visual height
    color: "#6366F1",
    topColor: "#FCA5A5",
  },
  {
    subLabel: "TRIAL TO",
    label: "Intent",
    current: 3520,
    prev: 6200,
    color: "#6366F1",
    topColor: "#FCA5A5",
  },
  {
    subLabel: "INTENT TO",
    label: "Paid",
    current: 1240,
    prev: 4200,
    color: "#6366F1",
    topColor: "#FCA5A5",
  },
];

export default function ConversionFunnel() {
  const [activeTab, setActiveTab] = useState<Tab>("Conversion %");

  const maxValue = 50000;
  const maxBarHeight = 210;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-zinc-900">Conversion Funnel Analysis</h3>
          <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500">i</div>
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-100 p-1 rounded-2xl">
          {["Count", "Conversion %", "Drop %", "Velocity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`px-5 py-1.5 text-sm font-medium rounded-xl transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-zinc-600 hover:bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-zinc-500 mb-6">
        Last 48 Hours Comparison (14 May 2025 – 15 May 2025)
      </p>

      {/* Flow Distribution Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-violet-600">✦</span>
          <span className="font-semibold text-zinc-900">Flow Distribution</span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-600 rounded" />
            <span className="text-zinc-600">Current Period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-300 rounded" />
            <span className="text-zinc-600">Previous Baseline</span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="relative flex gap-8">
        {/* Y Axis */}
        <div className="flex flex-col justify-between text-right pr-4 text-sm text-zinc-500 pt-2 pb-10" style={{ minWidth: "55px" }}>
          {[50000, 40000, 30000, 20000, 10000, 0].map((v, i) => (
            <div key={i}>{v.toLocaleString()}</div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="flex-1 grid grid-cols-5 gap-6 relative">
          {STAGES.map((stage, index) => {
            const currentHeight = Math.round((stage.current / maxValue) * maxBarHeight);
            const prevHeight = Math.round((stage.prev / maxValue) * maxBarHeight);

            return (
              <div key={index} className="flex flex-col items-center">
                {/* Top Value Labels */}
                <div className={`text-xs font-bold px-3 py-1 rounded-full mb-2 ${
                  index <= 1 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
                }`}>
                  {stage.current.toLocaleString()}
                </div>

                {/* Bar Area */}
                <div className="relative w-full flex justify-center" style={{ height: maxBarHeight + 20 }}>
                  {/* Current Bar */}
                  <div
                    className="absolute bottom-0 w-10 rounded-t-2xl shadow-md"
                    style={{
                      height: `${currentHeight}px`,
                      background: `linear-gradient(to top, ${stage.color} 0%, #818CF8 100%)`,
                    }}
                  />

                  {/* Previous Bar */}
                  <div
                    className="absolute bottom-0 w-[26px] rounded-t-2xl bg-zinc-300"
                    style={{
                      height: `${prevHeight}px`,
                      left: "50%",
                      transform: "translateX(18px)",
                    }}
                  />
                </div>

                {/* Stage Labels */}
                <div className="text-center mt-4">
                  <div className="text-[11px] text-zinc-500 font-medium">{stage.subLabel}</div>
                  <div className="font-bold text-zinc-900 text-[15px] mt-0.5">{stage.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Gap Card */}
        <div className="absolute top-12 right-8 w-72 bg-white rounded-2xl shadow-2xl border p-5 z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-zinc-700">PERFORMANCE GAP</span>
            <span className="bg-rose-100 text-rose-600 text-xs font-bold px-3 py-0.5 rounded-md">Alert</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-zinc-600">Current Path</span>
              <span className="font-bold text-xl">11,230</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Target Goal</span>
              <span className="font-bold text-xl">20,000</span>
            </div>
            <div className="pt-3 border-t border-dashed border-rose-200">
              <div className="flex justify-between items-end">
                <span className="text-rose-600 font-medium">Net Variance</span>
                <span className="text-rose-600 text-2xl font-bold">-8,770</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}