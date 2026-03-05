"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const sparklineData1 = Array.from({ length: 10 }, () => ({ val: Math.random() * 20 + 10 }));
const sparklineData2 = Array.from({ length: 10 }, () => ({ val: Math.random() * 5 + 80 }));
const sparklineData3 = Array.from({ length: 10 }, () => ({ val: Math.random() * 30 + 40 }));
const sparklineData4 = Array.from({ length: 10 }, () => ({ val: Math.random() * 50 + 50 }));
const sparklineData5 = Array.from({ length: 10 }, () => ({ val: Math.random() * 10 + 60 }));

export default function RiskScorecards() {
    const cards = [
        {
            title: "GLOBAL GROWTH OUTLOOK",
            metric: "GDP Forecast: 2.7%",
            statusLabel: "Moderate",
            statusColor: "#eab308", // yellow
            data: sparklineData1,
            insight: "Growth stabilizing but vulnerable to shocks.",
        },
        {
            title: "INFLATION PRESSURE",
            metric: "Global CPI Trend: 4.2%",
            statusLabel: "Elevated",
            statusColor: "#ef4444", // red
            data: sparklineData2,
            insight: "Core inflation remains sticky in US/EU.",
        },
        {
            title: "SUPPLY CHAIN STABILITY",
            metric: "Risk Level: Medium",
            statusLabel: "Watch",
            statusColor: "#f97316", // orange
            data: sparklineData3,
            insight: "Red Sea disruptions affecting transit times.",
        },
        {
            title: "ENERGY VOLATILITY",
            metric: "Oil Price Index: 84.5",
            statusLabel: "High Risk",
            statusColor: "#ef4444",
            data: sparklineData4,
            insight: "Geopolitical tensions elevating premiums.",
        },
        {
            title: "DEBT STABILITY",
            metric: "Debt-to-GDP: 98%",
            statusLabel: "Warning",
            statusColor: "#f97316",
            data: sparklineData5,
            insight: "Rising sovereign yields pressuring nations.",
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {cards.map((card, i) => (
                <Scorecard key={i} {...card} />
            ))}
        </div>
    );
}

function Scorecard({ title, metric, statusLabel, statusColor, data, insight }: any) {
    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-4 flex flex-col relative overflow-hidden group hover:border-[#38bdf8]/50 transition-colors">
            {/* Top row */}
            <h4 className="text-[10px] text-[#94a3b8] font-semibold tracking-wider mb-2 uppercase">
                {title}
            </h4>
            <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-mono text-[#f8fafc]">{metric}</span>
                <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono border"
                    style={{ color: statusColor, borderColor: `${statusColor}40`, backgroundColor: `${statusColor}10` }}
                >
                    {statusLabel}
                </span>
            </div>

            {/* Sparkline */}
            <div className="h-10 w-full mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={statusColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={statusColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="val"
                            stroke={statusColor}
                            fill={`url(#grad-${title})`}
                            strokeWidth={1.5}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Insight */}
            <p className="text-xs text-[#64748b] leading-relaxed border-t border-[#1f2a3a] pt-2 mt-auto">
                {insight}
            </p>
        </div>
    );
}
