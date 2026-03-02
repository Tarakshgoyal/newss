"use client";

import { MoreHorizontal } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const trendData = [
  { month: 1, value: 10 },
  { month: 2, value: 15 },
  { month: 3, value: 28 },
  { month: 4, value: 45 },
  { month: 5, value: 65 },
  { month: 6, value: 80 },
];

export default function RightPanel() {
  return (
    <div className="flex flex-col h-full bg-[#141d2b] w-full rounded-lg border border-dash-border overflow-hidden">
      <div className="flex justify-between items-center p-3 border-b border-dash-border/50 bg-[#192436]">
        <h2 className="text-white font-medium text-sm">AI INSIGHTS PANEL</h2>
        <button className="text-dash-text-muted hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-8 flex-1 overflow-y-auto custom-scrollbar">
        {/* Assessment section */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xs font-bold text-dash-text-muted uppercase tracking-wide">AI STRATEGIC ASSESSMENT</h3>
            <span className="text-[10px] font-bold text-dash-accent bg-dash-accent/10 px-2.5 py-1 rounded border border-dash-accent/20">Confidence: 93%</span>
          </div>
          <p className="text-xs text-dash-text leading-relaxed">
            AI projects increased geopolitical volatility in Q4 due to converging economic and security pressures.
          </p>
          <div className="bg-[#090f18] p-3 rounded-md border border-dash-border">
            <p className="text-xs text-dash-text leading-relaxed">
              <span className="font-bold text-dash-accent block mb-1">Recommended Action:</span> 
              Elevate regional monitoring and activate contingency plans for Eastern Europe and Middle East.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-dash-border/50"></div>

        {/* Chart section */}
        <div className="flex flex-col flex-1 min-h-[180px]">
          <h3 className="text-xs font-bold text-dash-text-muted uppercase tracking-wide mb-4">Security Risk Trends</h3>
          <div className="flex-1 w-full -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} ticks={[0, 20, 40, 60, 80, 100]} />
                <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3, fill: "#38bdf8", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
