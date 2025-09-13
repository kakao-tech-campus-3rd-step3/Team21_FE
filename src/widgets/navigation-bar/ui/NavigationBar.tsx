import { type Crumb, NavTrail } from "@/features/nav-trail";

export default function NavigationBar({ items = [] as Crumb[] }) {
  return <NavTrail items={items} />;
}
