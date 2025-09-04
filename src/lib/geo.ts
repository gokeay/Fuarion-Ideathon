export const TR_BOUNDS = {
  minLat: 36,
  maxLat: 42,
  minLon: 26,
  maxLon: 45
};

export const MARMARA_BOUNDS = {
  // Yaklaşık Marmara Bölgesi sınırları (basit bounding box)
  minLat: 39.5,
  maxLat: 42.2,
  minLon: 26.0,
  maxLon: 31.5
};

export type Bounds = typeof TR_BOUNDS;

export function project(
  [lat, lon]: [number, number],
  width = 800,
  height = 400
): [number, number] {
  const x = ((lon - TR_BOUNDS.minLon) / (TR_BOUNDS.maxLon - TR_BOUNDS.minLon)) * width;
  const y = height - ((lat - TR_BOUNDS.minLat) / (TR_BOUNDS.maxLat - TR_BOUNDS.minLat)) * height;
  return [x, y];
}

export function projectToBounds(
  [lat, lon]: [number, number],
  bounds: Bounds,
  width = 800,
  height = 400
): [number, number] {
  const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * width;
  const y = height - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * height;
  return [x, y];
}

export function isInBounds([lat, lon]: [number, number], bounds: Bounds): boolean {
  return (
    lat >= bounds.minLat && lat <= bounds.maxLat &&
    lon >= bounds.minLon && lon <= bounds.maxLon
  );
}
