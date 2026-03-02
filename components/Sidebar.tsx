import { Globe, ShieldAlert, BarChart3, Shield, Cpu, Cloud, BrainCircuit, Bell, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const navItems = [
    { icon: Globe, label: 'Global Overview', active: true },
    { icon: ShieldAlert, label: 'Geopolitics' },
    { icon: BarChart3, label: 'Economy' },
    { icon: Shield, label: 'Defense' },
    { icon: Cpu, label: 'Technology' },
    { icon: Cloud, label: 'Climate' },
    { icon: BrainCircuit, label: 'AI Insights' },
    { icon: Bell, label: 'Alerts' },
  ];

  return (
    <aside className="w-64 bg-dash-sidebar border-r border-dash-border h-screen flex flex-col justify-between fixed top-0 left-0">
      <div>
        <div className="h-16 flex items-center justify-center border-b border-dash-border/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-dash-accent/20 flex items-center justify-center border border-dash-accent/50">
              <Globe className="w-5 h-5 text-dash-accent" />
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link 
                key={index}
                href="#" 
                className={`flex items-center gap-3 px-4 py-3 transition-colors relative ${
                  item.active 
                    ? 'text-dash-accent bg-[#0f1b29]' 
                    : 'text-dash-text-muted hover:bg-dash-panel hover:text-white'
                }`}
              >
                {item.active && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-dash-accent rounded-r-sm"></div>
                )}
                <Icon className={`w-5 h-5 ${item.active ? 'opacity-100' : 'opacity-80'}`} />
                <span className={`text-sm ${item.active ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <Link 
          href="#" 
          className="flex items-center gap-3 px-4 py-3 rounded-md text-dash-text-muted hover:bg-dash-panel hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5 opacity-80" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
