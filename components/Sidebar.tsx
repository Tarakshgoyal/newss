"use client";

import { Globe, ShieldAlert, BarChart3, Shield, Cpu, Cloud, BrainCircuit, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Globe, label: 'Global Overview', href: '/' },
    { icon: ShieldAlert, label: 'Geopolitics', href: '#' },
    { icon: BarChart3, label: 'Economy', href: '#' },
    { icon: Shield, label: 'Defense', href: '#' },
    { icon: Cpu, label: 'Technology', href: '#' },
    { icon: Cloud, label: 'Climate', href: '/climate' },
    { icon: BrainCircuit, label: 'AI Insights', href: '#' },
    { icon: Bell, label: 'Alerts', href: '#' },
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
            const isActive = pathname === item.href || (item.href !== '#' && pathname?.startsWith(item.href) && item.href !== '/');

            return (
              <Link 
                key={index}
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 transition-colors relative ${
                  isActive 
                    ? 'text-dash-accent bg-[#0f1b29]' 
                    : 'text-dash-text-muted hover:bg-dash-panel hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-dash-accent rounded-r-sm"></div>
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-80'}`} />
                <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
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
