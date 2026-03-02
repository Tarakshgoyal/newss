import Header from "@/components/Header";
import HeatMap from "@/components/HeatMap";
import NewsList from "@/components/NewsList";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import RightPanel from "@/components/RightPanel";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-[#090f18] custom-scrollbar flex flex-col">
        {/* Top Half: Heat Map + Right Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[400px] w-full shrink-0">
          <div className="lg:col-span-3 h-full rounded-lg overflow-hidden border border-dash-border">
            <HeatMap />
          </div>
          <div className="lg:col-span-1 h-full min-h-[300px]">
             <RightPanel />
          </div>
        </section>

        {/* Bottom Half: News + Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[500px] shrink-0">
          <div className="lg:col-span-5 h-[500px] overflow-hidden">
            <NewsList />
          </div>
          
          <div className="lg:col-span-7 h-full">
            <AnalyticsCharts />
          </div>
        </section>
      </main>
    </>
  );
}
