"use client";

import React, { useState } from "react";
import { Network, Zap, Cpu, ShieldAlert, Anchor, Factory, ArrowRight } from "lucide-react";

// Simplified node definitions for the demo
const nodes = [
    { id: 1, label: "Hurricane Idalia", type: "climate", details: "Cat 4 Hurricane" },
    { id: 2, label: "Port Tampa Bay", type: "infrastructure", details: "Logistics Hub" },
    { id: 3, label: "Energy Supply", type: "economy", details: "Regional Fuel" },
    { id: 4, label: "Naval Base", type: "defense", details: "Fleet Readiness" },
    { id: 5, label: "Oil Price", type: "economy", details: "Cost per barrel" },
    { id: 6, label: "Inflation", type: "economy", details: "CPI Impact +0.1%" },
];

const edges = [
    { source: 1, target: 2 },
    { source: 1, target: 4 },
    { source: 2, target: 3 },
    { source: 3, target: 5 },
    { source: 5, target: 6 },
];

export default function KnowledgeGraphPanel({ onSelectNode }: { onSelectNode?: (nodeId: number) => void }) {
    const [activeNode, setActiveNode] = useState<number | null>(1);

    const handleNodeClick = (id: number) => {
        setActiveNode(id);
        if (onSelectNode) onSelectNode(id);
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'climate': return <Zap className="w-5 h-5 text-eco-red" />;
            case 'infrastructure': return <Anchor className="w-4 h-4 text-eco-yellow" />;
            case 'economy': return <Factory className="w-4 h-4 text-eco-cyan" />;
            case 'defense': return <ShieldAlert className="w-4 h-4 text-[#a78bfa]" />;
            default: return <Cpu className="w-4 h-4 text-eco-text" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'climate': return '#ef4444';
            case 'infrastructure': return '#eab308';
            case 'economy': return '#06b6d4';
            case 'defense': return '#a78bfa';
            default: return '#94a3b8';
        }
    };

    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg p-5 flex flex-col h-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1724] to-transparent pointer-events-none" />

            <div className="flex justify-between items-center mb-4 z-10 relative">
                <div>
                    <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide flex items-center gap-2">
                        <Network className="w-4 h-4 text-eco-cyan" />
                        ONTOLOGY RELATIONS GRAPH
                    </h2>
                    <p className="text-[10px] text-[#94a3b8] font-mono mt-1 uppercase">Causal impact chain analysis</p>
                </div>
            </div>

            <div className="flex-1 w-full bg-[#090f18] border border-[#1f2a3a] rounded relative flex items-center justify-center p-4">
                {/* Placeholder SVG Graph visualization replacing D3 for simplicity in demo */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                    {/* Edges */}
                    <path d="M 150 150 Q 250 100 350 120" fill="none" stroke="#1f2a3a" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 150 150 Q 200 250 300 270" fill="none" stroke="#1f2a3a" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 350 120 Q 450 150 500 130" fill="none" stroke="#1f2a3a" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 500 130 Q 600 100 650 150" fill="none" stroke="#1f2a3a" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 650 150 Q 750 200 800 180" fill="none" stroke="#1f2a3a" strokeWidth="2" strokeDasharray="4 4" />
                </svg>

                {/* CSS positioned nodes for demo visual layout */}
                <div className="w-full h-full relative z-10">

                    <Node id={1} label="Hurricane Idalia" type="climate" top="40%" left="15%" isActive={activeNode === 1} onClick={() => handleNodeClick(1)} icon={getIcon('climate')} color={getColor('climate')} />

                    <Node id={2} label="Port Disruption" type="infrastructure" top="20%" left="40%" isActive={activeNode === 2} onClick={() => handleNodeClick(2)} icon={getIcon('infrastructure')} color={getColor('infrastructure')} />

                    <Node id={4} label="Naval Base" type="defense" top="75%" left="35%" isActive={activeNode === 4} onClick={() => handleNodeClick(4)} icon={getIcon('defense')} color={getColor('defense')} />

                    <Node id={3} label="Energy Delay" type="economy" top="25%" left="60%" isActive={activeNode === 3} onClick={() => handleNodeClick(3)} icon={getIcon('economy')} color={getColor('economy')} />

                    <Node id={5} label="Oil Price Rise" type="economy" top="40%" left="75%" isActive={activeNode === 5} onClick={() => handleNodeClick(5)} icon={getIcon('economy')} color={getColor('economy')} />

                    <Node id={6} label="Inflation Risk" type="economy" top="60%" left="90%" isActive={activeNode === 6} onClick={() => handleNodeClick(6)} icon={getIcon('economy')} color={getColor('economy')} />

                </div>
            </div>
        </div>
    );
}

function Node({ id, label, type, top, left, isActive, onClick, icon, color }: any) {
    return (
        <div
            onClick={onClick}
            className={`absolute flex flex-col items-center gap-1.5 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${isActive ? 'scale-110 z-20' : 'scale-100 opacity-70 hover:opacity-100 z-10'}`}
            style={{ top, left }}
        >
            <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 bg-[#090f18] shadow-lg`}
                style={{
                    borderColor: isActive ? color : '#1f2a3a',
                    boxShadow: isActive ? `0 0 20px ${color}40, inset 0 0 10px ${color}20` : 'none'
                }}
            >
                {icon}
            </div>
            <div className={`text-[10px] font-mono px-2 py-0.5 rounded border border-[#1f2a3a] whitespace-nowrap bg-[#141d2b] ${isActive ? 'text-[#f8fafc]' : 'text-[#64748b]'}`}>
                {label}
            </div>
        </div>
    );
}
