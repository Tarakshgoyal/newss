"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ── numeric ISO 3166-1 → threat ── */
const MapData: Record<number, "high" | "warning" | "stable"> = {
  840: "stable", 124: "stable", 484: "warning", 76: "warning", 32: "stable",
  826: "stable", 250: "warning", 276: "stable", 643: "high", 156: "high",
  356: "warning", 36: "stable", 710: "stable", 818: "warning", 364: "high",
  682: "warning", 12: "warning", 434: "warning", 736: "high", 180: "high", 862: "high",
} as any;

const countryNames: Record<number, string> = {
  840: "United States", 124: "Canada", 484: "Mexico", 76: "Brazil", 32: "Argentina",
  826: "United Kingdom", 250: "France", 276: "Germany", 643: "Russia", 156: "China",
  356: "India", 36: "Australia", 710: "South Africa", 818: "Egypt", 364: "Iran",
  682: "Saudi Arabia", 12: "Algeria", 434: "Libya", 736: "Sudan", 180: "DR Congo", 862: "Venezuela",
};

type Status = "high" | "warning" | "stable";
type Card = {
  stability: string; sc: string;
  risk: string; rc: string;
  economy: string; ec: string;
  diplomatic: string; conflicts: string;
  ai: string; status: Status;
};

const CARDS: Record<number, Card> = {
  643: { stability: "2.1 / 10", sc: "#ff5555", risk: "9.4 CRITICAL", rc: "#ff5555", economy: "3.2 Strained", ec: "#ffaa44", diplomatic: "Hostile / Sanctioned", conflicts: "6 — Active War", ai: "High probability of cyber & proxy escalation in Q4.", status: "high" },
  156: { stability: "3.8 / 10", sc: "#ffaa44", risk: "8.1 HIGH", rc: "#ff5555", economy: "6.4 Pressured", ec: "#ffaa44", diplomatic: "Assertive / Contested", conflicts: "3 — Taiwan Strait", ai: "Elevated risk of regional military posturing.", status: "high" },
  364: { stability: "2.9 / 10", sc: "#ff5555", risk: "8.9 CRITICAL", rc: "#ff5555", economy: "3.1 Strained", ec: "#ffaa44", diplomatic: "Hostile / Non-Aligned", conflicts: "4 — Regional Proxy", ai: "High probability of proxy escalation in Q4.", status: "high" },
  736: { stability: "1.8 / 10", sc: "#ff5555", risk: "9.7 CRITICAL", rc: "#ff5555", economy: "1.9 Collapsed", ec: "#ff5555", diplomatic: "Fragmented / Isolated", conflicts: "7 — Civil War", ai: "Imminent humanitarian crisis & state collapse risk.", status: "high" },
  180: { stability: "2.2 / 10", sc: "#ff5555", risk: "9.1 CRITICAL", rc: "#ff5555", economy: "2.0 Collapsed", ec: "#ff5555", diplomatic: "Fragmented", conflicts: "5 — Civil Conflict", ai: "Armed group activity — humanitarian corridors at risk.", status: "high" },
  862: { stability: "2.6 / 10", sc: "#ff5555", risk: "8.3 HIGH", rc: "#ff5555", economy: "2.4 Collapsed", ec: "#ff5555", diplomatic: "Isolated / Sanctioned", conflicts: "2 — Internal", ai: "Socioeconomic collapse sustaining authoritarian rule.", status: "high" },
  484: { stability: "4.1 / 10", sc: "#ffaa44", risk: "7.2 HIGH", rc: "#ff5555", economy: "5.0 Pressured", ec: "#ffaa44", diplomatic: "Aligned / Strained", conflicts: "2 — Cartel Violence", ai: "Organised crime destabilisation risk remains elevated.", status: "warning" },
  76: { stability: "4.5 / 10", sc: "#ffaa44", risk: "6.4 MODERATE", rc: "#ffaa44", economy: "5.2 Mixed", ec: "#ffaa44", diplomatic: "Neutral / Emerging", conflicts: "1 — Internal", ai: "Political volatility may affect trade-bloc commitments.", status: "warning" },
  250: { stability: "5.1 / 10", sc: "#ffaa44", risk: "5.8 MODERATE", rc: "#ffaa44", economy: "5.9 Stable-ish", ec: "#ffaa44", diplomatic: "Aligned / EU", conflicts: "0", ai: "Domestic unrest risk tied to immigration policy.", status: "warning" },
  356: { stability: "5.4 / 10", sc: "#ffaa44", risk: "6.0 MODERATE", rc: "#ffaa44", economy: "6.5 Growing", ec: "#44ddaa", diplomatic: "Non-Aligned / Strategic", conflicts: "1 — Border", ai: "Regional rivalry with Pakistan & China requires monitoring.", status: "warning" },
  818: { stability: "4.2 / 10", sc: "#ffaa44", risk: "6.6 MODERATE", rc: "#ffaa44", economy: "4.4 Strained", ec: "#ffaa44", diplomatic: "Neutral / Pivoting", conflicts: "1 — Sinai", ai: "Economic pressure risks social instability in urban centres.", status: "warning" },
  682: { stability: "5.0 / 10", sc: "#ffaa44", risk: "5.9 MODERATE", rc: "#ffaa44", economy: "6.8 Stable", ec: "#44ddaa", diplomatic: "Aligned / US", conflicts: "1 — Yemen Proxy", ai: "Regional proxy involvement complicates stability trajectory.", status: "warning" },
  12: { stability: "4.8 / 10", sc: "#ffaa44", risk: "5.5 MODERATE", rc: "#ffaa44", economy: "5.1 Strained", ec: "#ffaa44", diplomatic: "Non-Aligned", conflicts: "1 — Border", ai: "Sahel spill-over elevates peripheral threat levels.", status: "warning" },
  434: { stability: "3.2 / 10", sc: "#ff5555", risk: "7.8 HIGH", rc: "#ff5555", economy: "3.8 Strained", ec: "#ffaa44", diplomatic: "Fragmented", conflicts: "3 — Faction War", ai: "Political vacuum sustains armed-faction territorial control.", status: "warning" },
  840: { stability: "7.8 / 10", sc: "#44ddaa", risk: "2.8 LOW", rc: "#44ddaa", economy: "8.1 Healthy", ec: "#44ddaa", diplomatic: "Aligned / Allied", conflicts: "0", ai: "No significant near-term escalation risk.", status: "stable" },
  124: { stability: "8.2 / 10", sc: "#44ddaa", risk: "2.1 LOW", rc: "#44ddaa", economy: "7.8 Healthy", ec: "#44ddaa", diplomatic: "Aligned / Five Eyes", conflicts: "0", ai: "No significant near-term escalation risk.", status: "stable" },
  276: { stability: "7.4 / 10", sc: "#44ddaa", risk: "2.9 LOW", rc: "#44ddaa", economy: "7.5 Healthy", ec: "#44ddaa", diplomatic: "Aligned / NATO", conflicts: "0", ai: "Minor political transition risk only.", status: "stable" },
  826: { stability: "7.1 / 10", sc: "#44ddaa", risk: "3.0 LOW", rc: "#44ddaa", economy: "7.0 Healthy", ec: "#44ddaa", diplomatic: "Aligned / Five Eyes", conflicts: "0", ai: "Post-Brexit trade dynamics remain to be resolved.", status: "stable" },
  32: { stability: "6.5 / 10", sc: "#44ddaa", risk: "3.4 LOW", rc: "#44ddaa", economy: "6.2 Stable", ec: "#44ddaa", diplomatic: "Neutral / MERCOSUR", conflicts: "0", ai: "Economic reform path under close observation.", status: "stable" },
  36: { stability: "8.0 / 10", sc: "#44ddaa", risk: "2.2 LOW", rc: "#44ddaa", economy: "7.9 Healthy", ec: "#44ddaa", diplomatic: "Aligned / Five Eyes", conflicts: "0", ai: "No significant near-term escalation risk.", status: "stable" },
  710: { stability: "6.1 / 10", sc: "#44ddaa", risk: "3.8 LOW", rc: "#44ddaa", economy: "5.8 Stable", ec: "#44ddaa", diplomatic: "Neutral / AU", conflicts: "0", ai: "Internal socioeconomic inequality warrants monitoring.", status: "stable" },
};

