"use client";

import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceArea
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Activity, AlertTriangle, Zap } from "lucide-react";

const generateData = () => {
    const data = [];
    const startYear = 2020;
    for (let i = 0; i <= 24; i++) {
        const q = (i % 4) + 1;
        const year = startYear + Math.floor(i / 4);
        const date = `${year}-Q${q}`;
        // Simulate some realistic-looking economic cycles
        const isForecast = i >= 20; // 2025 onwards is forecast

        data.push({
            date,
            gdp: 2.5 + Math.sin(i / 3) * 1.5 + (i > 8 ? 0.5 : 0) - (i === 1 ? 4 : 0), // Dip in 2020
            inflation: 2.0 + Math.cos(i / 4) * 0.8 + (i > 6 && i < 14 ? 6.5 : 0), // Spike in 2021-2023
            energy: 50 + Math.sin(i / 2) * 20 + (i === 9 ? 60 : 0), // Shock around 2022
            supplyChain: 10 + (i > 5 && i < 12 ? 80 : 20), // Peak disruptions
            trade: 100 + i * 1.5 - (i === 1 ? 15 : 0),
            isForecast
        });
    }
    return data;
};

const graphData = generateData();

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f1724]/95 border border-[#1f2a3a] p-4 rounded-md shadow-xl backdrop-blur-sm">
                <p className="text-[#f8fafc] font-mono text-sm mb-2 pb-2 border-b border-[#1f2a3a]">
                    {label} {payload[0]?.payload.isForecast ? "(Forecast)" : ""}
                </p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between gap-6 mb-1">
                        <span className="text-xs text-[#94a3b8] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            {entry.name}
                        </span>
                        <span className="text-xs font-mono text-[#f8fafc] font-medium">
                            {entry.value.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function HeroGraphSection() {
    const [activeSeries, setActiveSeries] = useState<string | null>(null);

    const seriesDef = [
        { key: "gdp", name: "Global GDP Growth (%)", color: "#22c55e" },
        { key: "inflation", name: "Inflation Trend (%)", color: "#ef4444" },
        { key: "energy", name: "Energy Volatility Index", color: "#eab308" },
        // { key: "supplyChain", name: "Supply Chain Risk", color: "#f97316" },
    ];

    return (
        <div className="flex flex-col xl:flex-row gap-6 h-full">
            {/* Main Graph Area */}
            <div className="flex-1 bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 relative shadow-lg overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-[#f8fafc] text-lg font-semibold tracking-wide flex items-center gap-2">
                            <Zap className="w-5 h-5 text-eco-cyan" />
                            GLOBAL MACROECONOMIC OUTLOOK
                        </h2>
                        <p className="text-xs text-[#94a3b8] font-mono mt-1">Multi-signal trend analysis & 24-month projection</p>
                    </div>

                    {/* Legend Toggles */}
                    <div className="flex gap-4">
                        {seriesDef.map(s => (
                            <button
                                key={s.key}
                                onClick={() => setActiveSeries(activeSeries === s.key ? null : s.key)}
                                className={`text-xs font-mono flex items-center gap-2 transition-opacity ${activeSeries && activeSeries !== s.key ? 'opacity-40' : 'opacity-100'}`}
                            >
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                                <span className="text-[#94a3b8]">{s.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chart */}
                <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3a" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={{ stroke: '#1f2a3a' }}
                                tickMargin={10}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${val}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3f475e', strokeWidth: 1, strokeDasharray: '4 4' }} />

                            {/* Event Markers */}
                            <ReferenceLine x="2020-Q2" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Pandemic Shock', fill: '#ef4444', fontSize: 10 }} />
                            <ReferenceLine x="2022-Q1" stroke="#f97316" strokeDasharray="3 3" label={{ position: 'top', value: 'Energy Crisis', fill: '#f97316', fontSize: 10 }} />

                            {/* Forecast Area boundary */}
                            <ReferenceLine x="2025-Q1" stroke="#38bdf8" strokeDasharray="3 3" />

                            {/* Lines */}
                            {seriesDef.map((s) => (
                                <Line
                                    key={s.key}
                                    type="monotone"
                                    dataKey={s.key}
                                    name={s.name}
                                    stroke={s.color}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4, fill: '#0f1724', stroke: s.color, strokeWidth: 2 }}
                                    opacity={activeSeries && activeSeries !== s.key ? 0.2 : 1}
                                    style={{ filter: `drop-shadow(0 0 4px ${s.color}40)` }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Snapshot Panel */}
            <div className="w-full xl:w-[320px] bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col gap-4 shadow-lg shrink-0">
                <h3 className="text-[#f8fafc] text-sm font-semibold tracking-wide border-b border-[#1f2a3a] pb-3 mb-2">
                    GLOBAL ECONOMIC SNAPSHOT
                </h3>

                <SnapshotItem label="Global GDP Forecast" value="2.7%" trend="up" status="moderate" />
                <SnapshotItem label="Global Inflation Pressure" value="Elevated" trend="up" status="danger" />
                <SnapshotItem label="Supply Chain Risk Index" value="64.2" trend="down" status="moderate" />
                <SnapshotItem label="Energy Market Volatility" value="High" trend="up" status="danger" />
                <SnapshotItem label="Global Debt Stability Index" value="41.5" trend="flat" status="warning" />
            </div>
        </div>
    );
}

// Helper component for Snapshot items
function SnapshotItem({ label, value, trend, status }: { label: string, value: string, trend: "up" | "down" | "flat", status: "good" | "moderate" | "warning" | "danger" }) {
    const statusColors = {
        good: "text-eco-green",
        moderate: "text-eco-yellow",
        warning: "text-eco-orange",
        danger: "text-eco-red",
    };

    const statusBg = {
        good: "bg-eco-green/10",
        moderate: "bg-eco-yellow/10",
        warning: "bg-eco-orange/10",
        danger: "bg-eco-red/10",
    };

    return (
        <div className={`p-3 rounded border border-[#1f2a3a] bg-[#0f1724] flex items-center justify-between`}>
            <span className="text-xs text-[#94a3b8] font-medium">{label}</span>
            <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-[#f8fafc]">{value}</span>
                <div className={`w-6 h-6 rounded flex items-center justify-center ${statusBg[status]}`}>
                    {trend === "up" && <TrendingUp className={`w-3.5 h-3.5 ${statusColors[status]}`} />}
                    {trend === "down" && <TrendingDown className={`w-3.5 h-3.5 ${statusColors[status]}`} />}
                    {trend === "flat" && <Minus className={`w-3.5 h-3.5 ${statusColors[status]}`} />}
                </div>
            </div>
        </div>
    );
}
