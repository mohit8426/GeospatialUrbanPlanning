import { useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, BarChart3, Brain, Layers, Activity, Users, TreePine, Building2, ChevronDown } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const CityCanvas = lazy(() => import("@/components/CityCanvas"));

const features = [
  { icon: MapPin, title: "Geospatial Intelligence", desc: "PostGIS-powered spatial queries across millions of urban data points with real-time layer compositing." },
  { icon: BarChart3, title: "Urban Analytics", desc: "Deep analysis of traffic patterns, population density, land use, and infrastructure accessibility." },
  { icon: Brain, title: "ML Forecasting", desc: "Predictive models for congestion hotspots, population growth vectors, and infrastructure stress." },
  { icon: Layers, title: "Digital Twin", desc: "3D urban visualization with building extrusions, route animations, and temporal playback." },
];

const stats = [
  { label: "Districts Monitored", value: 48, suffix: "" },
  { label: "Data Points / Sec", value: 12.4, suffix: "K", decimals: 1 },
  { label: "Model Accuracy", value: 94.2, suffix: "%", decimals: 1 },
  { label: "Infrastructure Score", value: 81, suffix: "/100" },
];

const storyBlocks = [
  {
    tag: "Urban Growth",
    title: "Population expansion reshaping city boundaries",
    desc: "Track metropolitan growth from 1.82M to 2.14M residents across 8 districts. Identify density hotspots and emerging suburban corridors with real-time demographic overlays.",
    icon: Users,
    metric: "2.14M",
    metricLabel: "Current Population",
  },
  {
    tag: "Traffic Intelligence",
    title: "Congestion patterns decoded in real-time",
    desc: "24-hour traffic volume analysis reveals peak congestion at 68% during evening rush. ML models predict corridor bottlenecks 72 hours in advance.",
    icon: Activity,
    metric: "42.8%",
    metricLabel: "Avg Congestion Index",
  },
  {
    tag: "Green Infrastructure",
    title: "Sustainability metrics driving urban policy",
    desc: "Monitor green coverage across zones—from Riverside Park's 35% to Harbor Industrial's 6%. Data-driven recommendations for urban canopy expansion.",
    icon: TreePine,
    metric: "18.2%",
    metricLabel: "Avg Green Coverage",
  },
  {
    tag: "Infrastructure Readiness",
    title: "Capacity planning with spatial precision",
    desc: "86 transit stations, 24 hospitals, 142 schools mapped against population density. Identify underserved zones and optimize resource allocation.",
    icon: Building2,
    metric: "81/100",
    metricLabel: "Infrastructure Score",
  },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 bg-surface-overlay/80 backdrop-blur-xl border-b border-border">
        <Link to="/" className="text-lg font-bold tracking-tight">
          Urban<span className="text-primary">Intelligence</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {["Map", "Analytics", "Simulation", "Forecasting"].map((item) => (
            <Link
              key={item}
              to={item === "Map" ? "/map" : `/${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
        <Link
          to="/map"
          className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/15 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/25 transition-colors"
        >
          Launch Platform <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <CityCanvas />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="label-caps text-primary mb-4 tracking-[0.2em]">Geospatial Intelligence Platform</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Smart Urban Planning<br />
              <span className="text-gradient-primary">Through Spatial Data</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A PostGIS-powered analytics platform combining real-time geospatial visualization,
              ML-backed forecasting, and interactive urban digital twin capabilities.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/map" className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
              Explore the City <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/analytics" className="px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors">
              View Analytics
            </Link>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-wider uppercase">Scroll to explore</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.section>

      {/* Stats Bar */}
      <section className="relative z-10 border-y border-border bg-card/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="flex items-baseline justify-center gap-1">
                <AnimatedCounter end={s.value} decimals={s.decimals || 0} className="metric-large text-foreground" />
                <span className="text-lg text-muted-foreground">{s.suffix}</span>
              </div>
              <p className="label-caps mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="label-caps text-primary mb-3">Platform Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Built for Urban Intelligence</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-6 hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Story Sections */}
      {storyBlocks.map((block, i) => {
        const Icon = block.icon;
        return (
          <section key={block.tag} className="relative min-h-screen flex items-center border-t border-border">
            <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <p className="label-caps text-primary mb-3">{block.tag}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight capitalize">{block.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{block.desc}</p>
                <Link to="/analytics" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
                  Explore data <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.2 }} className={`glass-panel p-8 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="metric-medium text-foreground">{block.metric}</p>
                    <p className="label-caps">{block.metricLabel}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[75, 60, 45, 85, 55].map((w, j) => (
                    <div key={j} className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: j * 0.1 }} className="h-full bg-primary/60 rounded-full" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="label-caps text-primary mb-4">Ready to Explore</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Start Analyzing Your City</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Access the full geospatial dashboard with interactive maps, real-time analytics, simulation tools, and ML-powered forecasting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/map" className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2">
                Launch Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/simulation" className="px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors">
                Run Simulation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 UrbanIntelligence — Geospatial Analytics Platform</span>
          <span>PostGIS • React • Three.js • MapLibre</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
