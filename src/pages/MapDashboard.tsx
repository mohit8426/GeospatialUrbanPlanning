import { useState, useCallback } from "react";
import TopNav from "@/components/TopNav";
import LeftToolbar from "@/components/LeftToolbar";
import LayerControlPanel from "@/components/LayerControlPanel";
import CongestionPanel from "@/components/CongestionPanel";
import DensityPanel from "@/components/DensityPanel";
import ScaleLegend from "@/components/ScaleLegend";
import PlaybackBar from "@/components/PlaybackBar";
import TrafficCongestionPanel from "@/components/TrafficCongestionPanel";
import MapView from "@/components/MapView";
import type { MapStyleId, MapLayer } from "@/components/MapView";
import { districts as districtData } from "@/data/urbanData";

const MapDashboard = () => {
  const [trafficPanelOpen, setTrafficPanelOpen] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const [mapStyle, setMapStyle] = useState<MapStyleId>("dark-vector");
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: "traffic", label: "Traffic Congestion", enabled: true },
    { id: "population", label: "Population Density", enabled: false },
    { id: "zoning", label: "Zoning & Land Use", enabled: false },
  ]);

  const toggleLayer = useCallback((id: string) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)));
  }, []);

  const handleDistrictSelect = useCallback((name: string) => {
    setSelectedDistrict(name);
  }, []);

  // Get selected district's congestion for the panel
  const selected = districtData.find((d) => d.name === selectedDistrict);
  const congestionValue = selected ? selected.congestionScore : 42.8;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <TopNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Real interactive map */}
      <MapView
        mapStyle={mapStyle}
        layers={layers}
        searchQuery={searchQuery}
        onDistrictSelect={handleDistrictSelect}
      />

      {/* Map overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/10" />
        <div className="absolute top-20 left-20 w-8 h-8 border-l-2 border-t-2 border-muted-foreground/20" />
        <div className="absolute top-20 right-4 w-8 h-8 border-r-2 border-t-2 border-muted-foreground/20" />
        <div className="absolute bottom-20 left-20 w-8 h-8 border-l-2 border-b-2 border-muted-foreground/20" />
        <div className="absolute bottom-20 right-4 w-8 h-8 border-r-2 border-b-2 border-muted-foreground/20" />
      </div>

      {/* Left Toolbar */}
      <LeftToolbar onToggleLayerPanel={() => setShowLayerPanel((p) => !p)} showLayerPanel={showLayerPanel} />

      {/* Layer Control - left side */}
      {showLayerPanel && (
        <div className="absolute top-20 left-20 z-30">
          <LayerControlPanel
            layers={layers}
            onToggleLayer={toggleLayer}
            mapStyle={mapStyle}
            onChangeMapStyle={setMapStyle}
          />
        </div>
      )}

      {/* Selected district info */}
      {selectedDistrict && selected && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 glass-panel-strong p-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <div>
              <p className="label-caps mb-0.5">Selected District</p>
              <p className="text-sm font-semibold text-foreground">{selected.name}</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Population</p>
              <p className="font-mono text-sm font-bold text-foreground">{selected.population.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Congestion</p>
              <p className={`font-mono text-sm font-bold ${selected.congestionScore > 45 ? "text-status-critical" : selected.congestionScore > 30 ? "text-status-warning" : "text-status-success"}`}>{selected.congestionScore}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Green</p>
              <p className="font-mono text-sm font-bold text-status-success">{selected.greenCoverage}%</p>
            </div>
            <button onClick={() => setSelectedDistrict(null)} className="ml-2 p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground">✕</button>
          </div>
        </div>
      )}

      {/* Right panels */}
      <div className="absolute top-20 right-4 z-30 flex flex-col gap-3">
        <CongestionPanel value={congestionValue} />
        <DensityPanel />
        <ScaleLegend />
      </div>

      {/* Bottom playback bar */}
      {!trafficPanelOpen && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[720px] max-w-[90vw]">
          <PlaybackBar />
        </div>
      )}

      {/* Traffic Congestion Detail Panel */}
      <TrafficCongestionPanel
        isOpen={trafficPanelOpen}
        onToggle={() => setTrafficPanelOpen((p) => !p)}
      />
    </div>
  );
};

export default MapDashboard;
