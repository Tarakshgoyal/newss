"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "USA", gdp: 2.1, inflation: 3.2, debt: 123 },
    { name: "EU", gdp: 0.8, inflation: 2.8, debt: 89 },
    { name: "China", gdp: 4.5, inflation: 0.2, debt: 83 },
    { name: "India", gdp: 6.8, inflation: 4.5, debt: 81 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f1724]/95 border border-[#1f2a3a] p-3 rounded-md shadow-xl text-xs backdrop-blur-sm">
                <p className="font-semibold text-[#f8fafc] mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex justify-between gap-4 py-1">
                        <span style={{ color: entry.color }}>{entry.name}</span>
                        <span className="font-mono text-[#f8fafc]">
                            {entry.value}{entry.name.includes('Debt') ? '%' : '%'}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function CountryComparison() {
    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg">
            <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide border-b border-[#1f2a3a] pb-3 mb-4">
                MAJOR ECONOMIES COMPARISON
            </h2>

            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        barSize={12}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3a" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#1f2a3a' }} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f2a3a', opacity: 0.4 }} />
                        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                        <Bar dataKey="gdp" name="GDP Growth" fill="#22c55e" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="inflation" name="Inflation" fill="#ef4444" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="debt" name="Debt to GDP" fill="#f97316" radius={[2, 2, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
