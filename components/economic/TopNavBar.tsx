"use client";

import React, { useState } from "react";
import { AlertTriangle, Clock, Activity, Globe, Calendar } from "lucide-react";

export default function TopNavBar() {
    const [region, setRegion] = useState("Global");
    const [timeRange, setTimeRange] = useState("1Y");
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const regions = ["Global", "Americas", "Europe", "Asia", "Africa"];
    const timeRanges = ["1M", "6M", "1Y", "5Y"];

    return (
        <nav className="w-full bg-[#141d2b] border-b border-[#1f2a3a] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-50">
            {/* Title & Status */}
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold text-[#f8fafc] tracking-wide flex items-center gap-2">
                    <Globe className="w-5 h-5 text-eco-cyan" />
                    GLOBAL ECONOMIC INTELLIGENCE
                </h1>
                <div className="flex items-center gap-4 text-xs font-mono text-[#94a3b8]">
                    <span className="flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-eco-green" />
                        Stability Index: 68.4
                    </span>
                    <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-eco-orange" />
                        Recession Prob: 32%
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Updated: {isMounted ? new Date().toISOString().split("T")[0] : "----"} 14:30 Z
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="flex items-center bg-[#0f1724] border border-[#1f2a3a] rounded overflow-hidden">
                        <div className="px-3 py-1.5 border-r border-[#1f2a3a text-[#94a3b8]">
                            <Globe className="w-4 h-4" />
                        </div>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="bg-transparent text-sm text-[#f8fafc] px-3 py-1.5 outline-none appearance-none cursor-pointer pr-8"
                        >
                            {regions.map(r => (
                                <option key={r} value={r} className="bg-[#141d2b]">{r} Region</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="relative">
                    <div className="flex items-center bg-[#0f1724] border border-[#1f2a3a] rounded overflow-hidden">
                        <div className="px-3 py-1.5 border-r border-[#1f2a3a text-[#94a3b8]">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-transparent text-sm text-[#f8fafc] px-3 py-1.5 outline-none appearance-none cursor-pointer pr-8"
                        >
                            {timeRanges.map(t => (
                                <option key={t} value={t} className="bg-[#141d2b]">{t}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );
}
