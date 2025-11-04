import type { Crumb } from "@/features/nav-trail/model/crumb";
import { ROUTES } from "@/shared/config/routes";

/** 대학 상세 */
export function univCrumb(name?: string, id?: string | number): Crumb {
  return { label: name ?? "대학교", href: id != null ? ROUTES.UNIVERSITY_DETAIL(id) : undefined };
}

/** 단과대학 상세 */
export function collegeCrumb(name?: string, id?: string | number): Crumb {
  return { label: name ?? "단과대학", href: id != null ? ROUTES.COLLEGE_DETAIL(id) : undefined };
}

/** 학과 상세 */
export function deptCrumb(name?: string, id?: string | number): Crumb {
  return { label: name ?? "학과", href: id != null ? ROUTES.DEPARTMENT_DETAIL(id) : undefined };
}

/** 교수 상세 (마지막은 링크 없이 현재 페이지 표시) */
export function profCrumb(name?: string): Crumb {
  return { label: name ? `${name} 교수` : "교수", href: undefined };
}
