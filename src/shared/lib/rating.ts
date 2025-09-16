export type StarCounts = { full: number; half: number; empty: number };

export function calcStarCounts(rating: number, max = 5, allowHalf = false): StarCounts {
  const safe = Math.max(0, Math.min(rating, max));

  if (!allowHalf) {
    const full = Math.floor(safe);
    return { full, half: 0, empty: max - full };
  }

  const full = Math.floor(safe);
  const remainder = safe - full;
  const half = remainder >= 0.25 && remainder < 0.75 ? 1 : 0;
  const fullAdj = full + (remainder >= 0.75 ? 1 : 0);
  const empty = max - fullAdj - half;

  return { full: fullAdj, half, empty };
}
