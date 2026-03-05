"use client";

import React, { useState } from "react";
import { Sliders, Cpu, AlertTriangle } from "lucide-react";

export default function ScenarioSimulation() {
    const [intensity, setIntensity] = useState(20);
    const [seaLevel, setSeaLevel] = useState(10);
    const [tempRise, setTempRise] = useState(15);

    // Derived mock impacts base on sliders
    const floodRisk = Math.min(100, Math.floor(intensity * 1.5 + seaLevel * 2));
    const infrastructureDamage = Math.floor(intensity * 0.8 + tempRise);
    const agricultureLoss = Math.floor(tempRise * 1.2);

    return (
        <div className="bg-[#141d2b] border border-[#1f2a3a] rounded-lg flex flex-col h-full shadow-lg overflow-hidden">

            <div className="p-4 border-b border-[#1f2a3a] bg-[#192436] flex justify-between items-center">
                <h2 className="text-[#f8fafc] text-sm font-semibold tracking-wide flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-eco-cyan" />
                    AI SCENARIO SIMULATION
                </h2>
                <span className="text-[10px] font-mono bg-eco-cyan/10 text-eco-cyan border border-eco-cyan/20 px-2 py-0.5 rounded">
                    Active Model: NEXUS-CLI v2
                </span>
            </div>

            <div className="flex flex-col md:flex-row flex-1 p-4 gap-6">
                {/* Controls */}
                <div className="flex-1 flex flex-col gap-4 border-r border-[#1f2a3a] pr-4">
                    <SliderControl label="Storm Intensification (%)" value={intensity} setValue={setIntensity} max={100} color="#f97316" />
                    <SliderControl label="Sea-Level Anomaly (cm)" value={seaLevel} setValue={setSeaLevel} max={50} color="#38bdf8" />
                    <SliderControl label="Regional Temp Shift (°C * 10)" value={tempRise} setValue={setTempRise} max={50} color="#ef4444" />

                    <div className="mt-auto pt-4 text-[10px] text-[#64748b] font-mono leading-tight flex items-start gap-2">
                        <Cpu className="w-3 h-3 mt-0.5 shrink-0" />
                        Graph ontology weights dynamically recompute based on selected variance thresholds.
                    </div>
                </div>

                {/* Output Projection */}
                <div className="w-[180px] shrink-0 flex flex-col gap-3">
                    <p className="text-[10px] text-[#94a3b8] font-mono uppercase tracking-wider mb-1">
                        Projected Impact Delta
                    </p>

                    <OutputMetric label="Flood Risk Profile" value={`+${floodRisk}%`} alert={floodRisk > 60} color="#38bdf8" />
                    <OutputMetric label="Infrastructure Dmg" value={`+${infrastructureDamage}%`} alert={infrastructureDamage > 40} color="#f97316" />
                    <OutputMetric label="Agricultural Loss" value={`+${agricultureLoss}%`} alert={agricultureLoss > 25} color="#eab308" />

                    <button className="w-full py-2 mt-auto border border-eco-cyan/40 bg-eco-cyan/5 hover:bg-eco-cyan/10 transition-colors text-eco-cyan text-[10px] font-mono font-bold tracking-widest rounded uppercase">
                        Execute Simulation
                    </button>
                </div>
            </div>
        </div>
    );
}

function SliderControl({ label, value, setValue, max, color }: any) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <span className="text-xs text-[#94a3b8] font-medium">{label}</span>
                <span className="text-xs font-mono text-[#f8fafc]">{value}</span>
            </div>
            <input
                type="range"
                min="0"
                max={max}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-1 bg-[#0f1724] rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: color }}
            />
        </div>
    );
}

function OutputMetric({ label, value, alert, color }: any) {
    return (
        <div className="bg-[#0f1724] border border-[#1f2a3a] p-2 rounded relative overflow-hidden">
            {alert && <div className="absolute top-0 right-0 w-8 h-8 bg-eco-red/20 rounded-full blur-md" />}
            <div className="flex justify-between items-start mb-1 z-10 relative">
                <span className="text-[10px] text-[#94a3b8] font-mono leading-tight">{label}</span>
                {alert && <AlertTriangle className="w-3 h-3 text-eco-red" />}
            </div>
            <div className="text-lg font-mono font-bold z-10 relative" style={{ color }}>
                {value}
            </div>
        </div>
    );
}