const fallback = (st: Status): Card => ({
  stability: "—", sc: "#aaa", risk: "—", rc: "#aaa", economy: "—", ec: "#aaa",
  diplomatic: "—", conflicts: "—", ai: "No data available for this territory.", status: st,
});

/* ── brighter colors ── */
const COL = {
  high: { base: "#6b0f0f", mid: "#9b1515", hover: "#e02020", stroke: "#ff5555", glow: "#ff2222" },
  warning: { base: "#6b3000", mid: "#9b4a00", hover: "#d96500", stroke: "#ff9933", glow: "#ffbb44" },
  stable: { base: "#054535", mid: "#0a7055", hover: "#0fa876", stroke: "#33dda0", glow: "#55ffcc" },
  none: { base: "#0d1e32", mid: "#132840", hover: "#1c3a58", stroke: "rgba(100,200,200,0.15)", glow: "transparent" },
};

const BADGE = {
  high: { bg: "rgba(160,10,10,0.45)", border: "#ff5555", text: "#ffcccc", label: "HIGH THREAT" },
  warning: { bg: "rgba(150,70,0,0.45)", border: "#ff9933", text: "#ffe0aa", label: "WARNING" },
  stable: { bg: "rgba(5,80,60,0.45)", border: "#33dda0", text: "#99ffdd", label: "STABLE" },
};

