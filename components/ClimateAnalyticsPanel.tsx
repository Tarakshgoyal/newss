"use client";

import { MoreHorizontal } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie
} from "recharts";

// Mock Data
const temperatureData = [
  { year: '1850', anomaly: -0.2 },
  { year: '1900', anomaly: -0.1 },
  { year: '1950', anomaly: 0.1 },
  { year: '2000', anomaly: 0.6 },
  { year: '2010', anomaly: 0.9 },
  { year: '2020', anomaly: 1.2 },
  { year: '2024', anomaly: 1.45 },
];

const threatRadarData = [
  { subject: 'Heat Waves', A: 120, fullMark: 150 },
  { subject: 'Drought', A: 98, fullMark: 150 },
  { subject: 'Flooding', A: 86, fullMark: 150 },
  { subject: 'Storms', A: 140, fullMark: 150 },
  { subject: 'Cold Snaps', A: 65, fullMark: 150 },
];

const droughtGauge = [
  { name: 'Value', value: 82, fill: '#ef4444' },
  { name: 'Empty', value: 18, fill: '#141d2b' }
];

const carbonParam = [
  { name: 'Value', value: 65, fill: '#38bdf8' },
  { name: 'Empty', value: 35, fill: '#141d2b' }
];

export default function ClimateAnalyticsPanel() {
  return (
    <div className="flex flex-col h-full bg-[#141d2b] w-full rounded-lg border border-dash-border overflow-hidden p-0">
      <div className="flex justify-between items-center p-3 border-b border-dash-border/50 bg-[#192436] shrink-0">
        <h2 className="text-white font-medium text-sm">CLIMATE INTELLIGENCE PANEL</h2>
        <button className="text-dash-text-muted hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        
        {/* Assessment Card */}
        <div className="bg-[#111a28] border border-dash-border/60 rounded p-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-dash-text-muted uppercase">System Confidence</h3>
            <span className="text-[10px] font-bold text-dash-accent bg-[#26a69a]/20 px-2 py-0.5 rounded border border-[#26a69a] text-[#26a69a]">
              94% (HIGH)
            </span>
          </div>
        </div>

        {/* Global Temperature Anomaly */}
        <div className="flex flex-col h-[160px]">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted">Global Temperature Anomaly</h3>
            <span className="text-[10px] text-dash-orange font-bold">+1.45°C</span>
          </div>
          <div className="flex-1 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={temperatureData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="year" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                <Area type="monotone" dataKey="anomaly" stroke="#ef4444" fillOpacity={1} fill="url(#tempGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mini Gauges Row */}
        <div className="grid grid-cols-2 gap-4 h-[110px]">
           {/* Drought Severity */}
           <div className="flex flex-col items-center relative bg-[#111a28] border border-dash-border/50 rounded-md py-2 px-1 overflow-hidden">
            <h3 className="text-[10px] font-bold uppercase tracking-wide text-dash-text-muted w-full text-center z-10">Drought Index</h3>
            <div className="w-full flex-1 relative flex items-end justify-center mt-2">
              <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={droughtGauge}
                      cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="65%" outerRadius="100%"
                      stroke="none" dataKey="value" cornerRadius={2}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="z-10 pb-1">
                 <span className="text-xs font-bold text-dash-orange">SEVERE</span>
              </div>
            </div>
          </div>

          {/* Carbon Concentration */}
           <div className="flex flex-col items-center relative bg-[#111a28] border border-dash-border/50 rounded-md py-2 px-1 overflow-hidden">
            <h3 className="text-[10px] font-bold uppercase tracking-wide text-dash-text-muted w-full text-center z-10">Carbon PPM</h3>
            <div className="w-full flex-1 relative flex items-end justify-center mt-2">
              <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={carbonParam}
                      cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="65%" outerRadius="100%"
                      stroke="none" dataKey="value" cornerRadius={2}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="z-10 pb-1">
                 <span className="text-xs font-bold text-[#38bdf8]">422</span>
              </div>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="flex flex-col min-h-[220px] items-center bg-[#111a28] border border-dash-border/50 rounded-md p-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted w-full mb-2">Climate Stress Radar</h3>
          <div className="flex-1 w-full relative -mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius={55} data={threatRadarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Threats" dataKey="A" stroke="#26a69a" strokeWidth={2} fill="#26a69a" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Climate Forecast Text Panel */}
        <div className="flex flex-col bg-[#0b121d] border border-dash-border p-3 rounded-md">
           <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted mb-2 border-b border-dash-border/50 pb-2">AI Climate Forecast</h3>
           <p className="text-[10px] text-dash-text leading-relaxed">
             <span className="font-bold text-[#38bdf8] block mb-1 uppercase text-xs">Strategic Implications:</span>
             Increasing frequency of extreme weather events poses significant risks to global supply chains, energy security, and geopolitical stability. Resource scarcity in drought-prone regions may lead to conflict. Proactive climate resilience measures are crucial for national security. Focus on coastal defense and disaster response capabilities.
           </p>
        </div>

      </div>
    </div>
  );
}
