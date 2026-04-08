import TopNav from "@/components/TopNav";
import { useState } from "react";
import { Sliders, Layers as LayersIcon, Database, Clock, History, RefreshCw, Info } from "lucide-react";

const sidebarItems = [
  { icon: Sliders, label: "Parameters", id: "parameters" },
  { icon: LayersIcon, label: "Layers", id: "layers" },
  { icon: Database, label: "Data Layers", id: "data" },
  { icon: Clock, label: "Timeline", id: "timeline" },
  { icon: History, label: "History", id: "history" },
];

const Simulation = () => {
  const [activeTab, setActiveTab] = useState("parameters");
  const [scenarioName, setScenarioName] = useState("2026 Transit Expansion");
  const [timeframe, setTimeframe] = useState("short");
  const [conditions, setConditions] = useState({ infrastructure: true, planned: false, climate: true });
  const [interventions, setInterventions] = useState({ transit: 42, zoning: 65, greenSpace: 15 });

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="w-56 border-r border-border min-h-[calc(100vh-56px)] p-4 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Sliders className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Sim Engine v2.4</h3>
                <p className="label-caps text-[9px]">Active Session</p>
              </div>
            </div>
          </div>
          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive ? "bg-primary/15 text-primary border-l-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <button className="w-full py-2.5 rounded-lg bg-primary/15 text-primary font-medium text-sm hover:bg-primary/25 transition-colors">
            Initialize Run
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Simulation Configuration</h1>
          <p className="text-muted-foreground mb-8">Define environmental parameters and urban growth catalysts for spatial projections.</p>

          <div className="space-y-6">
            <div>
              <p className="label-caps mb-2 text-primary">Scenario Name</p>
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <p className="label-caps mb-2 text-primary">Timeframe</p>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:border-primary/50 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="short">Short-term (1-3 yrs)</option>
                <option value="medium">Medium-term (3-7 yrs)</option>
                <option value="long">Long-term (7-15 yrs)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Initial Conditions</h3>
                <Info className="w-4 h-4 text-primary" />
              </div>
              {Object.entries(conditions).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-3">
                  <span className="text-sm text-foreground capitalize">{key === "greenSpace" ? "Green Space" : key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <button
                    onClick={() => setConditions((p) => ({ ...p, [key]: !val }))}
                    className={`w-10 h-5 rounded-full relative transition-colors ${val ? "bg-primary" : "bg-muted"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${val ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Interventions</h3>
                <Sliders className="w-4 h-4 text-muted-foreground" />
              </div>
              {[
                { key: "transit", label: "Public Transit Budget %", suffix: "%" },
                { key: "zoning", label: "Zoning Intensity", suffix: "" },
                { key: "greenSpace", label: "Green Space Mandate", suffix: "%" },
              ].map(({ key, label, suffix }) => (
                <div key={key} className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="label-caps">{label}</span>
                    <span className="text-sm font-mono font-semibold text-primary">
                      {interventions[key as keyof typeof interventions]}{suffix || (key === "zoning" ? (interventions.zoning > 50 ? " HIGH" : " LOW") : "%")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={interventions[key as keyof typeof interventions]}
                    onChange={(e) => setInterventions((p) => ({ ...p, [key]: Number(e.target.value) }))}
                    className="w-full accent-primary"
                  />
                </div>
              ))}
            </div>

            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary/20 to-glow-accent/20 border border-primary/30 text-primary font-semibold flex items-center justify-center gap-2 hover:from-primary/30 hover:to-glow-accent/30 transition-all">
              <RefreshCw className="w-4 h-4" />
              Initialize Simulation Engine
            </button>
          </div>
        </main>

        {/* Right map preview */}
        <aside className="w-80 p-4 hidden xl:block">
          <div className="glass-panel p-3 mb-4">
            <div className="label-caps text-status-success mb-2">Preview Mode: Active</div>
            <div className="h-48 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground text-sm">
              Map Preview
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel p-4 text-center">
              <p className="label-caps mb-1">Current Population</p>
              <p className="text-xl font-bold text-foreground font-mono">13.96M</p>
            </div>
            <div className="glass-panel p-4 text-center">
              <p className="label-caps mb-1">Growth Vector</p>
              <p className="text-xl font-bold text-status-success font-mono">+0.84%</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Simulation;
