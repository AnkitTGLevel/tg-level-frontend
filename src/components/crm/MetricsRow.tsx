"use client";

import React from "react";

const metrics = [
  {
    label: "LEADS CREATED",
    value: "3,250",
    change: "+8.7%",
    pct: null,
    up: true,
    color: "bg-violet-600",
    barColor: "bg-violet-600",
    barWidth: 100,
  },
  {
    label: "CONTACTED",
    value: "2,210",
    change: "+6.1%",
    pct: "67.9%",
    up: true,
    color: "bg-cyan-500",
    barColor: "bg-cyan-500",
    barWidth: 68,
  },
  {
    label: "INTERESTED",
    value: "1,420",
    change: "-4.3%",
    pct: "43.7%",
    up: false,
    color: "bg-purple-500",
    barColor: "bg-purple-500",
    barWidth: 44,
  },
  {
    label: "TRIAL ACTIVE",
    value: "720",
    change: "-8.9%",
    pct: "22.2%",
    up: false,
    color: "bg-orange-500",
    barColor: "bg-orange-500",
    barWidth: 22,
  },
  {
    label: "PAYMENT INTENT",
    value: "310",
    change: "-11.2%",
    pct: "9.5%",
    up: false,
    color: "bg-pink-500",
    barColor: "bg-pink-500",
    barWidth: 10,
  },
  {
    label: "PAID",
    value: "132",
    change: "-9.6%",
    pct: "4.1%",
    up: false,
    color: "bg-emerald-500",
    barColor: "bg-emerald-500",
    barWidth: 4,
  },
];

export default function MetricsRow() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`rounded-3xl p-5 text-white shadow-sm transition-all hover:shadow-md ${metric.color}`}
        >
          {/* Change Indicator */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold tracking-widest opacity-90">
              {metric.label}
            </span>
            <div
              className={`text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1 ${
                metric.up
                  ? "bg-white/20 text-white"
                  : "bg-white/20 text-white"
              }`}
            >
              {metric.up ? "↑" : "↓"} {metric.change}
            </div>
          </div>

          {/* Main Value */}
          <div className="text-4xl font-bold mb-1 tracking-tighter">
            {metric.value}
          </div>

          {/* Percentage of Previous */}
          {metric.pct && (
            <div className="text-sm opacity-90 mb-6">
              {metric.pct} of previous
            </div>
          )}

          {/* Progress Bar */}
          <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className={`h-full ${metric.barColor} rounded-full transition-all`}
              style={{ width: `${metric.barWidth}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}