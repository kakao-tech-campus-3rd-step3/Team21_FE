import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import type { Crumb } from "@/features/nav-trail/model/crumb";

type Ctx = {
  crumbs: Crumb[]; // Home 제외, 이후 항목만
  setTrail: (next: Crumb[]) => void; // 전체 교체
  patchTrail: (updater: (prev: Crumb[]) => Crumb[]) => void; // 부분 갱신
};

const BreadcrumbContext = createContext<Ctx | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);

  useEffect(() => {
    setCrumbs([]);
  }, [location.key]);

  const value = useMemo<Ctx>(
    () => ({
      crumbs,
      setTrail: (next) => setCrumbs(next),
      patchTrail: (fn) => setCrumbs((prev) => fn(prev)),
    }),
    [crumbs],
  );

  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>;
}

export function useBreadcrumbContext(): Ctx {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error("BreadcrumbContext not found. Wrap with <BreadcrumbProvider/>.");
  return ctx;
}

/**
 * 페이지 상단에서 호출: Trail을 세팅하고, deps 변할 때마다 업데이트
 * - 절대 조건부로 호출하지 말 것
 */
export function useBreadcrumbTrail(trail: Crumb[]) {
  const { setTrail } = useBreadcrumbContext();

  useEffect(() => {
    setTrail(trail);
  }, [setTrail, trail]);
}
