'use client';

import {
  Compass,
  Map as MapIcon,
  Users,
  Bookmark,
  Settings,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlannerStore } from '@/store/usePlannerStore';

const menuItems = [
  { icon: Compass, label: 'Discover' },
  { icon: MapIcon, label: 'Routes' },
  { icon: Users, label: 'Community' },
  { icon: Bookmark, label: 'Saved' },
];

export default function AppSidebar() {
  const { activeNav, setActiveNav, roadmapItems } = usePlannerStore();

  return (
    <aside className="w-[220px] h-screen bg-sidebar border-r border-border flex flex-col py-8 px-5 shrink-0 z-20">
      {/* Logo */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black text-neon-indigo tracking-tight">
          VibeQuest
        </h1>
        <p className="text-[10px] font-semibold text-muted-foreground mt-0.5 uppercase tracking-widest">
          Modern Explorer
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeNav === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all focus-visible:neon-glow-focus',
                isActive
                  ? 'nav-active text-neon-indigo'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 shrink-0',
                  isActive ? 'text-neon-indigo' : 'text-muted-foreground'
                )}
              />
              {item.label}
              {item.label === 'Saved' && roadmapItems.length > 0 && (
                <span className="ml-auto text-[10px] font-bold bg-neon-indigo/15 text-neon-indigo px-2 py-0.5 rounded-full">
                  {roadmapItems.length}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-6">
          <button className="w-full py-3 bg-neon-indigo-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 neon-glow-indigo hover:neon-glow-indigo-strong focus-visible:neon-glow-focus transition-all">
            <Plus className="w-4 h-4" />
            New Trip
          </button>
        </div>
      </nav>

      {/* Bottom */}
      <div>
        <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground font-semibold text-sm hover:bg-muted hover:text-foreground w-full rounded-xl transition-all focus-visible:neon-glow-focus">
          <Settings className="w-5 h-5 text-muted-foreground" />
          Settings
        </button>
      </div>
    </aside>
  );
}
