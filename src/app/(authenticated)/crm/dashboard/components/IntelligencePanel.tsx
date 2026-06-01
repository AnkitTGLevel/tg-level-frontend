import * as React from "react";

export default function IntelligencePanel() {
  const items = [
    {
      color: "#10B981",
      label: "MTD ACTUAL",
      amount: "Rs 2,45,80,000",
      amountColor: "text-emerald-600",
      pct: "45%",
    },
    {
      color: "#3B82F6",
      label: "REMAINING TARGET",
      amount: "Rs 2,38,20,000",
      amountColor: "text-blue-600",
      pct: "44%",
    },
    {
      color: "#EF4444",
      label: "REVENUE GAP",
      amount: "Rs 58,00,000",
      amountColor: "text-red-600",
      pct: "11%",
    },
  ];

  // Donut chart — cumulative offsets
  const r = 113; // radius
  const cx = 141;
  const cy = 141;
  const circumference = 2 * Math.PI * r;
  let cumAngle = 0;

  return (
    <div
      className="flex flex-col shrink-0 items-center pb-[1px] gap-[11px]"
    >
      {/* Main white card */}
      <div
        className="flex flex-col items-start bg-white py-[42px] pl-[41px] pr-2 rounded-[30px] border border-[#C7C4D880]"
        style={{ boxShadow: "0px 5.068965911865234px 25px #3525CD0D" }}
      >
        {/* Title row */}
        <div className="flex items-start mb-3.5">
          {/* Brain/sparkle icon placeholder */}
          <div className="w-[25px] h-[25px] mt-3.5 mr-2.5 rounded-full bg-[#3525CD1A] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#3525CD" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-[#1B1B24] text-xl font-bold w-[178px] mr-[29px]">
            Forecast vs Actual Intelligence
          </span>
          {/* Info icon */}
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="mt-1 mr-[50px]">
            <circle cx="9.5" cy="9.5" r="9" stroke="#C7C4D8" />
            <path d="M9.5 8.5V13M9.5 6h.01" stroke="#777587" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {/* Count badge */}
          <div className="flex flex-col items-start bg-[#F0ECF9] py-1 px-2.5 rounded-[5px]">
            <span className="text-[#777587] text-[15px]">2</span>
          </div>
        </div>

        <span className="text-[#464555] text-[17px] w-[249px] mb-[29px]">
          Real-time revenue distribution analysis
        </span>

        {/* Donut chart */}
        <div className="flex flex-col items-center gap-[30px]">
          <div className="flex flex-col items-center">
            <svg width="283" height="283" viewBox="0 0 283 283">
              <g transform={`rotate(-90 ${cx} ${cy})`}>
                {items.map((item) => {
                  const pctNum = parseFloat(item.pct) / 100;
                  const dashLen = pctNum * circumference;
                  const offset = -cumAngle;
                  cumAngle += dashLen;
                  return (
                    <circle
                      key={item.label}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="none"
                      stroke={item.color}
                      strokeWidth="40"
                      strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                      strokeDashoffset={offset}
                    />
                  );
                })}
                {/* Track */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="#F0ECF9"
                  strokeWidth="40"
                  strokeDasharray={`${circumference * 0} ${circumference}`}
                />
              </g>
              {/* Center text */}
              <text x={cx} y={cy - 6} textAnchor="middle" className="fill-[#777587] text-[11px]" fontSize="11" fontWeight="500" fill="#777587">
                TOTAL
              </text>
              <text x={cx} y={cy + 16} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1B1B24">
                ₹4.84 Cr
              </text>
            </svg>
          </div>

          {/* Legend rows */}
          <div className="flex flex-col items-center">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center p-3 mb-[21px] gap-5 rounded-[20px] border border-[#C7C4D833] last:mb-0"
              >
                <div
                  className="w-[15px] h-[15px] rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex flex-col shrink-0 items-center">
                  <span className="text-[#777587] text-xs font-bold self-start pr-40">{item.label}</span>
                  <div className="flex items-center">
                    <span className={`${item.amountColor} text-[17px] font-bold mr-[11px]`}>
                      {item.amount}
                    </span>
                    <span className="text-[#777587] text-[15px] mr-16">({item.pct})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recovery Potential card */}
      <div
        className="flex flex-col items-start bg-[#F5F2FF] pt-[11px] pb-7 px-[11px] gap-1.5 rounded-2xl border border-[#C7C4D84D] self-stretch"
        style={{ boxShadow: "0px 1px 2px #0000000D" }}
      >
        {/* Header */}
        <div className="flex items-center bg-[#F5F2FF]">
          <div className="flex flex-col shrink-0 items-center gap-[3px]">
            <span className="text-black text-[10px] font-bold">AI RECOVERY POTENTIAL</span>
            <span className="text-[#3525CD] text-base font-bold">Rs 64,75,600</span>
          </div>
          <div
            className="flex shrink-0 items-center bg-[#FFFFFF80] py-[3px] px-[7px] mr-32 gap-[3px] rounded-full border border-[#C7C4D81A]"
          >
            <div className="w-2 h-2 rounded-full bg-[#777587]" />
            <span className="text-[#777587] text-[8px]">Ranked by probability</span>
          </div>
          {/* Robot/AI icon */}
          <div className="w-8 h-6 bg-[#3525CD1A] rounded flex items-center justify-center">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="1" y="3" width="14" height="8" rx="2" stroke="#3525CD" strokeWidth="1.2" />
              <circle cx="5" cy="7" r="1" fill="#3525CD" />
              <circle cx="11" cy="7" r="1" fill="#3525CD" />
              <path d="M8 0v3" stroke="#3525CD" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Recovery items */}
        <div className="flex flex-col items-center pb-2 gap-1 self-stretch">
          {[
            { label: "Payment Pending", leads: "87 leads", amount: "Rs 32.4L" },
            { label: "Demo Unseen", leads: "97 leads", amount: "Rs 18.2L" },
            { label: "Hot Leads", leads: "64 leads", amount: "Rs 14.1L" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center self-stretch bg-[#FFFFFF99] py-[5px] px-[9px] rounded-lg border border-[#C7C4D81A]"
              style={{ boxShadow: "0px 1px 2px #0000000D" }}
            >
              <div className="flex shrink-0 items-center flex-1 gap-1.5">
                <span className="text-[#1B1B24] text-[11px] font-bold">{item.label}</span>
                <span className="text-[#777587] text-[9px]">{item.leads}</span>
              </div>
              <div className="flex flex-col shrink-0 items-start bg-[#3525CD0D] py-0.5 px-[7px] rounded border border-[#3525CD1A]">
                <span className="text-[#3525CD] text-[11px] font-bold">{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}