"use client";

import { motion } from "framer-motion";
import { Lightbulb, ChevronRight } from "lucide-react";

export default function PolicyRecommendationEngine() {
    const recommendations = [
        "Increase coastal flood defense systems",
        "Strengthen early heatwave warning networks",
        "Expand drought-resistant crop programs",
        "Improve urban heat mitigation strategies"
    ];

    return (
        <div className="bg-[#0f1724] border border-[#1e293b] rounded-lg p-4 flex flex-col h-full relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />

            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-medium text-gray-200 tracking-wider">POLICY RECOMMENDATION ENGINE</h3>
                </div>
                <span className="text-[10px] bg-emerald-900/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50">
                    AI GENERATED
                </span>
            </div>

            <div className="mb-3 relative z-10">
                <span className="text-xs text-gray-400 mb-1 block">Target Region</span>
                <div className="text-sm text-white font-medium bg-[#1a2235] px-3 py-1.5 rounded inline-block border border-[#2a3441]">
                    India
                </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
                {recommendations.map((rec, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-start gap-2 p-2.5 rounded bg-[#131b2b] hover:bg-[#1a2438] transition-colors border border-[#1e293b] group cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4 text-emerald-500 mt-0.5 group-hover:translate-x-1 transition-transform shrink-0" />
                        <p className="text-xs text-gray-300 leading-relaxed">{rec}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
