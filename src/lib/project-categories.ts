import { projectCategories, type ProjectCategory, type ProjectEntry } from "@/lib/site-data";

export function isProjectCategory(value: string | null | undefined): value is ProjectCategory {
  return projectCategories.some((category) => category.id === value);
}

const categoryFilters: Record<string, readonly ProjectCategory[]> = {
  "Kitchen Renovation": ["kitchen", "finishes"],
  "Bathroom Renovation": ["bathroom", "finishes"],
  "Kitchen & Bathroom Renovation": ["finishes"],
  "Custom Space": ["custom-spaces"],
  "Garage Conversion": ["garage", "custom-spaces"],
  "Exterior Upgrade": ["exterior"],
  "Commercial Upgrade": ["commercial"],
  "Full Home Remodeling": ["full-home"],
};

// A combined job stays intact in All Projects. Room filters use only its matching section.
export function getProjectView(project: ProjectEntry, filter?: ProjectCategory): ProjectEntry | null {
  if (!filter) return project;
  const section = project.sections?.find((section) => section.filter === filter);
  if (section) return { ...project, ...section, sections: undefined };
  if (project.sections?.some((section) => section.filter === "kitchen" || section.filter === "bathroom") &&
      (filter === "kitchen" || filter === "bathroom")) return null;
  return categoryFilters[project.category]?.includes(filter) ? project : null;
}

export function getGalleryCategory(item: { image: string; category: string }): ProjectCategory {
  if (item.image.includes("condo-kitchen-and-marble-baths")) {
    return item.image.includes("-006.") ? "bathroom" : "kitchen";
  }
  if (item.category.includes("Kitchen")) return "kitchen";
  if (item.category.includes("Bathroom")) return "bathroom";
  if (item.category === "Commercial") return "commercial";
  if (item.category === "Garage") return "garage";
  if (item.category === "Exterior") return "exterior";
  if (item.category === "Interior") return "full-home";
  return "custom-spaces";
}
