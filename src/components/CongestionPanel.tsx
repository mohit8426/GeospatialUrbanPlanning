import { TrendingUp } from "lucide-react";

interface Props {
  value?: number;
}

const CongestionPanel = ({ value = 42.8 }: Props) => (
  <div className="glass-panel-strong p-4 w-56 animate-fade-in">
    <div className="flex items-center justify-between mb-2">
      <p className="label-caps">Congestion Index</p>
      <TrendingUp className="w-4 h-4 text-chart-orange" />
    </div>
    <div className="flex items-baseline gap-1">
      <span className="metric-large text-foreground">{value.toFixed(1)}</span>
      <span className="text-sm text-muted-foreground">%</span>
    </div>
    <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-primary to-chart-cyan rounded-full transition-all duration-500" style={{ width: `${value}%` }} />
    </div>
    <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
      <span>Low</span>
      <span>Critical</span>
    </div>
  </div>
);

export default CongestionPanel;
