"use client";

import { Activity, ThermometerSun, Waves, Flame } from "lucide-react";
import React from 'react';

interface WeatherAlert {
  id: string;
  type: string;
  name: string;
  country: string;
  flagCode: string;
  severity: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
  details: {
    evacuation?: string;
    area?: string;
    wind?: string;
    duration?: string;
    trajectory?: string;
  };
  aiSummary: string;
}

const mockAlerts: WeatherAlert[] = [
  {
    id: "a1",
    type: "Hurricane/Typhoon",
    name: "Hurricane",
    country: "USA",
    flagCode: "us",
    severity: "CRITICAL",
    details: {
      evacuation: "500k",
      area: "2,500 sq km",
      wind: "150 mph",
      duration: "72h",
      trajectory: "North-East"
    },
    aiSummary: "Prepare for major impacts, evacuations advised. Storm surge risk high."
  },
  {
    id: "a2",
    type: "Flood",
    name: "Flash Flooding",
    country: "Pakistan",
    flagCode: "pk",
    severity: "CRITICAL",
    details: {
      evacuation: "1.2M",
      area: "15,000 sq km",
      duration: "Ongoing",
    },
    aiSummary: "Heavy rainfall continues, dams at capacity. Humanitarian crisis developing."
  },
  {
    id: "a3",
    type: "Heat Wave",
    name: "Severe Heat",
    country: "India",
    flagCode: "in",
    severity: "HIGH",
    details: {
      area: "Northern Plains",
      duration: "14 Days",
      trajectory: "Stationary"
    },
    aiSummary: "Prolonged exposure dangerous, power grid strain likely. Public health warning."
  },
  {
    id: "a4",
    type: "Wildfire spread",
    name: "Bushfires",
    country: "Australia",
    flagCode: "au",
    severity: "HIGH",
    details: {
      evacuation: "50k",
      area: "500 sq km",
      wind: "45 mph",
      trajectory: "South-West"
    },
    aiSummary: "Extreme fire conditions, high winds fueling rapid spread. Emergency services fully deployed."
  },
  {
    id: "a5",
    type: "Cold Snap",
    name: "Arctic Blast",
    country: "Canada",
    flagCode: "ca",
    severity: "MODERATE",
    details: {
      area: "Central Provinces",
      duration: "5 Days"
    },
    aiSummary: "Unusual cold pattern, potential impact on northern infrastructure and operations."
  }
];

const severityColors = {
  CRITICAL: "bg-[#ef4444] text-white",
  HIGH: "bg-[#f97316] text-white",
  MODERATE: "bg-[#eab308] text-black",
  LOW: "bg-[#38bdf8] text-black"
};

const getIcon = (type: string) => {
  if (type.includes("Hurricane") || type.includes("Typhoon")) return <Activity className="w-5 h-5 text-white" />;
  if (type.includes("Heat")) return <ThermometerSun className="w-5 h-5 text-dash-orange" />;
  if (type.includes("Flood")) return <Waves className="w-5 h-5 text-[#38bdf8]" />;
  if (type.includes("Fire")) return <Flame className="w-5 h-5 text-dash-orange" />;
  return <Activity className="w-5 h-5 text-white" />;
};

export default function WeatherAlerts() {
  return (
    <div className="flex flex-col h-full w-full rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-[#192436] p-3 border-b border-dash-border/50 shrink-0">
        <h2 className="text-white font-medium text-sm">EXTREME WEATHER ALERTS FEED</h2>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar bg-[#0f172a] p-4 flex gap-4">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="min-w-[260px] max-w-[280px] w-full flex-shrink-0 bg-[#1e293b] rounded-md border border-dash-border flex flex-col relative shadow-md">
            
            {/* Severity Top Border Segment */}
            <div className={`h-1.5 w-full ${severityColors[alert.severity].split(' ')[0]}`}></div>
            
            <div className="p-3 flex-1 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#0f172a] border border-dash-border/50 flex items-center justify-center">
                    {getIcon(alert.type)}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-dash-text-muted uppercase tracking-wider">{alert.type}</span>
                     <span className="text-xs font-bold text-white uppercase">{alert.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <img src={`https://flagcdn.com/24x18/${alert.flagCode}.png`} alt={alert.country} className="rounded-sm opacity-90 object-cover w-5 h-4 mb-1" />
                   <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${severityColors[alert.severity]}`}>
                     {alert.severity}
                   </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 my-3 bg-[#0f172a] p-2 rounded border border-dash-border/50">
                {Object.entries(alert.details).map(([key, val]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-[8px] text-dash-text-muted uppercase font-medium">{key}</span>
                    <span className="text-[10px] text-white font-medium truncate">{val}</span>
                  </div>
                ))}
              </div>

              {/* AI Summary Bottom Chunk */}
              <div className="mt-auto bg-[#090f18] p-2 rounded border border-dash-border/30">
                 <span className="text-[9px] font-bold text-dash-accent block mb-0.5">AI SUMMARY:</span>
                 <p className="text-[10px] text-dash-text-muted leading-tight line-clamp-3">
                   {alert.aiSummary}
                 </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
