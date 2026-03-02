import Header from "@/components/Header";
import HeatMap from "@/components/HeatMap";
import NewsList from "@/components/NewsList";
import AnalyticsCharts from "@/components/AnalyticsCharts";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto p-4 space-y-4">
        {/* Top Half: Heat Map */}
        <section className="min-h-[400px] h-[50vh] w-full">
          <HeatMap />
        </section>

        {/* Bottom Half: Split View */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[40vh] min-h-[300px]">
          <div className="bg-[#141d2b] border border-dash-border rounded-lg p-4 overflow-hidden flex flex-col">
            <NewsList />
          </div>
          
          <div className="bg-[#141d2b] border border-dash-border rounded-lg p-4 overflow-hidden flex flex-col">
            <AnalyticsCharts />
          </div>
        </section>
      </main>
    </>
  );
}
