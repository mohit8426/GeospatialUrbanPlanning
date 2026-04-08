import { Link, useLocation } from "react-router-dom";
import { Search, Settings, Bell, User, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Map", path: "/map" },
  { label: "Analytics", path: "/analytics" },
  { label: "Simulation", path: "/simulation" },
  { label: "Forecasting", path: "/forecasting" },
];

interface Props {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

const TopNav = ({ searchQuery = "", onSearchChange }: Props) => {
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: "Congestion Alert", desc: "I-95 North corridor at 89% capacity", time: "2 min ago", type: "critical" },
    { id: 2, title: "Model Updated", desc: "Forecasting model v4.2 retrained", time: "15 min ago", type: "info" },
    { id: 3, title: "Sensor Offline", desc: "Sensor #847 in Harbor Industrial", time: "1 hr ago", type: "warning" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 bg-surface-overlay/90 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
            Urban<span className="text-primary">Intelligence</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${searchFocused ? 'border-primary/50 bg-secondary' : 'border-border bg-secondary/50'}`}>
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search districts or zones..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-48"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery && (
              <button onClick={() => onSearchChange?.("")} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications((p) => !p); setShowSettings(false); setShowProfile(false); }}
              className={`p-2 rounded-lg transition-colors relative ${showNotifications ? "bg-primary/15 text-primary" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-status-critical" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-12 w-72 glass-panel-strong p-0 overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Notifications</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-status-critical/20 text-status-critical font-semibold">{notifications.length}</span>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div className="flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        n.type === "critical" ? "bg-status-critical" : n.type === "warning" ? "bg-status-warning" : "bg-primary"
                      }`} />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{n.title}</p>
                        <p className="text-[11px] text-muted-foreground">{n.desc}</p>
                        <p className="text-[10px] text-text-dim mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full px-4 py-2.5 text-xs text-primary font-medium hover:bg-secondary/30 transition-colors">
                  View All Notifications
                </button>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative">
            <button
              onClick={() => { setShowSettings((p) => !p); setShowNotifications(false); setShowProfile(false); }}
              className={`p-2 rounded-lg transition-colors ${showSettings ? "bg-primary/15 text-primary" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              <Settings className="w-4 h-4" />
            </button>
            {showSettings && (
              <div className="absolute right-0 top-12 w-56 glass-panel-strong p-3 animate-fade-in">
                <p className="label-caps mb-2">Settings</p>
                {[
                  { label: "Dark Mode", enabled: true },
                  { label: "Show Grid", enabled: false },
                  { label: "Auto-Refresh", enabled: true },
                  { label: "Notifications", enabled: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2.5">
                    <span className="text-xs text-secondary-foreground">{s.label}</span>
                    <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${s.enabled ? "bg-primary" : "bg-muted"}`}>
                      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-foreground transition-transform ${s.enabled ? "left-4" : "left-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setShowProfile((p) => !p); setShowNotifications(false); setShowSettings(false); }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                showProfile ? "bg-primary/30 border-primary/50" : "bg-primary/20 border-primary/30"
              } border`}
            >
              <User className="w-4 h-4 text-primary" />
            </button>
            {showProfile && (
              <div className="absolute right-0 top-12 w-56 glass-panel-strong p-0 overflow-hidden animate-fade-in">
                <div className="px-4 py-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Urban Planner</p>
                      <p className="text-[11px] text-muted-foreground">planner@urbanintel.io</p>
                    </div>
                  </div>
                </div>
                {["My Dashboard", "Saved Views", "Preferences", "API Keys"].map((item) => (
                  <button key={item} className="w-full text-left px-4 py-2.5 text-xs text-secondary-foreground hover:bg-secondary/40 transition-colors">
                    {item}
                  </button>
                ))}
                <div className="border-t border-border">
                  <button className="w-full text-left px-4 py-2.5 text-xs text-status-critical hover:bg-secondary/40 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Click-away to close dropdowns */}
      {(showNotifications || showSettings || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowNotifications(false); setShowSettings(false); setShowProfile(false); }}
        />
      )}
    </>
  );
};

export default TopNav;
