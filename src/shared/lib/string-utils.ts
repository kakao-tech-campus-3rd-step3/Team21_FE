export function toNumberOrUndef(s: string | undefined): number | undefined {
  if (typeof s !== "string") return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

export function toUndefIfEmpty(s: string | undefined): string | undefined {
  if (typeof s !== "string") return undefined;
  const t = s.trim();
  return t.length ? t : undefined;
}
