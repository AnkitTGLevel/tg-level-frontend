"use client";

import React from "react";
import { Info, ToggleRight } from "lucide-react";

const rows = [
  {
    time: "May 14, 8 AM – 10 AM",
    leads: "300",
    contacted: "210",
    contactedPct: "70.0%",
    interested: "100",
    interestedPct: "33.3%",
    trial: "60",
    trialPct: "20.0%",
    paid: "14",
    paidPct: "4.7%",
  },
  {
    time: "10 AM – 12 PM",
    leads: "340",
    contacted: "240",
    contactedPct: "70.6%",
    interested: "130",
    interestedPct: "38.2%",
    trial: "70",
    trialPct: "20.6%",
    paid: "16",
    paidPct: "4.7%",
  },
  {
    time: "12 PM – 2 PM",
    leads: "360",
    contacted: "250",
    contactedPct: "69.4%",
    interested: "140",
    interestedPct: "38.9%",
    trial: "75",
    trialPct: "20.8%",
    paid: "18",
    paidPct: "5.0%",
  },
];

export default function HourlyFunnelData() {
  return (
    <div className="bg-white rounded-3xl border border-[#E4E1EE] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#F5F2FF] px-8 py-6 flex items-center justify-between border-b border-[#E4E1EE]">
        <div className="flex items-center gap-3">
          <h3 className="text-[#1B1B24] text-2xl font-bold">
            Hourly Funnel Data (Last 48H)
          </h3>
          <Info className="w-5 h-5 text-[#777587]" />
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-[#464555] text-lg font-medium">Show % Columns</span>
          <div className="relative">
            <ToggleRight className="w-14 h-8 text-[#3525CD]" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F2FF]/70 border-b border-[#E4E1EE]">
              <th className="text-left pl-8 py-6 text-[#464555] font-medium text-lg w-72">
                Time (2 Hour)
              </th>
              <th className="text-right pr-8 py-6 text-[#3525CD] font-medium text-lg">Leads Created</th>
              <th className="text-right pr-8 py-6 text-[#3525CD] font-medium text-lg">Contacted</th>
              <th className="text-right pr-8 py-6 text-[#3525CD] font-medium text-lg">Interested</th>
              <th className="text-right pr-8 py-6 text-[#3525CD] font-medium text-lg">Trial Active</th>
              <th className="text-right pr-8 py-6 text-[#3525CD] font-medium text-lg">Paid</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-[#E4E1EE] last:border-none hover:bg-zinc-50 ${
                  index === 1 ? "bg-[#3525CD0D]" : ""
                }`}
              >
                <td className="pl-8 py-7 text-[#1B1B24] text-xl font-semibold">
                  {row.time}
                </td>

                {/* Leads Created */}
                <td className="text-right pr-8 py-7 text-[#1B1B24] text-xl font-semibold">
                  {row.leads}
                  <span className="text-[#464555] text-base ml-1.5">-</span>
                </td>

                {/* Contacted */}
                <td className="text-right pr-8 py-7">
                  <div className="flex flex-col items-end">
                    <span className="text-[#1B1B24] text-xl font-semibold">{row.contacted}</span>
                    <span className="text-emerald-600 font-bold text-base">{row.contactedPct}</span>
                  </div>
                </td>

                {/* Interested */}
                <td className="text-right pr-8 py-7">
                  <div className="flex flex-col items-end">
                    <span className="text-[#1B1B24] text-xl font-semibold">{row.interested}</span>
                    <span className="text-emerald-600 font-bold text-base">{row.interestedPct}</span>
                  </div>
                </td>

                {/* Trial Active */}
                <td className="text-right pr-8 py-7">
                  <div className="flex flex-col items-end">
                    <span className="text-[#1B1B24] text-xl font-semibold">{row.trial}</span>
                    <span className="text-emerald-600 font-bold text-base">{row.trialPct}</span>
                  </div>
                </td>

                {/* Paid */}
                <td className="text-right pr-8 py-7">
                  <div className="flex flex-col items-end">
                    <span className="text-[#1B1B24] text-xl font-semibold">{row.paid}</span>
                    <span className="text-emerald-600 font-bold text-base">{row.paidPct}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Bar */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    </div>
  );
}