import type { MetadataRoute } from "next";
import { journalPosts, projects } from "@/lib/site-data";

const baseUrl = "https://www.cvrconstruction.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestProjectUpdate = projects.reduce(
    (latest, project) =>
      Date.parse(project.updatedAt) > latest ? Date.parse(project.updatedAt) : latest,
    0
  );
  const latestJournalUpdate = journalPosts.reduce(
    (latest, post) =>
      Date.parse(post.publishedAt) > latest ? Date.parse(post.publishedAt) : latest,
    0
  );
  const latestSiteUpdate = new Date(
    Math.max(latestProjectUpdate, latestJournalUpdate)
  );
  const staticRouteDates: Record<string, Date> = {
    "": latestSiteUpdate,
    "/about": latestSiteUpdate,
    "/projects": latestProjectUpdate ? new Date(latestProjectUpdate) : latestSiteUpdate,
    "/journals": latestJournalUpdate ? new Date(latestJournalUpdate) : latestSiteUpdate,
    "/gallery": latestProjectUpdate ? new Date(latestProjectUpdate) : latestSiteUpdate,
    "/contact": latestSiteUpdate,
  };

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/journals",
    "/gallery",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: staticRouteDates[path],
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journalRoutes = journalPosts.map((post) => ({
    url: `${baseUrl}/journals/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...journalRoutes];
}
