"use client";

import { ComposableMap, Geographies, Geography, Marker, Line, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mock data for countries
const MapData: Record<string, "high" | "warning" | "stable"> = {
  // ISO3 Codes
  "USA": "stable",
  "CAN": "stable",
  "MEX": "warning",
  "BRA": "warning",
  "ARG": "stable",
  "GBR": "stable",
  "FRA": "warning",
  "DEU": "stable",
  "RUS": "high",
  "CHN": "high",
  "IND": "warning",
  "AUS": "stable",
  "ZAF": "stable",
  "EGY": "warning",
  "IRN": "high",
  "SAU": "warning",
  "DZA": "warning",
  "LBY": "warning",
  "SDN": "high",
  "COD": "high",
  "VEN": "high",
};

// Colors mapping
const statusColors = {
  high: "#8b2c39", // Dark red
  warning: "#c08a40", // Orange/yellow
  stable: "#2ebd6e", // Green
  default: "#1e3046" // Default map color (dark sea blue-ish)
};

// Mock nodes for lines
const nodes = [
  { coordinates: [-100, 40], id: "us1" }, // USA
  { coordinates: [-80, 42], id: "us2" }, // USA East
  { coordinates: [-10, 50], id: "eu1" }, // Europe
  { coordinates: [30, 50], id: "eu2" }, // Eastern EU
  { coordinates: [100, 35], id: "asia1" }, // China
  { coordinates: [140, 35], id: "asia2" }, // Japan
  { coordinates: [20, 0], id: "afr1" }, // Africa
  { coordinates: [-60, -10], id: "sa1" }, // South America
];

const lines = [
  { from: "us1", to: "us2" },
  { from: "us2", to: "eu1" },
  { from: "eu1", to: "eu2" },
  { from: "eu2", to: "asia1" },
  { from: "asia1", to: "asia2" },
  { from: "eu1", to: "afr1" },
  { from: "us2", to: "sa1" },
];

export default function HeatMap() {
  return (
    <div className="w-full h-full flex flex-col bg-[#141d2b] overflow-hidden rounded-lg border border-dash-border">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-dash-border/50 bg-[#192436]">
        <h2 className="text-white font-medium text-sm">Geopolitical risk heat map</h2>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-dash-red rounded-sm"></div>
            <span className="text-dash-text-muted">High-threat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-dash-yellow rounded-sm"></div>
            <span className="text-dash-text-muted">Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-dash-green rounded-sm"></div>
            <span className="text-dash-text-muted">Stable</span>
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative bg-[#0f1724]">
        <ComposableMap
          projectionConfig={{
            scale: 140,
            center: [0, 20]
          }}
          width={800}
          height={400}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup zoom={1} maxZoom={5}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryId = geo.id;
                  const status = MapData[countryId];
                  const color = status ? statusColors[status] : statusColors.default;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={color}
                      stroke="#192a3e"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", opacity: 0.8 },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Network Lines */}
            {lines.map((line, idx) => {
              const fromNode = nodes.find((n) => n.id === line.from);
              const toNode = nodes.find((n) => n.id === line.to);
              if (!fromNode || !toNode) return null;
              return (
                <Line
                  key={`line-${idx}`}
                  from={fromNode.coordinates as [number, number]}
                  to={toNode.coordinates as [number, number]}
                  stroke="#6be4cd"
                  strokeWidth={1}
                  strokeOpacity={0.4}
                />
              );
            })}

            {/* Glowing Nodes */}
            {nodes.map((node) => (
              <Marker key={node.id} coordinates={node.coordinates as [number, number]}>
                <circle r={4} fill="#6be4cd" className="opacity-80" />
                <circle r={8} fill="#6be4cd" className="animate-pulse opacity-30" />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
