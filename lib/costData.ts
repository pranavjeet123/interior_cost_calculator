export type UnitType = "per_sqft" | "per_piece";

export interface CostItem {
  id: number;
  name: string;
  unit: UnitType;
  cost: number;
}

export const DEFAULT_COST_DATA: CostItem[] = [
  { id: 1, name: "Partition", unit: "per_sqft", cost: 190 },
  { id: 2, name: "Panelling", unit: "per_sqft", cost: 150 },
  { id: 3, name: "Box Panelling", unit: "per_sqft", cost: 170 },
  { id: 4, name: "Laminate Door", unit: "per_piece", cost: 3000 },
  { id: 5, name: "Veneer Door", unit: "per_piece", cost: 3500 },
  { id: 6, name: "Modular Kitchen (Non Acrylic)", unit: "per_sqft", cost: 1800 },
  { id: 7, name: "Modular Kitchen (Acrylic)", unit: "per_sqft", cost: 2500 },
  { id: 8, name: "Ultra Modular Kitchen", unit: "per_sqft", cost: 3200 },
  { id: 9, name: "Bed with Side Table", unit: "per_piece", cost: 25000 },
  { id: 10, name: "Bed Back Drop", unit: "per_sqft", cost: 220 },
  { id: 11, name: "Hall Design Pergola", unit: "per_sqft", cost: 260 },
  { id: 12, name: "Open Rack", unit: "per_sqft", cost: 240 },
  { id: 13, name: "Partition Wall Design", unit: "per_sqft", cost: 240 },
  { id: 14, name: "TV Unit", unit: "per_sqft", cost: 1000 },
  { id: 15, name: "Counter Table", unit: "per_sqft", cost: 270 },
  { id: 16, name: "Counter Table Design", unit: "per_sqft", cost: 300 },
  { id: 17, name: "Wardrobe (Non Acrylic)", unit: "per_sqft", cost: 1000 },
  { id: 18, name: "Wardrobe with Acrylic", unit: "per_sqft", cost: 1500 },
  { id: 19, name: "Ultra Luxury Wardrobe with Profile Glass", unit: "per_sqft", cost: 3300 },
  { id: 20, name: "Dressing Table", unit: "per_sqft", cost: 250 },
  { id: 21, name: "Ply Ceiling", unit: "per_sqft", cost: 285 },
  { id: 22, name: "Lower Ceiling", unit: "per_sqft", cost: 90 },
  { id: 23, name: "POP Ceiling", unit: "per_sqft", cost: 40 },
  { id: 24, name: "POP Ceiling with Material", unit: "per_sqft", cost: 100 },
  { id: 25, name: "Glass Fitting", unit: "per_sqft", cost: 70 },
];

export const STORAGE_KEY = "pranav_interior_costs";

export function loadCostData(): CostItem[] {
  if (typeof window === "undefined") return DEFAULT_COST_DATA;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_COST_DATA;
}

export function saveCostData(data: CostItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