const high = Object.values(MapData).filter(v => v === "high").length;
const warning = Object.values(MapData).filter(v => v === "warning").length;
const stable = Object.values(MapData).filter(v => v === "stable").length;

/* ═══════════════════════════════════════════════ */

export default function HeatMap() {
  const [hovId, setHovId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mapWrap = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 10]);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const status = hovId != null ? (MapData as any)[hovId] as Status ?? null : null;
  const name = hovId != null ? countryNames[hovId] ?? null : null;
  const card = hovId != null ? CARDS[hovId] ?? (status ? fallback(status) : null) : null;
  const badge = status ? BADGE[status] : null;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mapWrap.current) return;
    const rect = mapWrap.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  /* card position: follow cursor, clamp inside container */
  const cardW = 300, cardH = 310;
  const containerW = mapWrap.current?.offsetWidth ?? 900;
  const containerH = mapWrap.current?.offsetHeight ?? 480;
  const rawX = mousePos.x + 18;
  const rawY = mousePos.y - 20;
  const clampedX = Math.min(rawX, containerW - cardW - 10);
  const clampedY = Math.min(Math.max(rawY, 10), containerH - cardH - 10);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow+Condensed:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;}
        .hm{font-family:'Barlow Condensed',sans-serif;}
        .mono{font-family:'Share Tech Mono',monospace;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.15;}}
        @keyframes gridScroll{from{background-position:0 0;}to{background-position:0 50px;}}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}

        .card-in{animation:fadeUp .15s cubic-bezier(.2,.8,.4,1);}
        .live-dot{animation:blink 1.6s ease-in-out infinite;}
        .grid-bg{
          background-image:
            linear-gradient(rgba(107,228,205,0.035) 1px,transparent 1px),
            linear-gradient(90deg,rgba(107,228,205,0.035) 1px,transparent 1px);
          background-size:50px 50px;
          animation:gridScroll 10s linear infinite;
        }
        .scanlines{
          background-image:repeating-linear-gradient(
            to bottom,transparent,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 4px
          );
          pointer-events:none;
        }
        .shimmer-text{
          background:linear-gradient(90deg,rgba(107,228,205,0.55) 0%,#6be4cd 40%,rgba(107,228,205,0.55) 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 3s linear infinite;
        }
        .bar-track{height:3px;border-radius:2px;background:rgba(255,255,255,0.07);overflow:hidden;}
        .bar-fill{height:100%;border-radius:2px;}
        .geo-path{transition:fill 0.1s ease;}
        .zoom-btn{
          display:flex;align-items:center;justify-content:center;
          width:28px;height:28px;border-radius:5px;cursor:pointer;
          background:rgba(107,228,205,0.08);border:1px solid rgba(107,228,205,0.25);
          color:#6be4cd;font-size:16px;font-family:monospace;line-height:1;
          transition:background 0.15s;user-select:none;
        }
        .zoom-btn:hover{background:rgba(107,228,205,0.18);}
      `}</style>

      <div
        className="hm w-full h-full flex flex-col overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 35% 20%, #0e2242 0%, #070f1e 45%, #030810 100%)",
          borderRadius: 12,
          border: "1px solid rgba(107,228,205,0.18)",
          boxShadow: "0 0 70px rgba(0,0,0,0.9),inset 0 1px 0 rgba(107,228,205,0.08)"
        }}
      >

        {/* ── HEADER ── */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-5 py-3"
          style={{
            background: "linear-gradient(90deg,rgba(107,228,205,0.07) 0%,rgba(107,228,205,0.02) 60%,transparent 100%)",
            borderBottom: "1px solid rgba(107,228,205,0.12)"
          }}
        >
          {/* title */}
          <div className="flex items-center gap-3">
            <span className="live-dot rounded-full flex-shrink-0"
              style={{ width: 9, height: 9, display: "block", background: "#6be4cd", boxShadow: "0 0 10px #6be4cd,0 0 22px rgba(107,228,205,0.4)" }} />
            <div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.24em", color: "rgba(107,228,205,0.42)", lineHeight: 1, marginBottom: 2 }}>
                CLASSIFIED // LEVEL 5 // EYES ONLY
              </div>
              <div className="font-bold tracking-widest shimmer-text" style={{ fontSize: 15, lineHeight: 1 }}>
                GEOPOLITICAL RISK HEATMAP
              </div>
            </div>
          </div>

          {/* count pills */}
          <div className="flex items-center gap-2">
            <CountPill n={high} label="HIGH" color="#ff5555" glow="#ff2222" bg="rgba(160,10,10,0.22)" />
            <CountPill n={warning} label="WARNING" color="#ff9933" glow="#ffbb44" bg="rgba(150,70,0,0.22)" />
            <CountPill n={stable} label="STABLE" color="#33dda0" glow="#55ffcc" bg="rgba(5,80,60,0.22)" />
          </div>

          {/* legend */}
          <div className="flex items-center gap-5">
            <LegDot color="#e02020" glow="#ff2222" label="HIGH THREAT" />
            <LegDot color="#d96500" glow="#ffbb44" label="WARNING" />
            <LegDot color="#0fa876" glow="#55ffcc" label="STABLE" />
            <div className="mono font-bold"
              style={{
                fontSize: 10, letterSpacing: "0.15em", color: "#6be4cd", padding: "3px 10px",
                border: "1px solid rgba(107,228,205,0.35)", borderRadius: 4,
                background: "rgba(107,228,205,0.07)", boxShadow: "0 0 10px rgba(107,228,205,0.15)"
              }}>
              ● LIVE
            </div>
          </div>
        </div>

        {/* ── MAP ── */}
        <div
          ref={mapWrap}
          className="relative flex-1 overflow-hidden"
          style={{ minHeight: 0, cursor: hovId != null ? "crosshair" : "default" }}
          onMouseMove={handleMouseMove}
        >
          {/* decorative layers — all pointer-events:none, below SVG */}
          <div className="grid-bg absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
          <div className="scanlines absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
          {/* corner brackets */}
          {(["tl", "tr", "bl", "br"] as const).map(p => <Bracket key={p} pos={p} />)}

          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 175, center: [0, 10] }}
            width={980}
            height={510}
            style={{ width: "100%", height: "100%", display: "block", position: "relative", zIndex: 1 }}
          >
            <defs>
              <filter id="fHigh" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ff4444" floodOpacity="1" />
                <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#cc0000" floodOpacity="0.55" />
              </filter>
              <filter id="fWarn" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ffaa33" floodOpacity="1" />
                <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#cc6600" floodOpacity="0.55" />
              </filter>
              <filter id="fStable" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#44ffcc" floodOpacity="1" />
                <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#00cc88" floodOpacity="0.55" />
              </filter>
              <filter id="fNone" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#6be4cd" floodOpacity="0.5" />
              </filter>
            </defs>

            <ZoomableGroup
              zoom={zoom}
              center={center}
              minZoom={1}
              maxZoom={8}
              onMoveEnd={({ zoom: z, coordinates }) => {
                setZoom(z);
                setCenter(coordinates as [number, number]);
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const id = Number(geo.id);
                    const st = (MapData as any)[id] as Status ?? null;
                    const cols = st ? COL[st] : COL.none;
                    const isH = hovId === id;

                    const filt = isH
                      ? st === "high" ? "url(#fHigh)"
                        : st === "warning" ? "url(#fWarn)"
                          : st === "stable" ? "url(#fStable)"
                            : "url(#fNone)"
                      : "none";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className="geo-path"
                        fill={isH ? cols.hover : (st ? cols.mid : cols.base)}
                        stroke={isH ? cols.stroke : "rgba(150,220,210,0.55)"}
                        strokeWidth={isH ? 1.4 : 0.7}
                        onMouseEnter={() => setHovId(id)}
                        onMouseLeave={() => setHovId(null)}
                        style={{
                          default: { outline: "none", filter: filt },
                          hover: { outline: "none", fill: cols.hover, filter: filt },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* ── INTEL CARD follows cursor ── */}
          {hovId != null && card && badge && name && (
            <div
              className="card-in absolute pointer-events-none"
              style={{
                zIndex: 20,
                left: clampedX,
                top: clampedY,
                width: cardW,
                background: "linear-gradient(150deg,rgba(4,11,26,0.99) 0%,rgba(6,16,36,0.99) 100%)",
                border: `1px solid ${badge.border}`,
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: `0 24px 64px rgba(0,0,0,0.95), 0 0 24px ${badge.border}44, inset 0 1px 0 rgba(255,255,255,0.04)`
              }}
            >
              {/* header stripe */}
              <div style={{
                padding: "10px 14px 8px",
                background: `linear-gradient(90deg,${badge.bg} 0%,transparent 100%)`,
                borderBottom: `1px solid ${badge.border}44`
              }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="mono" style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(107,228,205,0.5)" }}>
                    CLASSIFIED DATA CARD
                  </span>
                  <span className="mono font-bold" style={{
                    fontSize: 8, letterSpacing: "0.15em", padding: "2px 7px", borderRadius: 3,
                    background: badge.bg, border: `1px solid ${badge.border}`, color: badge.text
                  }}>
                    {badge.label}
                  </span>
                </div>
                <div className="font-bold tracking-widest" style={{ fontSize: 18, color: badge.text, lineHeight: 1.1 }}>
                  {name.toUpperCase()}
                </div>
              </div>

              {/* stat rows */}
              <div style={{ padding: "10px 14px" }}>
                <BarStat label="STABILITY INDEX" value={card.stability} color={card.sc}
                  pct={parseFloat(card.stability) * 10} />
                <BarStat label="SECURITY RISK" value={card.risk} color={card.rc}
                  pct={parseFloat(card.risk.match(/[\d.]+/)?.[0] ?? '5') * 10} />
                <BarStat label="ECONOMIC HEALTH" value={card.economy} color={card.ec}
                  pct={parseFloat(card.economy) * 10} />
                <KeyVal label="DIPLOMATIC" value={card.diplomatic} />
                <KeyVal label="CONFLICTS" value={card.conflicts} />
              </div>

              {/* AI footer */}
              <div style={{
                padding: "8px 14px 10px",
                background: "rgba(107,228,205,0.035)",
                borderTop: "1px solid rgba(107,228,205,0.1)"
              }}>
                <div className="mono mb-1" style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(107,228,205,0.45)" }}>
                  AI ASSESSMENT
                </div>
                <div style={{ fontSize: 11, color: "rgba(185,210,245,0.75)", lineHeight: 1.5 }}>
                  {card.ai}
                </div>
              </div>
            </div>
          )}

          {/* idle hint */}
          {hovId == null && (
            <div className="mono absolute pointer-events-none" style={{ zIndex: 20, bottom: 18, left: "50%", transform: "translateX(-50%)", fontSize: 9, letterSpacing: "0.18em", color: "rgba(107,228,205,0.22)" }}>
              HOVER A COUNTRY TO VIEW INTEL  ·  SCROLL TO ZOOM
            </div>
          )}

          {/* zoom controls */}
          <div className="absolute flex flex-col gap-1.5" style={{ zIndex: 20, bottom: 14, left: 14 }}>
            <button className="zoom-btn" onClick={() => setZoom(z => Math.min(z * 1.5, 8))}>+</button>
            <button className="zoom-btn" onClick={() => setZoom(z => Math.max(z / 1.5, 1))}>−</button>
            <button className="zoom-btn" style={{ fontSize: 10, letterSpacing: "0" }}
              onClick={() => { setZoom(1); setCenter([0, 10]); }}>⌂</button>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-5 py-1.5"
          style={{ borderTop: "1px solid rgba(107,228,205,0.08)", background: "rgba(3,7,16,0.85)" }}
        >
          <span className="mono" style={{ fontSize: 8, letterSpacing: "0.12em", color: "rgba(107,228,205,0.2)" }}>
            NEXUS GEOINT v4.2 // UNCLASSIFIED DEMO // {isMounted ? new Date().toUTCString().toUpperCase() : "LOADING..."}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="mono" style={{ fontSize: 8, color: "rgba(107,228,205,0.2)", letterSpacing: "0.1em" }}>TRACKING</span>
            <span className="mono font-bold" style={{ fontSize: 10, color: "#6be4cd" }}>{Object.keys(MapData).length} NATIONS</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── sub-components ── */

function LegDot({ color, glow, label }: { color: string; glow: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="rounded-sm flex-shrink-0" style={{ width: 10, height: 10, background: color, boxShadow: `0 0 8px ${glow}` }} />
      <span className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "rgba(160,190,220,0.5)" }}>{label}</span>
    </div>
  );
}

function CountPill({ n, label, color, glow, bg }: { n: number; label: string; color: string; glow: string; bg: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: bg, border: `1px solid ${color}55` }}>
      <span className="mono font-bold" style={{ fontSize: 20, color, lineHeight: 1, textShadow: `0 0 12px ${glow}` }}>{n}</span>
      <span className="mono" style={{ fontSize: 8, letterSpacing: "0.12em", color: `${color}88`, lineHeight: 1.2 }}>{label}</span>
    </div>
  );
}

function BarStat({ label, value, color, pct }: { label: string; value: string; color: string; pct: number }) {
  const p = Math.min(100, Math.max(0, isNaN(pct) ? 50 : pct));
  return (
    <div className="mb-2.5">
      <div className="flex justify-between items-center mb-1">
        <span className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "rgba(140,165,195,0.6)" }}>{label}</span>
        <span className="mono font-bold" style={{ fontSize: 10, color }}>{value}</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${p}%`, background: `linear-gradient(90deg,${color}77,${color})` }} />
      </div>
    </div>
  );
}

function KeyVal({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center mt-1.5">
      <span className="mono" style={{ fontSize: 9, letterSpacing: "0.08em", color: "rgba(140,165,195,0.6)" }}>{label}</span>
      <span style={{ fontSize: 11, color: "rgba(200,220,250,0.85)", fontWeight: 600, letterSpacing: "0.02em" }}>{value}</span>
    </div>
  );
}

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base: React.CSSProperties = { position: "absolute", width: 16, height: 16, zIndex: 20, pointerEvents: "none" };
  const brd = "1.5px solid rgba(107,228,205,0.4)";
  const m: Record<string, React.CSSProperties> = {
    tl: { top: 8, left: 8, borderTop: brd, borderLeft: brd },
    tr: { top: 8, right: 8, borderTop: brd, borderRight: brd },
    bl: { bottom: 8, left: 8, borderBottom: brd, borderLeft: brd },
    br: { bottom: 8, right: 8, borderBottom: brd, borderRight: brd },
  };
  return <div style={{ ...base, ...m[pos] }} />;
}