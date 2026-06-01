import * as React from "react";

export default function FiltersBar() {
  const filters = [
    {
      label: "TIMEFRAME",
      value: "04 May - 10 May",
      valueColor: "text-[#3525CD]",
      valueBold: true,
    },
    {
      label: "DATE BASIS",
      value: "Lead Created",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
    },
    {
      label: "COMPARISON",
      value: "Prev 7 Days",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
      toggle: true,
    },
    {
      label: "TEAM LEAD",
      value: "All Leads",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
    },
    {
      label: "ASSIGNMENT",
      value: "All Agents",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
    },
    {
      label: "SOURCE",
      value: "All Sources",
      valueColor: "text-[#1B1B24]",
      valueBold: false,
    },
  ];

  return (
    <div
      className="self-stretch bg-transparent pt-7 pb-[29px] px-7 rounded-[13px]"
      style={{ boxShadow: "0px 2.2727270126342773px 4px #0F172A0D" }}
    >
      {/* Filter dropdowns row */}
      <div className="flex items-center self-stretch">
        {filters.map((f, i) => (
          <div
            key={f.label}
            className={`flex flex-1 flex-col gap-2 ${i < filters.length - 1 ? "mr-[19px]" : ""}`}
          >
            {/* Label row */}
            <div className="flex items-center self-stretch px-0.5">
              {/* Icon placeholder — small colored square */}
              <div className="w-[13px] h-[13px] mr-[7px] rounded-sm bg-[#565E74] opacity-50" />
              <span className="text-[#565E74] text-xs font-bold mr-2">{f.label}</span>
              {/* Divider line */}
              <div className="flex-1 h-[1px] bg-[#C7C4D8] opacity-40" />
            </div>

            {/* Dropdown value */}
            {f.toggle ? (
              /* Comparison field has a toggle switch instead of chevron */
              <div
                className="flex justify-between items-center self-stretch bg-[#F5F2FF66] py-3 px-3.5 rounded-[9px] border border-[#C7C4D899]"
                style={{ boxShadow: "0px 1.1363635063171387px 2px #0000000D" }}
              >
                <span className={`${f.valueColor} text-[15px] ${f.valueBold ? "font-bold" : ""}`}>
                  {f.value}
                </span>
                {/* Toggle pill */}
                <div className="flex items-center bg-indigo-600 py-1 pl-[22px] pr-[5px] rounded-full">
                  <div
                    className="bg-white w-[13px] h-[13px] rounded-full"
                    style={{ boxShadow: "0px 1.1363635063171387px 2px #0000000D" }}
                  />
                </div>
              </div>
            ) : (
              <div
                className="flex justify-between items-center self-stretch bg-[#F5F2FF66] py-[13px] px-[15px] rounded-[9px] border border-[#C7C4D899]"
                style={{ boxShadow: "0px 1.1363635063171387px 2px #0000000D" }}
              >
                <span className={`${f.valueColor} text-[15px] ${f.valueBold ? "font-bold" : ""}`}>
                  {f.value}
                </span>
                {/* Chevron down */}
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                  <path
                    d="M1 1L5.5 6L10 1"
                    stroke="#1B1B24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active filters + action buttons row */}
      <div className="flex justify-between items-center self-stretch py-2 mt-2">
        {/* Left: Active filters */}
        <div className="flex shrink-0 items-center gap-[18px]">
          <span className="text-[#464555] text-xs font-bold">ACTIVE FILTERS</span>
          <div className="flex shrink-0 items-center gap-3">
            {/* Date filter chip */}
            <div className="flex shrink-0 items-center bg-[#3525CD0D] py-2 px-[15px] gap-[9px] rounded-[9px] border border-[#3525CD33]">
              <span className="text-[#3525CD] text-[13px] font-bold">04 May - 10 May 2025</span>
              <button className="w-[9px] h-[9px] flex items-center justify-center">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1 1L8 8M8 1L1 8" stroke="#3525CD" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* Vs. Prev filter chip */}
            <div className="flex shrink-0 items-center bg-[#565E740D] py-2 px-[15px] gap-[9px] rounded-[9px] border border-[#C7C4D8]">
              <span className="text-[#464555] text-[13px] font-bold">Vs. Prev 7 Days</span>
              <button className="w-[9px] h-[9px] flex items-center justify-center">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1 1L8 8M8 1L1 8" stroke="#464555" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Reset + Apply */}
        <div className="flex shrink-0 items-center gap-[19px]">
          <button className="bg-[#F5F2FF] text-[#565E74] text-[15px] font-bold py-[11px] px-[29px] rounded-[9px] border border-[#C7C4D8]">
            Reset
          </button>
          <button
            className="text-white text-[15px] font-bold py-2.5 px-[46px] rounded-[9px]"
            style={{ boxShadow: "0px 2.2727270126342773px 4px #3525CD33" }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}