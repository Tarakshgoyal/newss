import Header from "@/components/Header";
import ClimateMap from "@/components/ClimateMap";
import WeatherAlerts from "@/components/WeatherAlerts";
import ClimateAnalyticsPanel from "@/components/ClimateAnalyticsPanel";

// New Components
import ClimateStabilityBar from "@/components/climate/ClimateStabilityBar";
import KnowledgeGraphPanel from "@/components/climate/KnowledgeGraphPanel";
import ConnectedImpactsPanel from "@/components/climate/ConnectedImpactsPanel";
import StrategicImpactScore from "@/components/climate/StrategicImpactScore";
import ScenarioSimulation from "@/components/climate/ScenarioSimulation";
import ClimateEconomicImpact from "@/components/climate/ClimateEconomicImpact";
import DataProvenance from "@/components/climate/DataProvenance";
import PopulationVulnerability from "@/components/climate/PopulationVulnerability";
import ClimateTimeline from "@/components/climate/ClimateTimeline";
import AIStrategicAssessment from "@/components/climate/AIStrategicAssessment";
import IntelligenceCorrelationFeed from "@/components/climate/IntelligenceCorrelationFeed";
import PolicyRecommendationEngine from "@/components/climate/PolicyRecommendationEngine";

export default function ClimatePage() {
  return (
    <>
      <Header title="CLIMATE INTELLIGENCE" />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-[#090f18] custom-scrollbar flex flex-col">

        {/* Global Stability Indicator */}
        <section className="w-full shrink-0">
          <ClimateStabilityBar />
        </section>

        {/* Top Region: Map + Right Core Panels */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[500px] w-full shrink-0">
          <div className="lg:col-span-3 h-[500px] rounded-lg overflow-hidden border border-dash-border">
            <ClimateMap />
          </div>
          <div className="lg:col-span-1 h-[500px] flex flex-col gap-4">
            <div className="flex-1"><ClimateAnalyticsPanel /></div>
            <div className="flex-1"><StrategicImpactScore /></div>
          </div>
        </section>

        {/* Middle Region: Ontology Graph & Simulation */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[400px] shrink-0">
          <div className="lg:col-span-2 h-full">
            <KnowledgeGraphPanel />
          </div>
          <div className="lg:col-span-1 h-full">
            <ConnectedImpactsPanel />
          </div>
          <div className="lg:col-span-1 h-full">
            <ScenarioSimulation />
          </div>
        </section>

        {/* Lower Region: Specialized Intelligence Panels */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[350px] shrink-0">
          <div className="h-full"><PopulationVulnerability /></div>
          <div className="h-full"><ClimateEconomicImpact /></div>
          <div className="h-full"><AIStrategicAssessment /></div>
          <div className="h-full"><PolicyRecommendationEngine /></div>
        </section>

        {/* Bottom Region: Feeds and Logs */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[250px] shrink-0 pb-10">
          <div className="h-full"><IntelligenceCorrelationFeed /></div>
          <div className="h-full flex flex-col gap-4">
            <div className="flex-1"><WeatherAlerts /></div>
            <div className="flex-none h-48"><DataProvenance /></div>
          </div>
          <div className="h-full"><ClimateTimeline /></div>
        </section>

      </main>
    </>
  );
}
