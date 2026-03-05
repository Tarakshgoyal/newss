"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const generateTrend = (volatility: number, trend: 'up' | 'down' | 'flat') => {
    let base = 50;
    return Array.from({ length: 15 }, (_, i) => {
        let change = (Math.random() - 0.5) * volatility;
        if (trend === 'up') change += 2;
        if (trend === 'down') change -= 2;
        base += change;
        return { val: base };
    });
};

export default function SectorPanels() {
    const sectors = [
        { name: "ENERGY", trend: "up", risk: "high", data: generateTrend(8, 'up'), impact: "Inflation & Cost risk" },
        { name: "TECHNOLOGY", trend: "up", risk: "low", data: generateTrend(4, 'up'), impact: "Innovation-driven expansion" },
        { name: "MANUFACTURING", trend: "down", risk: "medium", data: generateTrend(5, 'down'), impact: "Supply chain slowdown" },
        { name: "AGRICULTURE", trend: "flat", risk: "medium", data: generateTrend(6, 'flat'), impact: "Weather volatility vulnerability" },
        { name: "FINANCIALS", trend: "down", risk: "high", data: generateTrend(7, 'down'), impact: "Rate sensitive pressure" },
        { name: "LOGISTICS", trend: "flat", risk: "medium", data: generateTrend(5, 'flat'), impact: "Transit disruption exposure" },
    ];

    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg">
            <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide border-b border-[#1f2a3a] pb-3 mb-4">
                SECTOR INTELLIGENCE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
                {sectors.map((sector, i) => (
                    <SectorCard key={i} {...sector} />
                ))}
            </div>
        </div>
    );
}

function SectorCard({ name, trend, risk, data, impact }: any) {
    const riskColors = {
        low: "#22c55e",
        medium: "#eab308",
        high: "#ef4444"
    };
    const color = riskColors[risk as keyof typeof riskColors];

    return (
        <div className="bg-[#0f1724] border border-[#1f2a3a] rounded p-3 flex flex-col gap-2 group hover:border-[#38bdf8]/30 transition-colors">
            <div className="flex justify-between items-center">
                <h3 className="text-xs text-[#f8fafc] tracking-wider font-semibold">{name}</h3>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }} />
            </div>

            <div className="flex items-center justify-between text-[#94a3b8] text-[10px] font-mono uppercase">
                <span className="flex items-center gap-1">
                    Trend:
                    {trend === 'up' && <TrendingUp className="w-3 h-3 text-eco-cyan" />}
                    {trend === 'down' && <TrendingDown className="w-3 h-3 text-eco-red" />}
                    {trend === 'flat' && <Minus className="w-3 h-3 text-eco-yellow" />}
                </span>
                <span style={{ color }}>Risk: {risk}</span>
            </div>

            <div className="h-8 w-full mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="val" stroke={trend === 'down' ? '#ef4444' : '#06b6d4'} strokeWidth={1.5} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-auto pt-2 border-t border-[#1f2a3a]">
                <p className="text-[10px] text-[#64748b] leading-tight truncate">Impact: {impact}</p>
            </div>
        </div>
    );
}
