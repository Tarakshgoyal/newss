"use client";

import React from "react";
import { Cpu, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

export default function AIPolicyPanel() {
    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-eco-cyan/5 rounded-full blur-3xl" />

            <h2 className="text-[#f8fafc] text-lg font-semibold tracking-wide flex items-center gap-2 border-b border-[#1f2a3a] pb-3 mb-4">
                <Cpu className="w-5 h-5 text-eco-cyan" />
                AI STRATEGIC INSIGHTS
            </h2>

            <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar">
                {/* Recession Probability */}
                <div className="bg-[#0f1724] border border-[#1f2a3a] rounded p-4 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-eco-orange" />
                    <h3 className="text-xs text-[#94a3b8] font-mono mb-1 uppercase tracking-wider">Global Recession Probability</h3>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-mono text-[#f8fafc]">32%</span>
                        <span className="text-xs text-eco-orange mb-1 bg-eco-orange/10 px-2 py-0.5 rounded border border-eco-orange/20">Elevated Alert</span>
                    </div>
                </div>

                {/* Key Drivers */}
                <div>
                    <h3 className="text-xs text-eco-cyan font-mono mb-2 uppercase tracking-wider flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" /> Primary Economic Drivers
                    </h3>
                    <ul className="space-y-2">
                        <li className="text-sm text-[#94a3b8] bg-[#0f1724] border border-[#1f2a3a] px-3 py-2 rounded flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-eco-red" />
                            Energy price volatility
                        </li>
                        <li className="text-sm text-[#94a3b8] bg-[#0f1724] border border-[#1f2a3a] px-3 py-2 rounded flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-eco-orange" />
                            Sustained high interest rates
                        </li>
                        <li className="text-sm text-[#94a3b8] bg-[#0f1724] border border-[#1f2a3a] px-3 py-2 rounded flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-eco-yellow" />
                            Geopolitical trade fragmentation
                        </li>
                    </ul>
                </div>

                {/* Emerging Risks */}
                <div>
                    <h3 className="text-xs text-eco-red font-mono mb-2 uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5" /> Emerging Vulnerabilities
                    </h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed border-l-2 border-[#1f2a3a] pl-3 py-1">
                        Commercial real estate defaults accelerating in mature markets. Sovereign debt servicing burdens restricting fiscal stimulus capabilities in emerging economies.
                    </p>
                </div>

                {/* Policy Recommendations */}
                <div className="mt-auto pt-4 border-t border-[#1f2a3a]">
                    <h3 className="text-xs text-eco-green font-mono mb-3 uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" /> Recommended Policy Responses
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        <PolicyCard title="Diversify Supply Chains" desc="Accelerate 'friend-shoring' of critical minerals and semiconductor manufacturing." />
                        <PolicyCard title="Stabilize Energy Markets" desc="Deploy strategic reserves proactively; incentivize rapid renewable capacity expansion." />
                        <PolicyCard title="Targeted Fiscal Support" desc="Shift from broad subsidies to targeted relief for vulnerable sectors mitigating inflation impact." />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PolicyCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-[#0f1724] border border-[#1f2a3a] p-3 rounded group hover:border-eco-green/40 transition-colors">
            <h4 className="text-xs text-[#f8fafc] font-semibold mb-1">{title}</h4>
            <p className="text-xs text-[#64748b] leading-tight">{desc}</p>
        </div>
    );
}
