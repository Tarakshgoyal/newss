"use client";

import { motion } from "framer-motion";
import { Link2, Activity, Shield, TrendingDown } from "lucide-react";

export default function IntelligenceCorrelationFeed() {
    const correlations = [
        {
            sourceEvent: "Hurricane Idalia",
            sourceType: "Climate Event",
            relatedImpact: "Insurance losses surge",
            relatedDomain: "Economy",
            icon: TrendingDown,
            color: "text-red-400",
            bgBorder: "border-red-900/50"
        },
        {
            sourceEvent: "Mediterranean Heatwave",
            sourceType: "Climate Event",
            relatedImpact: "Naval readiness alert",
            relatedDomain: "Defense",
            icon: Shield,
            color: "text-blue-400",
            bgBorder: "border-blue-900/50"
        },
        {
            sourceEvent: "Arctic Ice Loss Anomaly",
            sourceType: "Climate Event",
            relatedImpact: "Satellite monitoring escalation",
            relatedDomain: "Technology",
            icon: Activity,
            color: "text-cyan-400",
            bgBorder: "border-cyan-900/50"
        }
    ];

    return (
        <div className="bg-[#0f1724] border border-[#1e293b] rounded-lg p-4 flex flex-col h-full">
            <div className="flex items-center space-x-2 mb-4">
                <Link2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-medium text-gray-200 tracking-wider">INTELLIGENCE CORRELATION FEED</h3>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                {correlations.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className={`p-3 rounded bg-[#131b2b] border ${item.bgBorder} flex flex-col gap-2 relative overflow-hidden`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{item.sourceType}</span>
                                <p className="text-xs text-white font-medium">{item.sourceEvent}</p>
                            </div>
                            <item.icon className={`w-4 h-4 ${item.color} opacity-70`} />
                        </div>

                        <div className="flex items-center gap-2 mt-1 pt-2 border-t border-[#1e293b]/50">
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-opacity-20 ${item.relatedDomain === 'Economy' ? 'text-red-400 bg-red-400' :
                                    item.relatedDomain === 'Defense' ? 'text-blue-400 bg-blue-400' : 'text-cyan-400 bg-cyan-400'
                                }`}>
                                {item.relatedDomain}
                            </span>
                            <p className="text-xs text-gray-300">{item.relatedImpact}</p>
                        </div>

                        {/* Ambient background glow */}
                        <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-10 ${item.relatedDomain === 'Economy' ? 'bg-red-500' : item.relatedDomain === 'Defense' ? 'bg-blue-500' : 'bg-cyan-500'}`} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
