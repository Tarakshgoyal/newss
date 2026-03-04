"use client";

import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Line,
  Marker
} from 'react-simple-maps';
import { Maximize2, Layers } from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Weather-themed color mapper for base geography
const getClimateColor = (geoId: string) => {
  const hash = parseInt(geoId, 36) || 0;
  const mod = hash % 5;
  switch (mod) {
    case 0: return "#0c2b5e"; // Deep Cold Blue
    case 1: return "#1e4c8c"; // Mid Blue
    case 2: return "#d97706"; // Warm Orange
    case 3: return "#b91c1c"; // Hot Red
    case 4: return "#164e63"; // Deep Teal
    default: return "#0c2b5e";
  }
};

interface TooltipData {
  event: string;
  category: string;
  windSpeed: string;
  pressure: string;
  affectedArea: string;
  population: string;
  position: [number, number];
}

const activeEvents = [
  {
    id: "hurricane-idalia",
    event: "HURRICANE IDALIA",
    category: "4 (MAJOR)",
    windSpeed: "145 MPH",
    pressure: "940 MB",
    affectedArea: "SOUTHEAST US",
    population: "2.5M",
    coordinates: [-83.5, 29.8] as [number, number],
  },
  {
    id: "typhoon-saola",
    event: "TYPHOON SAOLA",
    category: "5 (SUPER)",
    windSpeed: "160 MPH",
    pressure: "925 MB",
    affectedArea: "SOUTH CHINA SEA",
    population: "15M",
    coordinates: [118.5, 20.8] as [number, number],
  }
];

export default function ClimateMap() {
  const [hoveredEvent, setHoveredEvent] = useState<TooltipData | null>(null);

  return (
    <div className="relative w-full h-full bg-[#050b14] overflow-hidden rounded-lg">
      
      {/* Map Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-dash-accent" />
          <h2 className="text-white font-semibold text-sm tracking-wider uppercase drop-shadow-md">Global Atmospheric Map</h2>
        </div>
        
        {/* Map Legend (simplified mock) */}
        <div className="flex gap-4 items-center bg-[#090f18]/80 px-4 py-1.5 rounded-full border border-dash-border/50 pointer-events-auto backdrop-blur-sm">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ef4444]"></div><span className="text-[10px] text-dash-text-muted">Heat anomaly</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#38bdf8]"></div><span className="text-[10px] text-dash-text-muted">Cold zones</span></div>
        </div>

        <button className="text-dash-text-muted hover:text-white transition-colors bg-[#0f172a]/80 p-1.5 rounded-md border border-dash-border/50 pointer-events-auto backdrop-blur-sm">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full h-full bg-[#050b14] relative flex-1 pb-4">
        <ComposableMap
          projectionConfig={{
            scale: 140,
            center: [0, 20]
          }}
          width={800}
          height={400}
          style={{ width: "100%", height: "100%", outline: "none" }}
        >
          <ZoomableGroup zoom={1} maxZoom={5}>
          {/* Base Map with Heat/Cold specific coloring */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getClimateColor(geo.id)}
                  stroke="#050b14"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#38bdf8', outline: 'none', transition: 'all 250ms' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Hurricane Path 1 */}
          <Line
            from={[-60, 15]}
            to={[-83.5, 29.8]}
            stroke="#7dd3fc"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          <Line
            from={[-83.5, 29.8]}
            to={[-70, 45]}
            stroke="#7dd3fc"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Hurricane Path 2 */}
          <Line
            from={[140, 15]}
            to={[118.5, 20.8]}
            stroke="#a78bfa"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          
          {/* Render Active Events (Storms) */}
          {activeEvents.map((ev) => (
            <Marker 
                key={ev.id} 
                coordinates={ev.coordinates}
                onMouseEnter={() => setHoveredEvent({ ...ev, position: ev.coordinates })}
                onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* Outer Pulse */}
              <circle r={14} fill="#090f18" opacity={0.5} className="animate-ping" />
              {/* Hurricane Symbol Mock (Nested circles) */}
              <circle r={8} fill="#ffffff" stroke="#cbd5e1" strokeWidth={1} />
              <circle r={3} fill="#0f172a" />
              {/* Event Text Hint */}
              <text textAnchor="middle" y={22} style={{ fontFamily: "system-ui", fill: "#f1f5f9", fontSize: "7px", fontWeight: "bold" }}>
                {ev.event}
              </text>
            </Marker>
          ))}

          {/* Scattered Warning Nodes (Wildfires/Heatwaves) */}
          <Marker coordinates={[-55, -10]}>
            <circle r={4} fill="#ef4444" className="animate-pulse" />
          </Marker>
          <Marker coordinates={[25, 10]}>
            <circle r={4} fill="#ef4444" className="animate-pulse" />
          </Marker>
          <Marker coordinates={[135, -25]}>
            <circle r={4} fill="#ef4444" className="animate-pulse" />
          </Marker>

        </ZoomableGroup>
      </ComposableMap>
      </div>

      {/* Futuristic Tracking Tooltip */}
      {hoveredEvent && (
        <div 
          className="absolute z-50 pointer-events-none"
          style={{
            // Approximation for fixed translation mapping from arbitrary coords.
            // Note: True mapping requires projection translation, using a fixed center fallback for the demo card.
            top: '30%',
            left: '30%',
            transform: 'translate(-50%, -100%)',
            marginTop: '-20px'
          }}
        >
          <div className="bg-[#0f172a]/95 backdrop-blur-md border border-[#38bdf8]/40 p-3 rounded shadow-[0_0_15px_rgba(56,189,248,0.2)] w-64">
            <h3 className="text-[#38bdf8] font-bold text-xs mb-2 uppercase tracking-wide border-b border-[#38bdf8]/30 pb-1">
              EVENT: {hoveredEvent.event}
            </h3>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between"><span className="text-dash-text-muted">CATEGORY:</span> <span className="text-white font-medium">{hoveredEvent.category}</span></div>
              <div className="flex justify-between"><span className="text-dash-text-muted">WIND SPEED:</span> <span className="text-white font-medium">{hoveredEvent.windSpeed}</span></div>
              <div className="flex justify-between"><span className="text-dash-text-muted">PRESSURE:</span> <span className="text-white font-medium">{hoveredEvent.pressure}</span></div>
              <div className="flex justify-between"><span className="text-dash-text-muted">AFFECTED AREA:</span> <span className="text-white font-medium">{hoveredEvent.affectedArea}</span></div>
              <div className="flex justify-between"><span className="text-dash-text-muted">POPULATION AT RISK:</span> <span className="text-white font-medium">{hoveredEvent.population}</span></div>
            </div>
            <div className="mt-2 pt-2 border-t border-dash-border/50">
              <p className="text-[9px] text-[#f97316] leading-tight font-medium uppercase">
                AI FORECAST: EXPECTED TO INTENSIFY. POTENTIAL LANDFALL NEXT 48HRS. HIGH RISK OF STORM SURGE.
              </p>
            </div>
          </div>
          {/* Tooltip pointer */}
          <div className="w-4 h-4 bg-[#0f172a]/95 border-r border-b border-[#38bdf8]/40 transform rotate-45 absolute -bottom-2 left-1/2 -ml-2"></div>
        </div>
      )}
      
      {/* Decorative gradient overlay at bottom for depth */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#050b14] to-transparent pointer-events-none"></div>
    </div>
  );
}
