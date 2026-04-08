import { useState } from "react";
import { Layers, Users, Grid3X3 } from "lucide-react";
import type { MapStyleId, MapLayer } from "./MapView";

interface Props {
  layers: MapLayer[];
  onToggleLayer: (id: string) => void;
  mapStyle: MapStyleId;
  onChangeMapStyle: (style: MapStyleId) => void;
}

const LayerControlPanel = ({ layers, onToggleLayer, mapStyle, onChangeMapStyle }: Props) => {
  const iconMap: Record<string, React.ElementType> = { traffic: Grid3X3, population: Users, zoning: Grid3X3 };

  const styles: { id: MapStyleId; label: string }[] = [
    { id: "dark-vector", label: "Dark Vector" },
    { id: "satellite", label: "Satellite" },
    { id: "technical", label: "Technical" },
    { id: "terrain", label: "Terrain" },
  ];

  return (
    <div className="glass-panel-strong p-5 w-72 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <Layers className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Layer Control</h3>
      </div>
      <p className="label-caps mb-4">Geospatial Overlays</p>

      <div className="space-y-1">
        {layers.map((layer) => {
          const Icon = iconMap[layer.id] || Grid3X3;
          return (
            <div
              key={layer.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                layer.enabled ? "bg-secondary/80" : "hover:bg-secondary/40"
              }`}
              onClick={() => onToggleLayer(layer.id)}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${layer.enabled ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm text-foreground">{layer.label}</span>
              </div>
              <button
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  layer.enabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${
                    layer.enabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <p className="label-caps mb-3">Map Rendering Style</p>
        <div className="grid grid-cols-2 gap-2">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => onChangeMapStyle(s.id)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                mapStyle === s.id
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-glass-border"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayerControlPanel;
