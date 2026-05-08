'use client';

import { Search, Bell, Heart } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-background-secondary border-b border-border sticky top-0 z-10 shrink-0">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-8 flex-1">
        <h2 className="text-xl font-black text-neon-indigo tracking-tight shrink-0">
          VibeQuest
        </h2>

        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search destination..."
              className="w-full bg-card border border-border rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:neon-glow-focus transition-all"
            />
          </div>
        </div>
      </div>

      {/* Right: Actions + Avatar */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-muted-foreground hover:text-neon-indigo hover:bg-card rounded-xl transition-all focus-visible:neon-glow-focus">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-neon-cyan hover:bg-card rounded-xl transition-all focus-visible:neon-glow-focus">
          <Heart className="w-5 h-5" />
        </button>

        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-border ml-1">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aris"
            alt="Aris"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
