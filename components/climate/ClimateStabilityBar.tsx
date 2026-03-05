"use client";

import React from "react";
import { Activity, ArrowDown, Droplets, Flame, Wind, Waves } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const trendData = Array.from({ length: 20 }, (_, i) => ({
    time: i,
    val: 80 - i + Math.random() * 5 - 2.5
})); // Downward trend

export default function ClimateStabilityBar() {
    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-4 flex flex-col md:flex-row items-center gap-6 shadow-lg">

            {/* Main Score Area */}
            <div className="flex items-center gap-4 border-r border-[#1f2a3a] pr-6">
                <div className="bg-[#0f1724] border border-[#1f2a3a] p-3 rounded-md flex flex-col items-center justify-center min-w-[120px]">
                    <span className="text-[10px] text-[#94a3b8] font-mono tracking-widest uppercase mb-1">Stability Index</span>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-mono font-bold text-eco-orange leading-none">63</span>
                        <span className="text-xs text-[#64748b] font-mono mb-1">/ 100</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1 w-[140px]">
                    <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#94a3b8]">Trend:</span>
                        <span className="flex items-center gap-1 text-eco-red font-bold">
                            <ArrowDown className="w-3.5 h-3.5" /> Declining
                        </span>
                    </div>
                    <div className="h-10 w-full mt-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="gradStab" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="val" stroke="#f97316" fill="url(#gradStab)" strokeWidth={1.5} dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Key Drivers */}
            <div className="flex-1 flex flex-col">
                <span className="text-[10px] text-[#94a3b8] font-mono tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" /> Primary Threat Drivers
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                    <DriverItem icon={<Waves className="w-3.5 h-3.5 text-eco-red" />} label="Ocean Temps" metric="+1.2°C" />
                    <DriverItem icon={<Flame className="w-3.5 h-3.5 text-eco-orange" />} label="Heatwaves" metric="+42% Freq" />
                    <DriverItem icon={<Droplets className="w-3.5 h-3.5 text-eco-yellow" />} label="Drought" metric="Widespread" />
                    <DriverItem icon={<Wind className="w-3.5 h-3.5 text-eco-cyan" />} label="Arctic Ice" metric="-12% Vol" />
                </div>
            </div>

        </div>
    );
}

function DriverItem({ icon, label, metric }: any) {
    return (
        <div className="flex items-center gap-2 bg-[#0f1724] border border-[#1f2a3a] px-3 py-2 rounded">
            {icon}
            <div className="flex flex-col">
                <span className="text-[9px] text-[#64748b] font-mono uppercase truncate">{label}</span>
                <span className="text-xs text-[#f8fafc] font-mono font-medium">{metric}</span>
            </div>
        </div>
    );
}
