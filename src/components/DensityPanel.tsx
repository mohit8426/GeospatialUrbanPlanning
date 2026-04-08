const DensityPanel = () => {
  const bars = [65, 80, 72, 90, 55, 82, 68];
  return (
    <div className="glass-panel-strong p-4 w-56 animate-fade-in">
      <p className="label-caps mb-2">Real-Time Density</p>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="metric-medium text-foreground">18.4k</span>
        <span className="text-xs text-muted-foreground">PPL/KM²</span>
      </div>
      <div className="flex items-end gap-1 h-12">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-primary/60 rounded-sm transition-all hover:bg-primary"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default DensityPanel;
