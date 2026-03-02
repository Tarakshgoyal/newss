"use client";

import { MoreHorizontal } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, Cell,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie
} from "recharts";

// Mock Data
const lineData = [
  { name: 'Lorem', v1: 10, v2: 15, v3: 5 },
  { name: 'Quisque', v1: 40, v2: 25, v3: 15 },
  { name: 'Ipsum', v1: 85, v2: 60, v3: 45 },
  { name: 'Dolor', v1: 100, v2: 80, v3: 65 },
];

const barData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 70 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 85 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 40 },
  { name: 'Aug', value: 65 },
  { name: 'Sep', value: 55 },
  { name: 'Oct', value: 75 },
  { name: 'Nov', value: 45 },
  { name: 'Dec', value: 30 },
];

const radarData = [
  { subject: 'Adipissing', A: 120, fullMark: 150 },
  { subject: 'Dolor', A: 98, fullMark: 150 },
  { subject: 'Quisque', A: 86, fullMark: 150 },
  { subject: 'Sit amet', A: 99, fullMark: 150 },
  { subject: 'Lorem', A: 85, fullMark: 150 },
];

const gaugeData = [
  { name: 'Value', value: 75, fill: 'url(#colorGauge)' }, // 75%
  { name: 'Empty', value: 25, fill: '#192436' }
];

export default function AnalyticsCharts() {
  return (
    <div className="flex flex-col h-full bg-[#141d2b] w-full text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-medium text-sm">AI Insights analytics</h2>
        <button className="text-dash-text-muted hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_200px] gap-6 flex-1 h-[300px]">
        {/* Left Column: Line & Bar */}
        <div className="flex flex-col justify-between gap-4">
          
          {/* Line Chart */}
          <div className="h-32">
            <h3 className="text-xs font-medium mb-2 opacity-90">Security risk trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3143" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} ticks={[0, 20, 40, 60, 80, 100]} />
                <Line type="monotone" dataKey="v1" stroke="#eab308" strokeWidth={2} dot={{ r: 2, fill: "#eab308" }} />
                <Line type="monotone" dataKey="v2" stroke="#ef4444" strokeWidth={2} dot={{ r: 2, fill: "#ef4444" }} />
                <Line type="monotone" dataKey="v3" stroke="#22d3ee" strokeWidth={2} dot={{ r: 2, fill: "#22d3ee" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="h-32">
            <h3 className="text-xs font-medium mb-2 opacity-90">Poiitical stability index</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3143" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} ticks={[0, 20, 40, 60, 80]} />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#colorBar${index % 2})`} />
                  ))}
                </Bar>
                
                {/* Gradients for bars */}
                <defs>
                  <linearGradient id="colorBar0" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="colorBar1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Right Column: Gauge & Radar */}
        <div className="flex flex-col justify-between gap-4 border-l border-dash-border/50 pl-4">
          
          {/* Gauge Chart */}
          <div className="h-32 flex flex-col items-center relative">
            <h3 className="text-xs font-medium mb-2 opacity-90 w-full text-center">Conflict probability</h3>
            <div className="flex-1 w-full relative -mt-4">
              <ResponsiveContainer width="100%" height="180%">
                <PieChart>
                  <defs>
                    <linearGradient id="colorGauge" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="65%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={40}
                    outerRadius={50}
                    stroke="none"
                    dataKey="value"
                    cornerRadius={5}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Needle line approach without complex math */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-6">
               <div className="w-[2px] h-[30px] bg-white transform origin-bottom rotate-[45deg] mb-1"></div>
               <div className="w-2 h-2 rounded-full bg-white relative -top-1 border border-[#141d2b]"></div>
            </div>
            
            <div className="absolute bottom-2 w-full flex justify-between px-2 text-[10px] text-dash-text-muted">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="h-32 flex flex-col items-center">
            <h3 className="text-xs font-medium mb-1 opacity-90 w-full text-center">Economic stress</h3>
            <div className="flex-1 w-full -mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius={35} data={radarData}>
                  <PolarGrid stroke="#2a3143" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar name="Economic" dataKey="A" stroke="#eab308" fill="#eab308" fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
