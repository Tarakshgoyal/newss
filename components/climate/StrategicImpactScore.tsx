"use client";

import React from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const scoreData = [
    { subject: 'Economic Impact', A: 7.8, fullMark: 10 },
    { subject: 'Infrastructure Risk', A: 8.2, fullMark: 10 },
    { subject: 'Population Exposure', A: 6.1, fullMark: 10 },
    { subject: 'Supply Chain', A: 7.5, fullMark: 10 },
    { subject: 'Defense Implications', A: 4.9, fullMark: 10 },
];

export default function StrategicImpactScore() {
    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg">
            <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide border-b border-[#1f2a3a] pb-3 mb-2">
                STRATEGIC IMPACT SCORE
            </h2>

            <div className="flex-1 min-h-[160px] relative -mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius={65} data={scoreData}>
                        <PolarGrid stroke="#1f2a3a" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 500 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                        <Radar name="Impact" dataKey="A" stroke="#ef4444" strokeWidth={2} fill="#ef4444" fillOpacity={0.25} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-2 bg-[#0f1724] border border-[#1f2a3a] p-3 rounded text-center">
                <div className="text-[10px] text-[#94a3b8] font-mono uppercase mb-1">Overall Strategic Risk</div>
                <div className="text-xl font-mono font-bold text-eco-red tracking-widest animate-pulse">HIGH ALIGNMENT</div>
            </div>
        </div>
    );
}
