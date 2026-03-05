import React from "react";
import TopNavBar from "@/components/economic/TopNavBar";
import HeroGraphSection from "@/components/economic/HeroGraphSection";
import RiskScorecards from "@/components/economic/RiskScorecards";
import RegionalMap from "@/components/economic/RegionalMap";
import AIPolicyPanel from "@/components/economic/AIPolicyPanel";
import SectorPanels from "@/components/economic/SectorPanels";
import CountryComparison from "@/components/economic/CountryComparison";
import FeedsAndTimeline from "@/components/economic/FeedsAndTimeline";

export default function EconomicDashboardPage() {
    return (
        <div className="h-full overflow-y-auto bg-[#0f1724] text-[#f8fafc] font-sans selection:bg-eco-cyan selection:text-white pb-12 custom-scrollbar">
            <TopNavBar />

            <main className="p-4 md:p-6 max-w-[1800px] mx-auto space-y-6">
                {/* Hero Section */}
                <section className="h-[450px]">
                    <HeroGraphSection />
                </section>

                {/* Scorecards */}
                <section>
                    <RiskScorecards />
                </section>

                {/* Middle row: Map and AI Panel */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
                    <div className="lg:col-span-2 h-[400px] lg:h-full">
                        <RegionalMap />
                    </div>
                    <div className="h-[500px] lg:h-full">
                        <AIPolicyPanel />
                    </div>
                </section>

                {/* Bottom row: Sectors, Feed, Compare */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[400px]">
                    <div className="col-span-1 lg:col-span-5 h-[400px] lg:h-full">
                        <SectorPanels />
                    </div>
                    <div className="col-span-1 lg:col-span-4 h-[400px] lg:h-full">
                        <CountryComparison />
                    </div>
                    <div className="col-span-1 lg:col-span-3 h-[500px] lg:h-full">
                        <FeedsAndTimeline />
                    </div>
                </section>
            </main>
        </div>
    );
}
