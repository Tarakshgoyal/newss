import { AlertTriangle, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-dash-border bg-dash-bg flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center">
        <div className="bg-dash-red/10 border border-dash-red/30 text-dash-red px-3 py-1 rounded flex items-center gap-2 text-xs font-semibold tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          RESTRICTED ACCESS
        </div>
      </div>
      
      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl font-bold tracking-wider text-white">
          GLOBAL ONTOLOGY ENGINE
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-[#1a2b25] border border-[#2b4c3e] text-[#2ebd6e] px-3 py-1 rounded-full text-xs font-semibold">
          <div className="w-2 h-2 rounded-full bg-[#2ebd6e] animate-pulse"></div>
          LIVE
        </div>
        
        <div className="text-right flex flex-col items-end">
          <div className="text-sm font-mono text-dash-text">12:53:37 AM</div>
          <div className="text-[10px] text-dash-text-muted flex items-center gap-2">
            System Status
            <div className="flex gap-1">
              <div className="w-2 h-1 bg-[#2ebd6e] rounded-sm"></div>
              <div className="w-2 h-1 bg-[#2ebd6e] rounded-sm"></div>
              <div className="w-2 h-1 bg-[#2ebd6e] opacity-30 rounded-sm"></div>
            </div>
          </div>
        </div>
        
        <button className="text-dash-text-muted hover:text-white transition-colors bg-dash-panel p-2 rounded">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
