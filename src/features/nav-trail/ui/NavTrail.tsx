import { Fragment } from "react";
import { GoChevronRight, GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

import { cn } from "@/shared/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";

export type Crumb = { label: string; href?: string };

export default function NavTrail({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav className={cn("relative bg-transparent", className)} aria-label="Breadcrumb">
      <div className="w-full px-15 py-2">
        <Breadcrumb>
          <BreadcrumbList className="text-sm text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="inline-flex items-center gap-1 hover:text-primary">
                  <GoHomeFill className="h-4 w-4" /> 홈
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {items.map((it, i) => (
              <Fragment key={i}>
                <BreadcrumbSeparator className="text-muted-foreground/70">
                  <GoChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {it.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={it.href} className="hover:text-primary">
                        {it.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-foreground">{it.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
}
