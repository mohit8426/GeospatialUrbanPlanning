import { useState } from "react";
import { X, Activity, Wifi, Server, ChevronUp } from "lucide-react";
import { trafficTimeline } from "@/data/urbanData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const TrafficCongestionPanel = ({ isOpen, onToggle }: Props) => {
  const [layerOpacity, setLayerOpacity] = useState({
    traffic: 80,
    density: 60,
    transit: 45,
  });

  const healthIndicators = [
    { label: "Network Health", value: "92.4%", status: "success" as const, icon: Wifi },
    { label: "Data Throughput", value: "1.2 GB/s", status: "success" as const, icon: Server },
    { label: "Active Sensors", value: "847/862", status: "warning" as const, icon: Activity },
  ];

  return (
    <>
      {/* Toggle button when closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel-strong text-sm text-primary font-medium hover:bg-card/95 transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
          Traffic Analysis
        </button>
      )}

      {/* Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-card/95 backdrop-blur-2xl border-t border-glass-border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Traffic Congestion Analysis</h3>
              <span className="px-2 py-0.5 text-[9px] font-semibold rounded border border-status-success/30 text-status-success bg-status-success/10">LIVE</span>
            </div>
            <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto">
            {/* Network Health */}
            <div>
              <p className="label-caps mb-3">Network Health Indicators</p>
              <div className="space-y-3">
                {healthIndicators.map((ind) => {
                  const Icon = ind.icon;
                  return (
                    <div key={ind.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-secondary-foreground">{ind.label}</span>
                      </div>
                      <span className={`text-sm font-mono font-semibold ${
                        ind.status === "success" ? "text-status-success" : "text-status-warning"
                      }`}>
                        {ind.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Corridor status */}
              <div className="mt-4">
                <p className="label-caps mb-2">Corridor Status</p>
                <div className="space-y-2">
                  {[
                    { name: "I-95 North", status: "critical", load: 89 },
                    { name: "Route 1 Central", status: "warning", load: 64 },
                    { name: "Harbor Express", status: "success", load: 32 },
                    { name: "Tech Corridor Blvd", status: "warning", load: 58 },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        c.status === "critical" ? "bg-status-critical" : c.status === "warning" ? "bg-status-warning" : "bg-status-success"
                      }`} />
                      <span className="text-xs text-secondary-foreground flex-1">{c.name}</span>
                      <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${
                          c.status === "critical" ? "bg-status-critical" : c.status === "warning" ? "bg-status-warning" : "bg-status-success"
                        }`} style={{ width: `${c.load}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">{c.load}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 24h Volume Chart */}
            <div>
              <p className="label-caps mb-3">24H Volume Trend</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={trafficTimeline}>
                  <defs>
                    <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(190,80%,50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(190,80%,50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" tick={{ fill: "hsl(215,15%,50%)", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: "hsl(220,18%,10%)", border: "1px solid hsl(220,14%,20%)", borderRadius: 8, color: "hsl(210,20%,92%)", fontSize: 11 }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="hsl(190,80%,50%)" fill="url(#trafficGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>

              {/* Peak indicators */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Peak Volume", value: "9,200" },
                  { label: "Avg Speed", value: "38 km/h" },
                  { label: "Peak Congestion", value: "68%" },
                ].map((m) => (
                  <div key={m.label} className="text-center p-2 rounded-lg bg-secondary/30">
                    <p className="text-xs font-mono font-semibold text-foreground">{m.value}</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Layer Transparency Controls */}
            <div>
              <p className="label-caps mb-3">Layer Transparency</p>
              <div className="space-y-4">
                {[
                  { key: "traffic", label: "Traffic Heatmap", color: "accent-primary" },
                  { key: "density", label: "Population Density", color: "accent-chart-cyan" },
                  { key: "transit", label: "Transit Routes", color: "accent-chart-orange" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-secondary-foreground">{label}</span>
                      <span className="text-xs font-mono text-muted-foreground">{layerOpacity[key as keyof typeof layerOpacity]}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={layerOpacity[key as keyof typeof layerOpacity]}
                      onChange={(e) => setLayerOpacity((p) => ({ ...p, [key]: Number(e.target.value) }))}
                      className="w-full accent-primary h-1"
                    />
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="mt-5 space-y-2">
                <button className="w-full py-2 rounded-lg bg-primary/15 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/25 transition-colors">
                  Export Analysis Report
                </button>
                <button className="w-full py-2 rounded-lg bg-secondary border border-border text-muted-foreground text-xs font-medium hover:text-foreground transition-colors">
                  Reset All Layers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrafficCongestionPanel;
