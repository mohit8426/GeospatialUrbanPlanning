export interface District {
  id: string;
  name: string;
  population: number;
  density: number;
  congestionScore: number;
  infrastructureScore: number;
  greenCoverage: number;
  growthRate: number;
  landUse: { residential: number; commercial: number; industrial: number; green: number; mixed: number };
  transitAccess: number;
  livabilityScore: number;
}

export const districts: District[] = [
  { id: "d1", name: "Central District 01", population: 184200, density: 18400, congestionScore: 42.8, infrastructureScore: 87, greenCoverage: 12, growthRate: 1.2, landUse: { residential: 30, commercial: 35, industrial: 5, green: 12, mixed: 18 }, transitAccess: 94, livabilityScore: 78 },
  { id: "d2", name: "Westfield Heights", population: 96500, density: 8200, congestionScore: 28.4, infrastructureScore: 72, greenCoverage: 24, growthRate: 2.8, landUse: { residential: 55, commercial: 15, industrial: 8, green: 14, mixed: 8 }, transitAccess: 68, livabilityScore: 82 },
  { id: "d3", name: "Harbor Industrial", population: 34800, density: 4100, congestionScore: 56.2, infrastructureScore: 64, greenCoverage: 6, growthRate: 0.4, landUse: { residential: 10, commercial: 12, industrial: 62, green: 6, mixed: 10 }, transitAccess: 45, livabilityScore: 52 },
  { id: "d4", name: "Northgate Commons", population: 128900, density: 12300, congestionScore: 35.1, infrastructureScore: 81, greenCoverage: 18, growthRate: 1.8, landUse: { residential: 45, commercial: 20, industrial: 5, green: 18, mixed: 12 }, transitAccess: 82, livabilityScore: 85 },
  { id: "d5", name: "Riverside Park", population: 72400, density: 6800, congestionScore: 19.6, infrastructureScore: 76, greenCoverage: 35, growthRate: 3.2, landUse: { residential: 40, commercial: 10, industrial: 2, green: 35, mixed: 13 }, transitAccess: 71, livabilityScore: 91 },
  { id: "d6", name: "Tech Corridor", population: 58200, density: 9400, congestionScore: 38.7, infrastructureScore: 92, greenCoverage: 15, growthRate: 5.1, landUse: { residential: 20, commercial: 45, industrial: 10, green: 15, mixed: 10 }, transitAccess: 88, livabilityScore: 74 },
  { id: "d7", name: "Old Town Quarter", population: 42100, density: 15600, congestionScore: 48.3, infrastructureScore: 58, greenCoverage: 8, growthRate: -0.3, landUse: { residential: 50, commercial: 25, industrial: 3, green: 8, mixed: 14 }, transitAccess: 79, livabilityScore: 68 },
  { id: "d8", name: "Southfield Gardens", population: 89700, density: 7200, congestionScore: 22.1, infrastructureScore: 83, greenCoverage: 28, growthRate: 2.1, landUse: { residential: 48, commercial: 12, industrial: 4, green: 28, mixed: 8 }, transitAccess: 74, livabilityScore: 88 },
];

export const trafficTimeline = [
  { hour: "00:00", volume: 1200, speed: 58, congestion: 8 },
  { hour: "02:00", volume: 800, speed: 62, congestion: 5 },
  { hour: "04:00", volume: 950, speed: 60, congestion: 6 },
  { hour: "06:00", volume: 4200, speed: 42, congestion: 28 },
  { hour: "08:00", volume: 8900, speed: 24, congestion: 62 },
  { hour: "10:00", volume: 6100, speed: 35, congestion: 42 },
  { hour: "12:00", volume: 7200, speed: 30, congestion: 48 },
  { hour: "14:00", volume: 5800, speed: 38, congestion: 38 },
  { hour: "16:00", volume: 7600, speed: 28, congestion: 54 },
  { hour: "18:00", volume: 9200, speed: 22, congestion: 68 },
  { hour: "20:00", volume: 5400, speed: 40, congestion: 32 },
  { hour: "22:00", volume: 2800, speed: 52, congestion: 15 },
];

export const populationTrend = [
  { year: 2018, population: 1.82, density: 8400, growth: 1.4 },
  { year: 2019, population: 1.86, density: 8600, growth: 2.2 },
  { year: 2020, population: 1.84, density: 8500, growth: -1.1 },
  { year: 2021, population: 1.88, density: 8700, growth: 2.2 },
  { year: 2022, population: 1.94, density: 9000, growth: 3.2 },
  { year: 2023, population: 2.01, density: 9300, growth: 3.6 },
  { year: 2024, population: 2.08, density: 9600, growth: 3.5 },
  { year: 2025, population: 2.14, density: 9900, growth: 2.9 },
];

export const forecastData = [
  { year: 2025, congestion: 42.8, population: 2.14, projected: true },
  { year: 2027, congestion: 48.2, population: 2.28, projected: true },
  { year: 2029, congestion: 55.1, population: 2.41, projected: true },
  { year: 2031, congestion: 62.8, population: 2.56, projected: true },
  { year: 2033, congestion: 68.4, population: 2.69, projected: true },
  { year: 2035, congestion: 72.1, population: 2.82, projected: true },
  { year: 2037, congestion: 74.6, population: 2.93, projected: true },
  { year: 2040, congestion: 78.4, population: 3.12, projected: true },
];

export const infrastructureMetrics = [
  { name: "Hospitals", count: 24, coverage: 87, status: "adequate" },
  { name: "Schools", count: 142, coverage: 92, status: "adequate" },
  { name: "Transit Stations", count: 86, coverage: 74, status: "expanding" },
  { name: "Parks", count: 58, coverage: 68, status: "below-target" },
  { name: "Fire Stations", count: 18, coverage: 91, status: "adequate" },
  { name: "Police Stations", count: 12, coverage: 82, status: "adequate" },
];

export const systemMetrics = {
  activeThreads: 1024,
  latency: 12,
  syncConsistency: 99.8,
  computeLoad: 24.5,
  streamLatency: 12,
};
