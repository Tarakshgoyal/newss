"use client";

import React from "react";
import { Database, Satellite, Webhook, FileText, Rss } from "lucide-react";

export default function DataProvenance() {
    const sources = [
        { name: "NOAA Climate Models", status: "Active", type: "Model", icon: <Database className="w-3.5 h-3.5 text-eco-cyan" /> },
        { name: "Copernicus Sentinel", status: "Active", type: "Satellite", icon: <Satellite className="w-3.5 h-3.5 text-eco-yellow" /> },
        { name: "Global Disaster System", status: "Active", type: "Feed", icon: <Webhook className="w-3.5 h-3.5 text-eco-orange" /> },
        { name: "IPCC Dataset Repos", status: "Synced", type: "Data", icon: <FileText className="w-3.5 h-3.5 text-[#94a3b8]" /> },
        { name: "News Intel Aggregator", status: "Live", type: "OSINT", icon: <Rss className="w-3.5 h-3.5 text-[#a78bfa]" /> },
    ];

    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg relative">
            <div className="border-b border-[#1f2a3a] pb-2 mb-4">
                <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide flex items-center gap-2">
                    DATA PROVENANCE
                </h2>
                <p className="text-[10px] text-[#94a3b8] font-mono mt-0.5">Live telemetry source tracking</p>
            </div>

            <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                {sources.map((s, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#0f1724] border border-[#1f2a3a] p-2 rounded group">
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-[#141d2b] rounded flex items-center justify-center">
                                {s.icon}
                            </div>
                            <span className="text-xs text-[#e2e8f0] font-medium">{s.name}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono text-[#64748b] bg-[#141d2b] px-1.5 py-0.5 rounded border border-[#1f2a3a] hidden md:block">
                                {s.type}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse" />
                                <span className="text-[10px] font-mono text-eco-green uppercase tracking-wider">{s.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
