"use client";

import * as React from "react";
import { CrmLayout } from "@/components/crm/CrmLayout";
import {
  TrendingUp,
  TrendingDown,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BroadcastMetric {
  label: string;
  value: string;
  percentage: string | null;
  trend: string;
  positive: boolean;
  cardBg: string;
  dotColor: string;
  barColor: string;
  barBg: string;
  barWidth: string;
}

interface UserLogRow {
  id: string;
  name: string;
  status: "DELIVERED" | "SENT" | "PENDING" | "FAILED";
  processed: number;
  dateTime: string;
  delivered: string;
  opened: string;
  unreached: number;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const BROADCAST_METRICS: BroadcastMetric[] = [
  {
    label: "BROADCAST SENT",
    value: "3,250",
    percentage: null,
    trend: "+8.7%",
    positive: true,
    cardBg: "bg-indigo-100",
    dotColor: "bg-indigo-500",
    barColor: "bg-indigo-500",
    barBg: "bg-indigo-200",
    barWidth: "62%",
  },
  {
    label: "TOTAL AUDIENCE",
    value: "2,210",
    percentage: "67.9%",
    trend: "+6.1%",
    positive: true,
    cardBg: "bg-cyan-100",
    dotColor: "bg-cyan-500",
    barColor: "bg-cyan-500",
    barBg: "bg-cyan-200",
    barWidth: "68%",
  },
  {
    label: "DELIVERED",
    value: "1,420",
    percentage: "43.7%",
    trend: "-4.3%",
    positive: false,
    cardBg: "bg-purple-100",
    dotColor: "bg-purple-500",
    barColor: "bg-purple-500",
    barBg: "bg-purple-200",
    barWidth: "44%",
  },
  {
    label: "READ",
    value: "720",
    percentage: "22.2%",
    trend: "-8.9%",
    positive: false,
    cardBg: "bg-orange-100",
    dotColor: "bg-orange-400",
    barColor: "bg-orange-400",
    barBg: "bg-orange-200",
    barWidth: "22%",
  },
  {
    label: "REPLIES",
    value: "310",
    percentage: "9.5%",
    trend: "-11.2%",
    positive: false,
    cardBg: "bg-pink-100",
    dotColor: "bg-pink-500",
    barColor: "bg-pink-500",
    barBg: "bg-pink-200",
    barWidth: "10%",
  },
  {
    label: "PAID",
    value: "132",
    percentage: "4.1%",
    trend: "-9.6%",
    positive: false,
    cardBg: "bg-green-100",
    dotColor: "bg-green-500",
    barColor: "bg-green-500",
    barBg: "bg-green-200",
    barWidth: "4%",
  },
];

const USER_LOGS: UserLogRow[] = [
  { id: "#1",  name: "First and Last Name", status: "DELIVERED", processed: 100, dateTime: "Oct 24, 2023 · 09:12 AM", delivered: "12,402", opened: "8,912",  unreached: 12   },
  { id: "#2",  name: "First and Last Name", status: "SENT",      processed: 85,  dateTime: "Oct 24, 2023 · 10:45 AM", delivered: "4,120",  opened: "1,200",  unreached: 0    },
  { id: "#3",  name: "First and Last Name", status: "PENDING",   processed: 12,  dateTime: "Oct 24, 2023 · 11:30 AM", delivered: "890",    opened: "45",     unreached: 4    },
  { id: "#4",  name: "First and Last Name", status: "FAILED",    processed: 44,  dateTime: "Oct 23, 2023 · 04:20 PM", delivered: "2,140",  opened: "920",    unreached: 1204 },
  { id: "#5",  name: "First and Last Name", status: "DELIVERED", processed: 100, dateTime: "Oct 23, 2023 · 09:00 AM", delivered: "54,320", opened: "31,005", unreached: 452  },
  { id: "#7",  name: "First and Last Name", status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#8",  name: "First and Last Name", status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#9",  name: "First and Last Name", status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#10", name: "First and Last Name", status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#11", name: "First and Last Name", status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#12", name: "First and Last Name", status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
  { id: "#13", name: "First and Last Name", status: "SENT",      processed: 92,  dateTime: "Oct 22, 2023 · 02:15 PM", delivered: "1,204",  opened: "650",    unreached: 2    },
];

const STATUS_CONFIG: Record<
  UserLogRow["status"],
  { dot: string; text: string; bg: string }
> = {
  DELIVERED: { dot: "bg-green-500",  text: "text-green-700",  bg: "bg-green-50"  },
  SENT:      { dot: "bg-blue-500",   text: "text-blue-600",   bg: "bg-blue-50"   },
  PENDING:   { dot: "bg-yellow-400", text: "text-yellow-700", bg: "bg-yellow-50" },
  FAILED:    { dot: "bg-red-500",    text: "text-red-600",    bg: "bg-red-50"    },
};

const PROGRESS_BAR_COLOR: Record<UserLogRow["status"], string> = {
  DELIVERED: "bg-blue-500",
  SENT:      "bg-blue-500",
  PENDING:   "bg-yellow-400",
  FAILED:    "bg-red-500",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function BroadcastMetricCard({ m }: { m: BroadcastMetric }) {
  return (
    <div className={cn("rounded-2xl p-4 flex flex-col gap-2 min-w-0", m.cardBg)}>
      {/* Top row: dot + trend */}
      <div className="flex items-center justify-between">
        <span className={cn("size-2.5 rounded-full shrink-0", m.dotColor)} />
        <span
          className={cn(
            "text-[11px] font-bold flex items-center gap-0.5 shrink-0",
            m.positive ? "text-green-600" : "text-red-500"
          )}
        >
          {m.positive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
          {m.trend}
        </span>
      </div>

      {/* Label */}
      <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase leading-tight">
        {m.label}
      </p>

      {/* Value + percentage */}
      <div className="flex items-baseline gap-1 flex-wrap">
        <span className="text-[22px] font-bold text-gray-800 leading-none">
          {m.value}
        </span>
        {m.percentage && (
          <span className="text-[11px] text-gray-500">({m.percentage})</span>
        )}
      </div>

      {/* Progress bar */}
      <div className={cn("h-1.5 rounded-full mt-1", m.barBg)}>
        <div
          className={cn("h-full rounded-full", m.barColor)}
          style={{ width: m.barWidth }}
        />
      </div>
    </div>
  );
}

function BroadcastDetail() {
  const rows: [string, React.ReactNode][] = [
    ["Broadcast Name:",   "MMTC BROADCAST 7th OCT 2ND"],
    ["Broadcast Type:",   "Immediate"],
    ["Broadcast Date:",   "07/10/2025"],
    ["Broadcast Time:",   "04:13 PM"],
    ["Broadcast Status:", "Completed"],
    [
      "Download Report:",
      <a
        key="dl"
        href="#"
        className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
      >
        <Download className="size-3.5" />
        Download
      </a>,
    ],
  ];

  return (
    <div className="card-elevated p-6">
      <h2 className="text-[16px] font-bold mb-5">Broadcast Detail</h2>
      <div className="grid grid-cols-[max-content_1fr] gap-x-10 gap-y-3 text-[13px]">
        {rows.map(([label, value]) => (
          <React.Fragment key={String(label)}>
            <span className="font-semibold text-foreground whitespace-nowrap">
              {label}
            </span>
            <span className="text-muted-foreground">{value}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function DeliveryReport() {
  const headers = [
    "Date",
    "Sent Count",
    "Received Count",
    "Undelivered Count",
    "Read Count",
  ];

  return (
    <div className="card-elevated p-6">
      <h2 className="text-[16px] font-bold mb-5">Broadcast Delivery Report</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-muted/40">
              {headers.map((h) => (
                <th
                  key={h}
                  className="border border-border px-4 py-3 text-center font-semibold text-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-center text-muted-foreground">
                07/10/2025 04:13 PM
              </td>
              <td className="border border-border px-4 py-3 text-center font-medium">
                999
              </td>
              <td className="border border-border px-4 py-3 text-center font-medium">
                999
              </td>
              <td className="border border-border px-4 py-3 text-center font-medium">
                1
              </td>
              <td className="border border-border px-4 py-3 text-center font-medium">
                0
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserLogs() {
  const [activeTab, setActiveTab] = React.useState<"All" | "Scheduled" | "Completed">("All");
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 5;

  const headers = [
    "User id",
    "Name",
    "Status",
    "Processed %",
    "Date & Time",
    "Delivered",
    "Opened",
    "Unreached",
  ];

  return (
    <div className="card-elevated p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[16px] font-bold">User Logs</h2>
          <span className="text-[9px] font-extrabold tracking-widest text-white bg-red-500 px-2 py-0.5 rounded">
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {(["All", "Scheduled", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-[12px] font-semibold px-3.5 py-1.5 rounded-md transition-colors",
                activeTab === tab
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {tab}
            </button>
          ))}
          <button className="ml-1 p-1 text-muted-foreground hover:text-foreground rounded">
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border">
              {headers.map((h) => (
                <th
                  key={h}
                  className="text-left py-2.5 px-3 text-[11px] font-semibold text-muted-foreground whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USER_LOGS.map((row) => {
              const sc = STATUS_CONFIG[row.status];
              const barColor = PROGRESS_BAR_COLOR[row.status];
              return (
                <tr
                  key={row.id}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  {/* User ID */}
                  <td className="py-2.5 px-3 text-primary font-semibold">
                    {row.id}
                  </td>

                  {/* Name */}
                  <td className="py-2.5 px-3 font-medium whitespace-nowrap">
                    {row.name}
                  </td>

                  {/* Status badge */}
                  <td className="py-2.5 px-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded",
                        sc.bg,
                        sc.text
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full", sc.dot)} />
                      {row.status}
                    </span>
                  </td>

                  {/* Processed % */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", barColor)}
                          style={{ width: `${row.processed}%` }}
                        />
                      </div>
                      <span className="font-bold text-foreground w-9 shrink-0">
                        {row.processed}%
                      </span>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                    {row.dateTime}
                  </td>

                  {/* Delivered */}
                  <td className="py-2.5 px-3 font-medium text-right">
                    {row.delivered}
                  </td>

                  {/* Opened */}
                  <td className="py-2.5 px-3 font-medium text-right">
                    {row.opened}
                  </td>

                  {/* Unreached */}
                  <td
                    className={cn(
                      "py-2.5 px-3 font-medium text-right",
                      row.unreached > 0
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {row.unreached}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-[12px] text-muted-foreground">
          Showing 1-6 of 254 campaign records
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="size-7 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={cn(
                "size-7 flex items-center justify-center rounded text-[12px] font-semibold transition-colors",
                currentPage === p
                  ? "bg-primary text-white"
                  : "border border-border text-muted-foreground hover:bg-muted/50"
              )}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="size-7 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BroadcastPage() {
  return (
    <CrmLayout showSubNav={false} showMetrics={false}>
      <div className="space-y-5">
        {/* Broadcast-specific metric cards (replaces the generic MetricsRow) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BROADCAST_METRICS.map((m) => (
            <BroadcastMetricCard key={m.label} m={m} />
          ))}
        </div>

        {/* Broadcast Detail */}
        <BroadcastDetail />

        {/* Broadcast Delivery Report */}
        <DeliveryReport />

        {/* User Logs */}
        <UserLogs />
      </div>
    </CrmLayout>
  );
}