import TopNav from "@/components/TopNav";
import { districts, populationTrend, trafficTimeline } from "@/data/urbanData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip, LineChart, Line } from "recharts";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Users, Activity, TreePine, Building2, TrendingUp, TrendingDown } from "lucide-react";

const kpiCards = [
  { label: "Total Population", value: 2.14, suffix: "M", change: "+2.9%", up: true, icon: Users },
  { label: "Avg. Congestion", value: 42.8, suffix: "%", change: "+3.2%", up: true, icon: Activity },
  { label: "Green Coverage", value: 18.2, suffix: "%", change: "-1.4%", up: false, icon: TreePine },
  { label: "Infrastructure Score", value: 81, suffix: "/100", change: "+2.1%", up: true, icon: Building2 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="pt-20 px-6 pb-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="label-caps mb-1 text-primary">Urban Analysis</p>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="glass-panel p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="label-caps">{kpi.label}</p>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter end={kpi.value} decimals={kpi.value % 1 !== 0 ? 1 : 0} className="metric-large text-foreground" />
                  <span className="text-sm text-muted-foreground">{kpi.suffix}</span>
                </div>
                <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${kpi.up ? "text-status-success" : "text-status-critical"}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Population Trend */}
          <div className="glass-panel p-5">
            <p className="label-caps mb-1">Population Growth</p>
            <h3 className="text-lg font-semibold text-foreground mb-4">Metropolitan Trend (2018–2025)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={populationTrend}>
                <defs>
                  <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210,100%,56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(210,100%,56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                <XAxis dataKey="year" tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(220,18%,10%)", border: "1px solid hsl(220,14%,20%)", borderRadius: 8, color: "hsl(210,20%,92%)" }} />
                <Area type="monotone" dataKey="population" stroke="hsl(210,100%,56%)" fill="url(#popGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Timeline */}
          <div className="glass-panel p-5">
            <p className="label-caps mb-1">24H Traffic Volume</p>
            <h3 className="text-lg font-semibold text-foreground mb-4">Congestion Pattern</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={trafficTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                <XAxis dataKey="hour" tick={{ fill: "hsl(215,15%,50%)", fontSize: 10 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(220,18%,10%)", border: "1px solid hsl(220,14%,20%)", borderRadius: 8, color: "hsl(210,20%,92%)" }} />
                <Bar dataKey="volume" fill="hsl(210,100%,56%)" radius={[3, 3, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Comparison */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="label-caps mb-1">District Analysis</p>
              <h3 className="text-lg font-semibold text-foreground">Zone Comparison</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["District", "Population", "Density", "Congestion", "Infrastructure", "Green %", "Growth", "Livability"].map((h) => (
                    <th key={h} className="text-left py-3 px-3 label-caps font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {districts.map((d) => (
                  <tr key={d.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-3 font-medium text-foreground">{d.name}</td>
                    <td className="py-3 px-3 font-mono text-sm text-secondary-foreground">{d.population.toLocaleString()}</td>
                    <td className="py-3 px-3 font-mono text-sm text-secondary-foreground">{d.density.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className={`font-mono text-sm ${d.congestionScore > 45 ? "text-status-critical" : d.congestionScore > 30 ? "text-status-warning" : "text-status-success"}`}>
                        {d.congestionScore}%
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${d.infrastructureScore}%` }} />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">{d.infrastructureScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-sm text-status-success">{d.greenCoverage}%</td>
                    <td className="py-3 px-3">
                      <span className={`font-mono text-sm ${d.growthRate > 0 ? "text-status-success" : "text-status-critical"}`}>
                        {d.growthRate > 0 ? "+" : ""}{d.growthRate}%
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-sm text-foreground">{d.livabilityScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Age Distribution & Land Use */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="glass-panel p-5">
            <p className="label-caps mb-1">Demographic Composition</p>
            <h3 className="text-lg font-semibold text-foreground mb-4">Age Distribution</h3>
            <div className="space-y-4">
              {[
                { label: "Gen Z (18-25)", pct: 18, color: "bg-primary" },
                { label: "Millennials (26-40)", pct: 32, color: "bg-chart-cyan" },
                { label: "Gen X (41-56)", pct: 25, color: "bg-chart-orange" },
                { label: "Boomers+ (57+)", pct: 25, color: "bg-muted-foreground" },
              ].map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-secondary-foreground">{d.label}</span>
                    <span className="font-mono text-muted-foreground">{d.pct}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full transition-all`} style={{ width: `${d.pct * 3}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <p className="label-caps mb-1">Spatial Distribution</p>
            <h3 className="text-lg font-semibold text-foreground mb-4">Land Use Breakdown</h3>
            <div className="grid grid-cols-2 gap-6 mt-6">
              {[
                { label: "Urban Core", pct: 65, color: "stroke-primary" },
                { label: "Suburban Fringe", pct: 35, color: "stroke-chart-orange" },
              ].map((d) => (
                <div key={d.label} className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.915" fill="none" className={d.color} strokeWidth="3"
                        strokeDasharray={`${d.pct} ${100 - d.pct}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-foreground">{d.pct}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">{d.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: "High Density Hotspots", value: "142 Clusters", color: "bg-primary" },
                { label: "Urban Sprawl Rate", value: "+2.4% YoY", color: "bg-chart-orange" },
              ].map((d) => (
                <div key={d.label} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/40">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${d.color}`} />
                    <span className="text-sm text-muted-foreground">{d.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
