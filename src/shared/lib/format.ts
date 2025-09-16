export const formatNumber = (n?: number, fallback = "—"): string =>
  typeof n === "number" ? n.toLocaleString() : fallback;

export const formatCurrency = (n?: number, currency = "₩"): string =>
  typeof n === "number" ? `${n.toLocaleString()} ${currency}` : "—";
