import Header from "@/components/Header";
import ClimateMap from "@/components/ClimateMap";
import WeatherAlerts from "@/components/WeatherAlerts";
import ClimateAnalyticsPanel from "@/components/ClimateAnalyticsPanel";

export default function ClimatePage() {
  return (
    <>
      <Header title="CLIMATE INTELLIGENCE" />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-[#090f18] custom-scrollbar flex flex-col">
        
        {/* Top Region: Map + Right Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[500px] w-full shrink-0">
          <div className="lg:col-span-3 h-full rounded-lg overflow-hidden border border-dash-border">
            <ClimateMap />
          </div>
          <div className="lg:col-span-1 h-full min-h-[400px]">
             <ClimateAnalyticsPanel />
          </div>
        </section>

        {/* Bottom Region: Alert Feed */}
        <section className="flex-none min-h-[220px]">
          <div className="rounded-lg overflow-hidden border border-dash-border bg-[#141d2b]">
            <WeatherAlerts />
          </div>
        </section>

      </main>
    </>
  );
}
