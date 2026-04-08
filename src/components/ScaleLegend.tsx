const ScaleLegend = () => {
  const items = [
    { color: "bg-status-critical", label: "Critical Delay" },
    { color: "bg-status-warning", label: "Moderate Flow" },
    { color: "bg-primary", label: "Free Flow" },
  ];

  return (
    <div className="glass-panel-strong p-4 w-52 animate-fade-in">
      <p className="label-caps mb-3">Scale Legend</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
            <span className="text-xs text-secondary-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScaleLegend;
