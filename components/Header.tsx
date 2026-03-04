import { AlertTriangle, Settings } from "lucide-react";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 border-b border-dash-border bg-dash-bg flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center">
        <div className="bg-dash-red/10 border border-dash-red/30 text-dash-red px-3 py-1 rounded flex items-center gap-2 text-xs font-semibold tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          RESTRICTED ACCESS
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center gap-2 md:gap-4 shrink-0 overflow-hidden px-2">
        <h1 className="text-lg md:text-xl xl:text-2xl font-bold tracking-wider text-white whitespace-nowrap truncate">
          GLOBAL ONTOLOGY ENGINE
        </h1>
        {title && (
          <div className="bg-[#164e63] border border-[#22d3ee]/30 text-[#22d3ee] px-2 py-0.5 rounded text-sm font-semibold tracking-wide">
            {title}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-[#1a2b25] border border-[#2b4c3e] text-[#2ebd6e] px-3 py-1 rounded-full text-xs font-semibold">
          <div className="w-2 h-2 rounded-full bg-[#2ebd6e] animate-pulse"></div>
          LIVE
        </div>
        
        <div className="flex items-center gap-6 text-xs text-dash-text-muted font-medium ml-4 border-l border-dash-border/50 pl-6">
          <div className="flex flex-col gap-1 items-end">
            <div className="flex justify-between w-24"><span>Network</span> <span className="text-dash-accent text-[10px]">ACTIVE</span></div>
            <div className="w-24 h-1 bg-dash-bg rounded-full overflow-hidden">
               <div className="w-[85%] h-full bg-dash-accent"></div>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
             <div className="flex justify-between w-24"><span>System</span> <span className="text-[#a855f7] text-[10px]">92%</span></div>
             <div className="w-24 h-1 bg-dash-bg rounded-full overflow-hidden">
               <div className="w-[92%] h-full bg-[#a855f7]"></div>
             </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
             <div className="flex justify-between w-24"><span>Law</span> <span className="text-dash-green text-[10px]">STABLE</span></div>
             <div className="w-24 h-1 bg-dash-bg rounded-full overflow-hidden">
               <div className="w-[100%] h-full bg-dash-green"></div>
             </div>
          </div>
        </div>
        
        <button className="text-dash-text-muted hover:text-white transition-colors bg-dash-panel p-2 rounded ml-2 border border-dash-border">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
