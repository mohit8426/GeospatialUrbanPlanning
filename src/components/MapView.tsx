import { useEffect, useRef, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapStyleId = "dark-vector" | "satellite" | "technical" | "terrain";

export interface MapLayer {
  id: string;
  label: string;
  enabled: boolean;
}

const TILE_STYLES: Record<MapStyleId, { tiles: string[]; attribution: string }> = {
  "dark-vector": {
    tiles: [
      "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
    ],
    attribution: '&copy; OSM &copy; CARTO',
  },
  satellite: {
    tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
    attribution: '&copy; Esri',
  },
  technical: {
    tiles: [
      "https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
      "https://b.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
    ],
    attribution: '&copy; OSM &copy; CARTO',
  },
  terrain: {
    tiles: ["https://a.tile.opentopomap.org/{z}/{x}/{y}.png"],
    attribution: '&copy; OpenTopoMap',
  },
};

interface DistrictMarker {
  name: string;
  coords: [number, number];
  congestion: number;
  population: number;
  density: number;
  greenCoverage: number;
}

const districts: DistrictMarker[] = [
  { name: "Central District 01", coords: [-73.985, 40.748], congestion: 42.8, population: 184200, density: 18400, greenCoverage: 12 },
  { name: "Westfield Heights", coords: [-74.005, 40.735], congestion: 28.4, population: 96500, density: 8200, greenCoverage: 24 },
  { name: "Harbor Industrial", coords: [-74.015, 40.710], congestion: 56.2, population: 34800, density: 4100, greenCoverage: 6 },
  { name: "Northgate Commons", coords: [-73.960, 40.765], congestion: 35.1, population: 128900, density: 12300, greenCoverage: 18 },
  { name: "Riverside Park", coords: [-73.975, 40.780], congestion: 19.6, population: 72400, density: 6800, greenCoverage: 35 },
  { name: "Tech Corridor", coords: [-73.955, 40.755], congestion: 38.7, population: 58200, density: 9400, greenCoverage: 15 },
  { name: "Old Town Quarter", coords: [-73.970, 40.725], congestion: 48.3, population: 42100, density: 15600, greenCoverage: 8 },
  { name: "Southfield Gardens", coords: [-73.990, 40.715], congestion: 22.1, population: 89700, density: 7200, greenCoverage: 28 },
];

interface Props {
  mapStyle: MapStyleId;
  layers: MapLayer[];
  searchQuery: string;
  onDistrictSelect: (name: string) => void;
}

const MapView = ({ mapStyle, layers, searchQuery, onDistrictSelect }: Props) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ marker: maplibregl.Marker; district: DistrictMarker; type: string }[]>([]);

  const getLayerEnabled = useCallback((id: string) => layers.find((l) => l.id === id)?.enabled ?? false, [layers]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const tileConfig = TILE_STYLES[mapStyle];
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "base-tiles": { type: "raster", tiles: tileConfig.tiles, tileSize: 256, attribution: tileConfig.attribution },
        },
        layers: [{ id: "base-layer", type: "raster", source: "base-tiles", minzoom: 0, maxzoom: 19 }],
      },
      center: [-73.985, 40.748],
      zoom: 12,
      pitch: 45,
      bearing: -17.6,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new maplibregl.ScaleControl(), "bottom-left");
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map style
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const tileConfig = TILE_STYLES[mapStyle];
    const source = map.getSource("base-tiles") as maplibregl.RasterTileSource | undefined;
    if (source) {
      // MapLibre doesn't support setTiles directly on RasterTileSource, so we recreate
      map.removeLayer("base-layer");
      map.removeSource("base-tiles");
      map.addSource("base-tiles", { type: "raster", tiles: tileConfig.tiles, tileSize: 256, attribution: tileConfig.attribution });
      map.addLayer({ id: "base-layer", type: "raster", source: "base-tiles", minzoom: 0, maxzoom: 19 });
    }
  }, [mapStyle]);

  // Manage markers based on layers and search
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.marker.remove());
    markersRef.current = [];

    const trafficEnabled = getLayerEnabled("traffic");
    const populationEnabled = getLayerEnabled("population");
    const zoningEnabled = getLayerEnabled("zoning");

    const filteredDistricts = searchQuery
      ? districts.filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : districts;

    filteredDistricts.forEach((d) => {
      // Traffic markers
      if (trafficEnabled) {
        const el = document.createElement("div");
        const color = d.congestion > 45 ? "hsl(0,72%,51%)" : d.congestion > 30 ? "hsl(38,92%,50%)" : "hsl(152,69%,45%)";
        el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.3);box-shadow:0 0 12px ${color.replace(")", ",0.5)")};cursor:pointer;transition:transform 0.2s;`;
        el.onmouseenter = () => { el.style.transform = "scale(1.4)"; };
        el.onmouseleave = () => { el.style.transform = "scale(1)"; };
        el.onclick = () => onDistrictSelect(d.name);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(d.coords)
          .setPopup(new maplibregl.Popup({ offset: 15 }).setHTML(
            `<div style="background:hsl(220,18%,10%);color:hsl(210,20%,92%);padding:12px 16px;border-radius:10px;font-family:Inter,sans-serif;min-width:180px;">
              <p style="font-size:13px;font-weight:600;margin:0 0 6px">${d.name}</p>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:10px;color:hsl(215,15%,50%)">Congestion</span><span style="font-size:12px;font-weight:600;color:${color}">${d.congestion}%</span></div>
              <div style="height:3px;background:hsl(220,16%,16%);border-radius:2px;overflow:hidden"><div style="height:100%;width:${d.congestion}%;background:${color};border-radius:2px"></div></div>
            </div>`
          ))
          .addTo(map);
        markersRef.current.push({ marker, district: d, type: "traffic" });
      }

      // Population markers
      if (populationEnabled) {
        const el = document.createElement("div");
        const size = Math.max(16, Math.min(40, d.density / 500));
        el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:hsl(210,100%,56%,0.25);border:1.5px solid hsl(210,100%,56%,0.5);cursor:pointer;transition:transform 0.2s;display:flex;align-items:center;justify-content:center;`;
        el.innerHTML = `<span style="font-size:8px;color:hsl(210,100%,56%);font-weight:600;font-family:monospace">${(d.population / 1000).toFixed(0)}k</span>`;
        el.onclick = () => onDistrictSelect(d.name);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([d.coords[0] + 0.002, d.coords[1] + 0.002])
          .setPopup(new maplibregl.Popup({ offset: 15 }).setHTML(
            `<div style="background:hsl(220,18%,10%);color:hsl(210,20%,92%);padding:12px 16px;border-radius:10px;font-family:Inter,sans-serif;min-width:180px;">
              <p style="font-size:13px;font-weight:600;margin:0 0 6px">${d.name}</p>
              <div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:10px;color:hsl(215,15%,50%)">Population</span><span style="font-size:12px;font-weight:600">${d.population.toLocaleString()}</span></div>
              <div style="display:flex;justify-content:space-between"><span style="font-size:10px;color:hsl(215,15%,50%)">Density</span><span style="font-size:12px;font-weight:600">${d.density.toLocaleString()}/km²</span></div>
            </div>`
          ))
          .addTo(map);
        markersRef.current.push({ marker, district: d, type: "population" });
      }

      // Zoning markers
      if (zoningEnabled) {
        const el = document.createElement("div");
        el.style.cssText = `width:18px;height:18px;border-radius:3px;background:hsl(25,95%,53%,0.3);border:1.5px solid hsl(25,95%,53%,0.6);cursor:pointer;transition:transform 0.2s;display:flex;align-items:center;justify-content:center;`;
        el.innerHTML = `<span style="font-size:8px;color:hsl(25,95%,53%);font-weight:700">Z</span>`;
        el.onclick = () => onDistrictSelect(d.name);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([d.coords[0] - 0.002, d.coords[1] - 0.002])
          .setPopup(new maplibregl.Popup({ offset: 15 }).setHTML(
            `<div style="background:hsl(220,18%,10%);color:hsl(210,20%,92%);padding:12px 16px;border-radius:10px;font-family:Inter,sans-serif;min-width:180px;">
              <p style="font-size:13px;font-weight:600;margin:0 0 6px">${d.name}</p>
              <div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:10px;color:hsl(215,15%,50%)">Green Coverage</span><span style="font-size:12px;font-weight:600;color:hsl(152,69%,45%)">${d.greenCoverage}%</span></div>
            </div>`
          ))
          .addTo(map);
        markersRef.current.push({ marker, district: d, type: "zoning" });
      }
    });

    // Fly to searched district
    if (searchQuery && filteredDistricts.length === 1) {
      map.flyTo({ center: filteredDistricts[0].coords, zoom: 14, duration: 1500 });
    }
  }, [layers, searchQuery, getLayerEnabled, onDistrictSelect]);

  return <div ref={mapContainer} className="absolute inset-0 z-0" />;
};

export default MapView;
