"use client";

import React from "react";
import { Clock, Terminal } from "lucide-react";

export default function ClimateTimeline() {
    const events = [
        { year: "2023", title: "Record Ocean Anomalies", desc: "El Niño amplification spikes SST past all baseline averages.", risk: "high" },
        { year: "2024", title: "South Asia Mega-Heatwave", desc: "Temperatures exceed 50°C sustained; massive agricultural mortality.", risk: "critical" },
        { year: "2024", title: "Mediterranean Drought", desc: "Water rationing implemented across Southern EU; olive oil yields halve.", risk: "high" },
        { year: "2025", title: "Arctic Ice Minimum Shift", desc: "Navigable northern passage routes extended by 40 days annually.", risk: "moderate" },
        { year: "2026", title: "Global Supply Chain Warning", desc: "Panama Canal draft restrictions become permanent fixtures.", risk: "high" },
    ];

    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg">
            <div className="border-b border-[#1f2a3a] pb-2 mb-4">
                <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide flex items-center gap-2">
                    <Clock className="w-4 h-4 text-eco-cyan" />
                    CLIMATE EVOLUTION TIMELINE
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative">
                <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[#1f2a3a]" />

                <div className="flex flex-col gap-4">
                    {events.map((evt, i) => (
                        <div key={i} className="flex gap-4 relative z-10 group">
                            <div className="w-14 text-right pt-0.5 shrink-0">
                                <span className={`text-[10px] font-mono font-bold ${i === events.length - 1 ? 'text-eco-cyan' : 'text-[#64748b]'}`}>
                                    {evt.year}
                                </span>
                            </div>

                            <div className="relative mt-1">
                                <div className={`w-3 h-3 rounded-full border-2 border-[#141d2b] -ml-[7px] ${i === events.length - 1 ? 'bg-eco-cyan ring-4 ring-eco-cyan/20 animate-pulse' : 'bg-[#3f475e] group-hover:bg-[#94a3b8] transition-colors'}`} />
                            </div>

                            <div className="bg-[#0f1724] border border-[#1f2a3a] p-3 rounded group-hover:border-[#38bdf8]/30 transition-colors flex-1 shadow-sm">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-xs text-[#f8fafc] font-semibold tracking-wide">{evt.title}</h3>
                                    <div className={`w-1.5 h-1.5 rounded-full ${evt.risk === 'critical' ? 'bg-eco-red' : evt.risk === 'high' ? 'bg-eco-orange' : 'bg-eco-yellow'}`} />
                                </div>
                                <p className="text-[10px] text-[#94a3b8] leading-tight">
                                    <Terminal className="inline w-3 h-3 mr-1 text-[#3f475e]" />
                                    {evt.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
