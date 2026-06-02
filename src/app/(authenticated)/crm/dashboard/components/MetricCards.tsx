import * as React from "react";

const metrics = [
  {
    label: "LEADS CREATED",
    value: "3,250",
    change: "+8.7%",
    pct: null,
    up: true,
    color: "from-violet-500 to-purple-600",
    barColor: "bg-violet-500",
    barWidth: 100,
  },
  {
    label: "CONTACTED",
    value: "2,210",
    change: "+6.1%",
    pct: "67.9%",
    up: true,
    color: "from-cyan-500 to-teal-500",
    barColor: "bg-cyan-500",
    barWidth: 68,
  },
  {
    label: "INTERESTED",
    value: "1,420",
    change: "-4.3%",
    pct: "43.7%",
    up: false,
    color: "from-purple-500 to-indigo-500",
    barColor: "bg-purple-500",
    barWidth: 44,
  },
  {
    label: "TRIAL ACTIVE",
    value: "720",
    change: "-8.9%",
    pct: "22.2%",
    up: false,
    color: "from-orange-500 to-amber-500",
    barColor: "bg-orange-500",
    barWidth: 22,
  },
  {
    label: "PAYMENT INTENT",
    value: "310",
    change: "-11.2%",
    pct: "9.5%",
    up: false,
    color: "from-pink-500 to-rose-500",
    barColor: "bg-pink-500",
    barWidth: 10,
  },
  {
    label: "PAID",
    value: "132",
    change: "-9.6%",
    pct: "4.1%",
    up: false,
    color: "from-emerald-500 to-teal-600",
    barColor: "bg-emerald-500",
    barWidth: 4,
  },
];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-6 gap-4">
      {metrics.map((m, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group"
        >
          {/* Header Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
              {m.label}
            </span>
            <div
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                m.up
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
              }`}
            >
              {m.change}
            </div>
          </div>

          {/* Main Value */}
          <div className="mb-6">
            <div className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tighter">
              {m.value}
            </div>
            {m.pct && (
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                {m.pct} of previous
              </div>
            )}
          </div>

          {/* Gradient Bar Container */}
          <div className="relative h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full rounded-full ${m.barColor} transition-all duration-500`}
              style={{ width: `${m.barWidth}%` }}
            />
          </div>

          {/* Bottom Gradient Accent */}
          <div
            className={`h-1 mt-4 rounded-full bg-gradient-to-r ${m.color} opacity-75`}
          />
        </div>
      ))}
    </div>
  );
}