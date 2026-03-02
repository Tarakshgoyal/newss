import { MoreHorizontal } from "lucide-react";

// Mock data to match the design snippet roughly
const newsItems = [
  {
    id: 1,
    flag: "https://flagcdn.com/w40/us.png",
    country: "USA",
    tags: [
      { label: "DEFENSE", color: "text-[#5b8cda] border border-[#2b4c7e] bg-[#1c2e4a]/50" }
    ],
    time: "12 hrs ago",
    title: "CYBERATTACK ON CRITICAL INFRASTRUCTURE UNEXPECTED",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    highlight: "cyberattack",
    severity: "HIGH",
    severityColor: "text-dash-red",
    progress: 85,
    progressColor: "bg-dash-red",
  },
  {
    id: 2,
    flag: "https://flagcdn.com/w40/de.png",
    country: "GERMANY",
    tags: [
      { label: "ECONOMY", color: "text-[#dca568] border border-[#5d4030] bg-[#3d2b24]/50" }
    ],
    time: "15 hrs ago",
    title: "ECONOMY CAUNCS REMRES BEGINNERS",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    highlight: "economy, trade",
    severity: "MEDIUM",
    severityColor: "text-dash-yellow",
    progress: 50,
    progressColor: "bg-dash-yellow",
  },
  {
    id: 3,
    flag: "https://flagcdn.com/w40/be.png",
    country: "BELGIUM",
    tags: [
      { label: "TECHNOLOGY", color: "text-[#22d3ee] border border-[#164e63] bg-[#083344]/50" }
    ],
    time: "21 hrs ago",
    title: "AI-DRIVEN CYBERDEFENSE SYSTEM",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    highlight: "AI, cyberdefense",
    severity: "LOW",
    severityColor: "text-dash-green",
    progress: 20,
    progressColor: "bg-dash-green",
  }
];

export default function NewsList() {
  return (
    <div className="flex flex-col h-full bg-[#141d2b] w-full rounded-lg border border-dash-border overflow-hidden">
      <div className="flex justify-between items-center mb-0 p-3 bg-[#192436] border-b border-dash-border/50">
        <h2 className="text-white font-medium text-sm">Global Intelligence Feed</h2>
        <button className="text-dash-text-muted hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        <div className="flex flex-col gap-3">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#111a28] border border-dash-border/60 rounded-lg p-3 hover:border-dash-border transition-colors cursor-pointer group relative overflow-hidden"
            >
              {/* Left highlight strip based on severity */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.progressColor}`}></div>
              
              <div className="pl-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.flag} 
                      alt={item.country} 
                      className="w-5 h-3.5 object-cover rounded-sm border border-dash-border/50"
                    />
                    {item.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-dash-text-muted" />
                </div>
                
                <h3 className="font-bold text-xs text-white mb-1">{item.title}</h3>
                <p className="text-[11px] text-dash-text-muted leading-relaxed mb-2">
                  {item.text}
                  <span className="text-dash-orange"> {item.highlight}</span>
                </p>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-dash-border/50">
                   <div className="text-[10px] text-dash-text-muted flex items-center gap-2">
                     Severity Status: <span className={`font-bold ${item.severityColor}`}>{item.severity}</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="text-[10px] text-dash-text-muted">{item.time}</span>
                   </div>
                </div>
                
                {/* Progress bar at the very bottom interior */}
                <div className="w-full h-0.5 bg-dash-bg mt-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.progressColor}`} style={{ width: `${item.progress}%`}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
