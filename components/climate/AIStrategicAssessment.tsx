"use client";

import { motion } from "framer-motion";
import { BrainCircuit, AlertTriangle, ShieldAlert, ThermometerSun } from "lucide-react";

export default function AIStrategicAssessment() {
    return (
        <div className="bg-[#0f1724] border border-[#1e293b] rounded-lg p-4 flex flex-col h-full">
            <div className="flex items-center space-x-2 mb-4">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-medium text-gray-200 tracking-wider">AI STRATEGIC ASSESSMENT</h3>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
                <p className="text-sm text-red-400 font-semibold border-b border-[#1e293b] pb-2">
                    Global climate volatility increasing.
                </p>

                <div>
                    <h4 className="text-xs text-gray-400 mb-2 uppercase font-medium">Highest Risk Regions</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center text-xs bg-[#1a2235] p-2 rounded border border-[#2a3441]">
                            <AlertTriangle className="w-3 h-3 text-red-400 mr-2" />
                            <span className="text-gray-300">South Asia</span>
                        </li>
                        <li className="flex items-center text-xs bg-[#1a2235] p-2 rounded border border-[#2a3441]">
                            <ThermometerSun className="w-3 h-3 text-orange-400 mr-2" />
                            <span className="text-gray-300">Mediterranean Basin</span>
                        </li>
                        <li className="flex items-center text-xs bg-[#1a2235] p-2 rounded border border-[#2a3441]">
                            <ShieldAlert className="w-3 h-3 text-yellow-400 mr-2" />
                            <span className="text-gray-300">West Africa</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs text-gray-400 mb-2 uppercase font-medium">Strategic Implications</h4>
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            "Food supply instability",
                            "Urban heat vulnerability",
                            "Infrastructure resilience challenges",
                            "Migration pressure"
                        ].map((imp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-xs text-gray-300 pl-3 border-l-2 border-purple-500 py-1"
                            >
                                {imp}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
