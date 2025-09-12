import type { BuildArgs, Crumb } from "@/features/nav-trail/model/crumb";

export function buildCrumbs(a: BuildArgs): Crumb[] {
  const items: Crumb[] = [];
  if (a.univ) items.push({ label: a.univ.name, href: `/university/${a.univ.id}` });
  if (a.college) items.push({ label: a.college.name, href: `/college/${a.college.id}` });
  if (a.dept) items.push({ label: a.dept.name, href: `/department/${a.dept.id}` });
  if (a.prof) items.push({ label: a.prof.name });
  return items;
}
