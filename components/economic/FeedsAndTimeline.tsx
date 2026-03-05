"use client";

import React from "react";
import { Zap, DollarSign, Factory, Ship, Clock, AlertTriangle, Activity } from "lucide-react";

export default function FeedsAndTimeline() {
    const timelineEvents = [
        { date: "Oct 24", title: "Interest Rate Hike", entity: "Federal Reserve", icon: <DollarSign className="w-3.5 h-3.5" />, type: "market" },
        { date: "Nov 02", title: "Manufacturing Decline", entity: "China Statistics", icon: <Factory className="w-3.5 h-3.5" />, type: "industry" },
        { date: "Nov 15", title: "Supply Disruptions", entity: "Middle East", icon: <Zap className="w-3.5 h-3.5" />, type: "energy" },
        { date: "Dec 10", title: "Rate Decision", entity: "European Central Bank", icon: <DollarSign className="w-3.5 h-3.5" />, type: "market" },
        { date: "Jan 05", title: "Port Strike Risk", entity: "US East Coast", icon: <Ship className="w-3.5 h-3.5" />, type: "trade" },
    ];

    const intelligenceFeed = [
        { time: "14:32 Z", text: "ECB signals possible interest rate cut by Q3.", tag: "MARKETS", risk: "low" },
        { time: "12:15 Z", text: "China export slowdown continues for 4th consecutive month.", tag: "TRADE", risk: "medium" },
        { time: "09:40 Z", text: "Oil prices surge 4% amid escalating geopolitical tensions.", tag: "ENERGY", risk: "high" },
        { time: "08:10 Z", text: "US Core CPI drops to 3.2%, beating consensus estimates.", tag: "MACRO", risk: "low" },
        { time: "06:45 Z", text: "Taiwan semi-conductor yields report exceeds expectations.", tag: "TECH", risk: "low" },
    ];

    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-[500px] lg:h-full shadow-lg">
            <div className="flex gap-4 border-b border-[#1f2a3a] pb-3 mb-4">
                <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide flex-1">
                    INTELLIGENCE FEED
                </h2>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-eco-green/10 text-eco-green border border-eco-green/20 rounded text-[10px] font-mono font-bold animate-pulse">
                    <Activity className="w-3 h-3" /> LIVE
                </div>
            </div>

            <div className="flex flex-col gap-6 flex-1 overflow-hidden">

                {/* Live Feed Section */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                    {intelligenceFeed.map((item, i) => (
                        <div key={i} className="flex gap-3 group">
                            <span className="text-[#64748b] text-[10px] font-mono whitespace-nowrap pt-0.5">{item.time}</span>
                            <div className="flex flex-col gap-1 border-l-2 border-[#1f2a3a] group-hover:border-eco-cyan/50 pl-3 pb-2 transition-colors">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider
                    ${item.risk === 'high' ? 'text-eco-red bg-eco-red/10 border-eco-red/20' :
                                            item.risk === 'medium' ? 'text-eco-orange bg-eco-orange/10 border-eco-orange/20' :
                                                'text-eco-cyan bg-eco-cyan/10 border-eco-cyan/20'}`}
                                    >
                                        {item.tag}
                                    </span>
                                </div>
                                <p className="text-xs text-[#e2e8f0] leading-snug">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline Section */}
                <div className="pt-4 border-t border-[#1f2a3a]">
                    <h3 className="text-xs text-[#94a3b8] font-mono mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Event Horizon
                    </h3>
                    <div className="flex justify-between items-center relative">
                        <div className="absolute left-0 right-0 h-[1px] bg-[#1f2a3a] top-4 -z-10" />

                        {timelineEvents.map((evt, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 relative group cursor-crosshair">
                                <div className="w-8 h-8 rounded-full bg-[#0f1724] border border-[#1f2a3a] flex items-center justify-center text-[#94a3b8] group-hover:border-eco-cyan group-hover:text-eco-cyan transition-colors shadow-lg z-10">
                                    {evt.icon}
                                </div>
                                <span className="text-[10px] text-[#64748b] font-mono">{evt.date}</span>

                                {/* Tooltip */}
                                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-max bg-[#111a28] border border-[#1f2a3a] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none text-center shadow-xl">
                                    <p className="text-xs font-semibold text-[#f8fafc]">{evt.title}</p>
                                    <p className="text-[10px] text-[#94a3b8]">{evt.entity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
