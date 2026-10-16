"use client";

import Link from "next/link";
import { projectCategories, type ProjectCategory } from "@/lib/site-data";

export function ProjectCategoryNav({ selected, basePath = "/projects", populatedCategories }: {
  selected?: ProjectCategory;
  basePath?: string;
  populatedCategories: readonly ProjectCategory[];
}) {
  const populated = new Set(populatedCategories);
  const orderedCategories = [
    ...projectCategories.filter((category) => populated.has(category.id)),
    ...projectCategories.filter((category) => !populated.has(category.id)),
  ];
  return (
    <nav aria-label="Filter by service" className="mb-10 flex flex-wrap gap-2 border-b border-border pb-6">
      {[{ id: undefined, label: "All" }, ...orderedCategories].map((category) => (
        <Link
          key={category.id ?? "all"}
          href={category.id ? `${basePath}?category=${category.id}#${basePath === "/gallery" ? "gallery" : "projects"}` : `${basePath}#${basePath === "/gallery" ? "gallery" : "projects"}`}
          aria-current={selected === category.id ? "page" : undefined}
          className={`inline-flex min-h-11 items-center border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === category.id ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:bg-muted"}`}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  );
}
