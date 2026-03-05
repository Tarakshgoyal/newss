"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ShieldAlert, TrendingUp, Cpu } from "lucide-react";

// In a real app this would be loaded from a topojson file or geography API
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mock data mapping ISO_A3 country codes to economic data
const countryEcoData: Record<string, any> = {
    // USA
    USA: {
        name: "United States", status: "moderate", gdp: "2.1%", inflation: "3.2%",
        debt: "123%", trade: "Low", fdi: "Stable", aiOutlook: "Soft landing probable, tech sector leading growth."
    },
    // China
    CHN: {
        name: "China", status: "stress", gdp: "4.5%", inflation: "0.2%",
        debt: "83%", trade: "High", fdi: "Declining", aiOutlook: "Property sector drag continues, export reliance remains high."
    },
    // Germany
    DEU: {
        name: "Germany", status: "risk", gdp: "-0.3%", inflation: "2.9%",
        debt: "65%", trade: "High", fdi: "Outflowing", aiOutlook: "Industrial contraction, high energy costs persisting."
    },
    // India
    IND: {
        name: "India", status: "strong", gdp: "6.8%", inflation: "4.5%",
        debt: "81%", trade: "Low", fdi: "Increasing", aiOutlook: "Strong domestic demand, manufacturing sector expanding."
    },
    // Brazil
    BRA: {
        name: "Brazil", status: "moderate", gdp: "2.5%", inflation: "4.1%",
        debt: "75%", trade: "Medium", fdi: "Stable", aiOutlook: "Agricultural exports strong, fiscal policy in focus."
    },
};

const statusColors = {
    strong: "#22c55e",    // Green -> strong growth
    moderate: "#eab308",  // Yellow -> moderate stability
    stress: "#f97316",    // Orange -> inflation stress
    risk: "#ef4444",      // Red -> recession risk
    default: "#1e293b"    // Unmapped
};

export default function RegionalMap() {
    const [tooltipData, setTooltipData] = useState<any>(null);

    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full relative shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-[#f8fafc] text-lg font-semibold tracking-wide flex items-center gap-2">
                        REGIONAL ECONOMIC INTELLIGENCE
                    </h2>
                    <p className="text-xs text-[#94a3b8] font-mono mt-1">Global risk distribution matrix</p>
                </div>

                {/* Legend */}
                <div className="hidden md:flex gap-4 text-xs font-mono text-[#94a3b8]">
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-eco-green" /> Strong Growth</span>
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-eco-yellow" /> Moderate</span>
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-eco-orange" /> Stress</span>
                    <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-eco-red" /> Recession Risk</span>
                </div>
            </div>

            <div className="flex-1 w-full bg-[#0f1724] border border-[#1f2a3a] rounded-md overflow-hidden relative">
                <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryCode = geo.id || (geo.properties ? geo.properties.ISO_A3 : null);
                                const data = countryEcoData[countryCode];
                                const color = data ? statusColors[data.status as keyof typeof statusColors] : statusColors.default;

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={color}
                                        stroke="#0f1724"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none", transition: "all 250ms" },
                                            hover: { fill: `${color}cc`, outline: "none", cursor: "pointer" },
                                            pressed: { fill: `${color}99`, outline: "none" },
                                        }}
                                        onMouseEnter={() => {
                                            if (data) setTooltipData(data);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipData(null);
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>

                {/* Intelligence Hover Card */}
                {tooltipData && (
                    <div className="absolute top-4 left-4 w-72 bg-[#141d2b]/95 backdrop-blur-md border border-[#1f2a3a] rounded shadow-2xl p-4 pointer-events-none transition-opacity z-10">
                        <h3 className="text-[#f8fafc] font-semibold text-sm border-b border-[#1f2a3a] pb-2 mb-3 flex justify-between items-center">
                            {tooltipData.name}
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[tooltipData.status as keyof typeof statusColors] }} />
                        </h3>

                        <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                                <span className="text-[#94a3b8]">GDP Growth</span>
                                <span className="font-mono text-[#f8fafc]">{tooltipData.gdp}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#94a3b8]">Inflation</span>
                                <span className="font-mono text-[#f8fafc]">{tooltipData.inflation}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#94a3b8]">Debt-to-GDP</span>
                                <span className="font-mono text-[#f8fafc]">{tooltipData.debt}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#94a3b8]">Trade Dep.</span>
                                <span className="font-mono text-[#f8fafc]">{tooltipData.trade}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#94a3b8]">FDI Trend</span>
                                <span className="font-mono text-[#f8fafc]">{tooltipData.fdi}</span>
                            </div>
                        </div>

                        <div className="bg-[#0f1724] border border-[#1f2a3a] rounded p-2 text-xs">
                            <div className="flex items-center gap-1.5 text-eco-cyan font-mono mb-1">
                                <Cpu className="w-3.5 h-3.5" /> AI Outlook
                            </div>
                            <p className="text-[#94a3b8] leading-tight">{tooltipData.aiOutlook}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
