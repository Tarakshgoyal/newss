"use client";

import React from "react";
import { TrendingDown, Factory, Landmark, Map } from "lucide-react";

export default function ClimateEconomicImpact() {
    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg">
            <div className="border-b border-[#1f2a3a] pb-2 mb-4">
                <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide flex justify-between items-center">
                    MACROECONOMIC IMPACT
                    <span className="text-[10px] font-mono text-[#94a3b8] bg-[#0f1724] px-2 py-0.5 rounded border border-[#1f2a3a]">
                        CLIMATE → ECONOMY PULL
                    </span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                <div className="bg-[#0f1724] border border-[#1f2a3a] p-3 rounded group hover:border-[#eab308]/40 transition-colors">
                    <div className="text-[10px] text-[#94a3b8] font-mono uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Map className="w-3.5 h-3.5 text-[#eab308]" /> Agriculture Loss
                    </div>
                    <div className="text-sm font-mono text-eco-red font-bold flex items-center gap-2 mb-1">
                        <TrendingDown className="w-4 h-4" /> -7.4% Output
                    </div>
                    <p className="text-[10px] text-[#64748b] leading-tight mt-2 border-t border-[#1f2a3a] pt-1">
                        South Asian wheat production deficit due to prolonged heatwave density.
                    </p>
                </div>

                <div className="bg-[#0f1724] border border-[#1f2a3a] p-3 rounded group hover:border-[#ef4444]/40 transition-colors">
                    <div className="text-[10px] text-[#94a3b8] font-mono uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Landmark className="w-3.5 h-3.5 text-[#ef4444]" /> Insurance Sector
                    </div>
                    <div className="text-sm font-mono text-eco-red font-bold flex items-center gap-2 mb-1">
                        <TrendingDown className="w-4 h-4" /> -$18.2B Losses
                    </div>
                    <p className="text-[10px] text-[#64748b] leading-tight mt-2 border-t border-[#1f2a3a] pt-1">
                        Catastrophic claims volume rising. Reinsurance premiums anticipated +14%.
                    </p>
                </div>

                <div className="bg-[#0f1724] border border-[#1f2a3a] p-3 rounded group hover:border-[#38bdf8]/40 transition-colors">
                    <div className="text-[10px] text-[#94a3b8] font-mono uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Factory className="w-3.5 h-3.5 text-[#38bdf8]" /> Energy Demand
                    </div>
                    <div className="text-sm font-mono text-[#38bdf8] font-bold flex items-center gap-2 mb-1">
                        <TrendingDown className="w-4 h-4 transform rotate-180" /> +12.5% Load
                    </div>
                    <p className="text-[10px] text-[#64748b] leading-tight mt-2 border-t border-[#1f2a3a] pt-1">
                        HVAC cooling demand surges straining grid capacity during solar lulls.
                    </p>
                </div>

            </div>
        </div>
    );
}
