"use client";

import { MoreHorizontal } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie
} from "recharts";

// Mock Data
const lineData = [
  { name: '1', v1: 10, v2: 15, v3: 5 },
  { name: '2', v1: 40, v2: 25, v3: 15 },
  { name: '3', v1: 85, v2: 60, v3: 45 },
  { name: '4', v1: 100, v2: 80, v3: 65 },
  { name: '5', v1: 120, v2: 100, v3: 85 },
  { name: '6', v1: 140, v2: 110, v3: 95 },
];

const barData = [
  { name: 'Middle East', value: 30, color: '#ef4444' },
  { name: 'Asia/Pacific', value: 60, color: '#f97316' },
  { name: 'Europe/Americas', value: 90, color: '#26a69a' },
];

const radarData = [
  { subject: 'INFLATION', A: 140, fullMark: 150 },
  { subject: 'DEBT', A: 85, fullMark: 150 },
  { subject: 'TRADE BALANCE', A: 110, fullMark: 150 },
  { subject: 'RESOURCES', A: 90, fullMark: 150 },
];

const gaugeData = [
  { name: 'Value', value: 75, fill: 'url(#colorGauge)' },
  { name: 'Empty', value: 25, fill: '#141d2b' }
];

const areaData = [
  { name: 'Sun', v1: 20, v2: 10, v3: 5 },
  { name: 'Mon', v1: 25, v2: 20, v3: 15 },
  { name: 'Tue', v1: 30, v2: 25, v3: 10 },
  { name: 'Wed', v1: 45, v2: 30, v3: 20 },
  { name: 'Thu', v1: 65, v2: 40, v3: 25 },
  { name: 'Fri', v1: 80, v2: 55, v3: 35 },
  { name: 'Sat', v1: 95, v2: 65, v3: 45 },
];

export default function AnalyticsCharts() {
  return (
    <div className="flex flex-col h-full w-full text-white bg-[#141d2b] rounded-lg border border-dash-border overflow-hidden p-4">
      <div className="flex justify-between items-center mb-6 pl-2 shrink-0">
        <h2 className="text-white font-medium text-sm">AI Analytics Hub</h2>
        <button className="text-dash-text-muted hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
        
        {/* Card 1: Security Risk Trends */}
        <div className="bg-[#111a28]/60 rounded-md border border-dash-border/60 p-4 flex flex-col min-h-[200px]">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted">Security Risk Trends</h3>
             <MoreHorizontal className="w-3 h-3 text-dash-text-muted" />
          </div>
          <div className="flex-1 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} ticks={[0, 20, 40, 60, 80, 100]} />
                <Line type="monotone" dataKey="v1" stroke="#38bdf8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="v2" stroke="#26a69a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Political Stability Index */}
        <div className="bg-[#111a28]/60 rounded-md border border-dash-border/60 p-4 flex flex-col min-h-[200px]">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted">Political Stability Index</h3>
             <MoreHorizontal className="w-3 h-3 text-dash-text-muted" />
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barSize={35}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={8} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} ticks={[0, 25, 50, 75, 100]} />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Economic Stress */}
        <div className="bg-[#111a28]/60 rounded-md border border-dash-border/60 p-4 flex flex-col min-h-[200px]">
          <div className="flex justify-between items-center mb-2">
             <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted">Economic Stress</h3>
             <MoreHorizontal className="w-3 h-3 text-dash-text-muted" />
          </div>
          <div className="flex-1 w-full min-h-[160px] relative -mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius={55} data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Economic" dataKey="A" stroke="#f97316" strokeWidth={2} fill="#f97316" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 4: Conflict Probability */}
        <div className="bg-[#111a28]/60 rounded-md border border-dash-border/60 p-4 flex flex-col min-h-[200px] overflow-hidden">
          <div className="flex justify-between items-center mb-4 relative z-10">
             <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted">Conflict Probability</h3>
             <MoreHorizontal className="w-3 h-3 text-dash-text-muted" />
          </div>
          <div className="flex-1 w-full relative flex items-end justify-center perspective-gauge pb-4">
            <ResponsiveContainer width="90%" height="200%" className="-mt-16">
              <PieChart>
                <defs>
                  <linearGradient id="colorGauge" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="65%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={55}
                  outerRadius={70}
                  stroke="none"
                  dataKey="value"
                  cornerRadius={5}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-2 flex flex-col items-center">
               <span className="text-xl font-bold text-dash-text">75%</span>
               <span className="text-[10px] text-dash-text-muted font-medium mt-1">High Probability</span>
               <span className="text-[9px] text-dash-text-muted">in next 5-6 months</span>
            </div>
          </div>
        </div>

        {/* Card 5: Regional Risk Comparison */}
        <div className="bg-[#111a28]/60 rounded-md border border-dash-border/60 p-4 flex flex-col min-h-[200px]">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted">Regional Risk Matrix</h3>
             <MoreHorizontal className="w-3 h-3 text-dash-text-muted" />
          </div>
          <div className="flex-1 w-full -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} ticks={[0, 30, 60, 90]} />
                <defs>
                  <linearGradient id="colorV1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f57c00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f57c00" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorV2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#26a69a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#26a69a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v1" stroke="#f57c00" fillOpacity={1} fill="url(#colorV1)" strokeWidth={2} />
                <Area type="monotone" dataKey="v2" stroke="#26a69a" fillOpacity={1} fill="url(#colorV2)" strokeWidth={2} />
                <Area type="monotone" dataKey="v3" stroke="#ef4444" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 6: AI Summary */}
        <div className="bg-[#111a28]/60 rounded-md border border-dash-border/60 p-4 flex flex-col min-h-[200px]">
           <div className="flex justify-between items-center mb-2">
             <h3 className="text-xs font-bold uppercase tracking-wide text-dash-text-muted">AI Summary</h3>
           </div>
           <p className="text-xs text-dash-text leading-relaxed mt-2 flex-1">
             AI projects increased geopolitical volatility in Q4 due to converging economic and security pressures.
           </p>
           <div className="bg-[#090f18] p-3 rounded border border-dash-border">
             <p className="text-[11px] text-dash-text leading-relaxed relative border-l-2 border-dash-accent pl-2">
               <span className="font-bold text-white block mb-0.5">Recommended Action:</span> 
               Elevate regional monitoring and activate contingency plans for Eastern Europe and Middle East.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
