export {
  collegeCrumb,
  deptCrumb,
  profCrumb,
  univCrumb,
} from "@/features/nav-trail/lib/buildCrumbs";
export {
  BreadcrumbProvider,
  useBreadcrumbTrail,
} from "@/features/nav-trail/model/BreadcrumbProvider";
export type { Crumb } from "@/features/nav-trail/model/crumb";
export { default as NavTrail } from "@/features/nav-trail/ui/NavTrail";
