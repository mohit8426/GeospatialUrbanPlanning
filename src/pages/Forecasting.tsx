import TopNav from "@/components/TopNav";
import { forecastData } from "@/data/urbanData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Brain, AlertTriangle, TrendingUp, Activity } from "lucide-react";

const Forecasting = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="w-56 border-r border-border min-h-[calc(100vh-56px)] p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Predictive Suite</h3>
              <p className="label-caps text-[9px]">Active Instance: v.4.2</p>
            </div>
          </div>
          <nav className="space-y-1">
            {["Congestion Models", "Growth Projections", "Anomaly Detection"].map((item, i) => (
              <button
                key={item}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  i === 0 ? "bg-primary/15 text-primary border-l-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Model Fidelity Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Model Fidelity</h3>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded border border-border text-status-success">STABLE</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="label-caps">Confidence Score</span>
                    <span className="text-sm font-semibold text-foreground">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="label-caps">Variance Delta</span>
                    <span className="text-sm font-semibold text-foreground">±0.4%</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "94.2%" }} />
                  </div>
                </div>
              </div>

              <div className="glass-panel p-5 border-l-2 border-status-warning">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-status-warning" />
                  <h3 className="font-semibold text-status-warning">High Congestion Alert</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sector 7-G predicts critical infrastructure failure by 2031 if growth persists.
                </p>
              </div>

              <div className="glass-panel p-5">
                <h3 className="font-semibold text-foreground mb-3">Growth Probability</h3>
                <div className="flex items-end gap-3 h-20">
                  {[
                    { label: "Residential", h: 55 },
                    { label: "Industrial", h: 40 },
                    { label: "Transit", h: 72 },
                  ].map((d) => (
                    <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-primary/20 rounded-sm relative" style={{ height: `${d.h}%` }}>
                        <div className="absolute inset-0 bg-primary/50 rounded-sm" />
                      </div>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projected Congestion Chart */}
            <div className="glass-panel p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Projected Congestion (2025–2040)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="congGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(190,80%,50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(190,80%,50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="popGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(210,100%,56%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(210,100%,56%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                  <XAxis dataKey="year" tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(220,18%,10%)", border: "1px solid hsl(220,14%,20%)", borderRadius: 8, color: "hsl(210,20%,92%)" }} />
                  <Area type="monotone" dataKey="congestion" stroke="hsl(190,80%,50%)" fill="url(#congGrad)" strokeWidth={2} name="Congestion %" />
                  <Line type="monotone" dataKey="population" stroke="hsl(210,100%,56%)" strokeWidth={2} dot={false} name="Population (M)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-chart-cyan inline-block" /> Congestion Projection</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary inline-block" /> Population Growth</span>
              </div>
            </div>

            {/* Land-Use Deviation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-panel p-5">
                <h3 className="text-lg font-semibold text-foreground mb-4">Land-Use Deviation</h3>
                <div className="space-y-4">
                  {[
                    { label: "Commercial", change: "+12%", width: 72, color: "bg-primary" },
                    { label: "Green Space", change: "-8.4%", width: 45, color: "bg-status-critical" },
                    { label: "Residential", change: "+5.1%", width: 58, color: "bg-muted-foreground" },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="label-caps">{d.label}</span>
                        <span className={`font-mono ${d.change.startsWith("+") ? "text-status-success" : "text-status-critical"}`}>{d.change}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.width}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-5">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Resources</h3>
                <div className="space-y-4">
                  {[
                    { label: "Active Threads", value: "1,024", bar: 65 },
                    { label: "Latency (Sim-Real)", value: "12ms", bar: 12, color: "bg-chart-cyan" },
                    { label: "Sync Consistency", value: "99.8%", bar: 99 },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="label-caps">{d.label}</span>
                        <span className="font-mono text-foreground">{d.value}</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${d.color || "bg-primary"} rounded-full`} style={{ width: `${d.bar}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forecasting;
