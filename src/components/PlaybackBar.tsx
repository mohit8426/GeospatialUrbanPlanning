import { Play, Pause, Clock, MapPin, SkipForward, SkipBack } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const hours = ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

const PlaybackBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(6); // 12:00
  const [speed, setSpeed] = useState(1);

  const advance = useCallback(() => {
    setCurrentIdx((p) => (p + 1) % hours.length);
  }, []);

  const rewind = useCallback(() => {
    setCurrentIdx((p) => (p - 1 + hours.length) % hours.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(advance, 1500 / speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed, advance]);

  const pct = (currentIdx / (hours.length - 1)) * 100;

  return (
    <div className="glass-panel-strong px-5 py-3 flex items-center gap-4 animate-fade-in">
      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={rewind}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          title="Previous"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/25 transition-colors"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <button
          onClick={advance}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          title="Next"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Info */}
      <div className="min-w-[100px]">
        <p className="label-caps">Playback Mode</p>
        <p className="text-sm font-semibold text-foreground">24-Hour Historical</p>
      </div>

      {/* Current time display */}
      <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20">
        <span className="font-mono text-sm font-bold text-primary">{hours[currentIdx]}</span>
      </div>

      {/* Scrubber */}
      <div className="flex-1 relative">
        <div className="h-1.5 bg-secondary rounded-full">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range"
          min={0}
          max={hours.length - 1}
          step={1}
          value={currentIdx}
          onChange={(e) => { setCurrentIdx(Number(e.target.value)); setIsPlaying(false); }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        {/* Tick marks */}
        <div className="flex justify-between mt-1">
          {hours.filter((_, i) => i % 3 === 0).map((h) => (
            <span key={h} className="text-[8px] text-muted-foreground">{h}</span>
          ))}
        </div>
      </div>

      {/* Speed and status */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSpeed((p) => p >= 4 ? 1 : p * 2)}
          className="px-2 py-1 rounded text-[10px] font-mono font-bold text-muted-foreground border border-border hover:text-foreground hover:border-primary/30 transition-colors"
          title="Playback speed"
        >
          {speed}x
        </button>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">Scrub</span></span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-success/15 text-status-success text-xs font-medium">
          <MapPin className="w-3 h-3" /> GPS
        </span>
      </div>
    </div>
  );
};

export default PlaybackBar;
