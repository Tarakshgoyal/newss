"use client";

import React from "react";
import { Zap, Factory, Anchor, ShieldAlert, ChevronRight } from "lucide-react";

export default function ConnectedImpactsPanel() {
    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg">
            <div className="border-b border-[#1f2a3a] pb-3 mb-4">
                <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide mb-1">
                    CONNECTED INTELLIGENCE
                </h2>
                <p className="text-[10px] text-[#94a3b8] font-mono uppercase flex items-center gap-2">
                    Source Node: <span className="text-eco-red bg-eco-red/10 px-1 py-0.5 rounded border border-eco-red/20 font-bold">Hurricane Idalia</span>
                </p>
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">

                <ImpactItem
                    domain="Energy Sector"
                    icon={<Zap className="w-4 h-4 text-eco-yellow" />}
                    impact="Refinery shutdown risk in Gulf Coast."
                    risk="High"
                    color="#f97316"
                />

                <ImpactItem
                    domain="Supply Chain"
                    icon={<Anchor className="w-4 h-4 text-eco-cyan" />}
                    impact="Port congestion risk; cargo diversion required."
                    risk="Medium"
                    color="#eab308"
                />

                <ImpactItem
                    domain="Economic"
                    icon={<Factory className="w-4 h-4 text-[#38bdf8]" />}
                    impact="Insurance losses rising; regional GDP minor hit."
                    risk="Medium"
                    color="#eab308"
                />

                <ImpactItem
                    domain="Defense"
                    icon={<ShieldAlert className="w-4 h-4 text-[#a78bfa]" />}
                    impact="Naval logistics disruption; fleet sortie required."
                    risk="Moderate"
                    color="#fbbf24"
                />

            </div>
        </div>
    );
}

function ImpactItem({ domain, icon, impact, risk, color }: any) {
    return (
        <div className="bg-[#0f1724] border border-[#1f2a3a] rounded p-3 flex flex-col gap-2 group hover:border-[#38bdf8]/40 transition-colors cursor-pointer">
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
                    {icon} {domain}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase" style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}>
                    {risk}
                </span>
            </div>
            <p className="text-xs text-[#e2e8f0] leading-snug">{impact}</p>

            <div className="mt-1 flex items-center gap-1 text-[9px] text-[#64748b] font-mono hover:text-[#38bdf8] transition-colors w-max">
                View deeper ontology <ChevronRight className="w-3 h-3" />
            </div>
        </div>
    );
}
