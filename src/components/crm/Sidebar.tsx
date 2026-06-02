"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  BarChart2,
  Award,
  Package,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/crm/dashboard",  label: "Dashboard",        icon: LayoutDashboard },
  { to: "/crm/broadcast",  label: "Broadcast Center", icon: Radio           },
  { to: "/crm/leadership", label: "leadership hub",   icon: BarChart2       },
  { to: "/crm/badges",     label: "agent badges",     icon: Award           },
  { to: "/crm/packaged",   label: "packaged",         icon: Package         },
];

export function Sidebar() {
  const path = usePathname();

  return (
    <aside
      className="sticky top-0 h-screen w-[210px] shrink-0 bg-white border-r border-gray-100 flex flex-col"
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-7">
        {/* TG icon: teal gradient square with inner grid pattern */}
        <div
          className="size-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0f766e 100%)",
          }}
        >
          {/* Grid/dashboard icon inside */}
          <svg viewBox="0 0 20 20" className="size-5" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1" fill="white" opacity="0.9" />
            <rect x="11" y="3" width="6" height="6" rx="1" fill="white" opacity="0.9" />
            <rect x="3" y="11" width="6" height="6" rx="1" fill="white" opacity="0.9" />
            <rect x="11" y="11" width="6" height="6" rx="1" fill="white" opacity="0.5" />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="font-black text-[14px] tracking-tight text-gray-900">
            TG LEVELS
          </div>
          <div className="text-[10px] text-gray-400 tracking-wide font-medium">CRM</div>
        </div>
      </div>

      {/* ── Section label ── */}
      <div className="px-5 pb-2 text-[9px] font-extrabold tracking-[0.22em] text-gray-400">
        MAIN
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-2.5 space-y-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          const active =
            path === item.to || path.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all",
                active
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "size-[17px] shrink-0",
                  active ? "text-white" : "text-gray-400"
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Spacer ── */}
      <div className="flex-1" />

      {/* ── User card ── */}
      <div className="m-3 p-3 flex items-center gap-2.5 border-t border-gray-100 pt-4">
        {/* Avatar */}
        <div
          className="size-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
          style={{
            background: "linear-gradient(135deg, #0d9488, #14b8a6)",
          }}
        >
          AN
        </div>
        <div className="leading-tight min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-gray-900 truncate">
            Admin Node
          </div>
          <div className="text-[10px] text-gray-400 truncate">Sales Agent</div>
        </div>
        <button className="shrink-0 text-gray-400 hover:text-gray-700 transition-colors">
          <LogOut className="size-4" />
        </button>
      </div>
    </aside>
  );
}