import * as React from "react";

export default function ForecastChart() {
  const w = 780;
  const h = 280;
  const days = 30;

  // Simulated data tuned to match the PDF visual
  const forecast = Array.from({ length: days }, (_, i) => 28 + i * 3.8 + Math.sin(i / 3) * 4);
  const actual = Array.from({ length: days }, (_, i) => 
    i < 22 ? 22 + i * 4.1 + Math.cos(i / 2.5) * 7 : null
  );
  const revised = Array.from({ length: days }, (_, i) => 32 + i * 4.6);
  const totalRevenue = Array.from({ length: days }, (_, i) => 18 + i * 5.2);

  const maxY = 220;

  const x = (i: number) => 55 + (i / (days - 1)) * (w - 85);
  const y = (v: number) => h - 45 - (v / maxY) * (h - 75);

  const path = (arr: (number | null)[]) =>
    arr
      .map((v, i) => (v == null ? null : `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`))
      .filter(Boolean)
      .join(" ");

  return (
    <div className="col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Forecast vs Actual Graph
            </h3>
            <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
              PHASE 1 • FROZEN MEMORY
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            May 2026 • Daily view
          </p>
        </div>

        <button className="h-9 px-5 text-sm font-semibold rounded-2xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          Freeze Forecast
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: "Equity", active: true },
          { label: "Swing", active: false },
          { label: "Nifty", active: false },
          { label: "Commodities", active: false },
          { label: "Repeat Sales", active: false },
        ].map((item, i) => (
          <span
            key={i}
            className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
              item.active
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* SVG Chart */}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: "auto" }}>
        <defs>
          {/* Gradient for Actual Area */}
          <linearGradient id="actualGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid Lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="55"
            x2={w - 30}
            y1={45 + i * 45}
            y2={45 + i * 45}
            stroke="#E5E7EB"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="dark:stroke-zinc-700"
          />
        ))}

        {/* Forecast Line (Blue dashed) */}
        <path
          d={path(forecast)}
          stroke="#3B82F6"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="6 4"
        />

        {/* Revised Run-rate (Orange) */}
        <path
          d={path(revised)}
          stroke="#F59E0B"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Total Revenue (Purple) */}
        <path
          d={path(totalRevenue)}
          stroke="#8B5CF6"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Actual Line + Area */}
        <path
          d={`${path(actual)} L ${x(21)} ${h - 45} L ${x(0)} ${h - 45} Z`}
          fill="url(#actualGradient)"
        />
        <path
          d={path(actual)}
          stroke="#10B981"
          strokeWidth="3.5"
          fill="none"
        />

        {/* Data Points on Actual */}
        {actual.map((v, i) =>
          v != null ? (
            <circle
              key={i}
              cx={x(i)}
              cy={y(v)}
              r="3.5"
              fill="#10B981"
              stroke="white"
              strokeWidth="2"
            />
          ) : null
        )}

        {/* X-Axis Labels */}
        {Array.from({ length: 6 }).map((_, i) => {
          const idx = Math.floor((i * (days - 1)) / 5);
          return (
            <text
              key={i}
              x={x(idx)}
              y={h - 18}
              textAnchor="middle"
              className="fill-zinc-500 dark:fill-zinc-400 text-[10px] font-medium"
            >
              {idx + 1}
            </text>
          );
        })}

        {/* Y-Axis Labels */}
        {[0, 50, 100, 150, 200].map((val, i) => (
          <text
            key={i}
            x="38"
            y={y(val) + 4}
            textAnchor="end"
            className="fill-zinc-500 dark:fill-zinc-400 text-[10px] font-medium"
          >
            {val}K
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs mt-3 text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-blue-500 rounded" style={{ borderBottom: "2px dashed #3B82F6" }} />
          <span>Forecast Funnel</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-emerald-500 rounded" />
          <span>Actual Line</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-amber-500 rounded" />
          <span>Revised Run-rate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-violet-500 rounded" />
          <span>Total Revenue</span>
        </div>
      </div>

      {/* Bottom KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        {[
          {
            label: "ORIGINAL TARGET",
            value: "₹2,03,226",
            note: "Stable Baseline",
            color: "bg-cyan-500",
          },
          {
            label: "REVISED TARGET",
            value: "₹2,84,614",
            note: "+40.0% Adjustment",
            color: "bg-orange-500",
          },
          {
            label: "ACTUAL REVENUE",
            value: "₹26,00,020",
            note: "MTD Cumulative",
            color: "bg-emerald-500",
          },
          {
            label: "VARIANCE",
            value: "-₹10,31,745",
            note: "Critical Deficit",
            color: "bg-rose-500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4"
          >
            <div className={`w-3 h-3 rounded-full ${item.color} mb-3`} />
            <div className="text-[10px] font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
              {item.label}
            </div>
            <div className="text-2xl font-bold mt-1 text-zinc-900 dark:text-white">
              {item.value}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {item.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}