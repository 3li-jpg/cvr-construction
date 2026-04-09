import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Learn how CVR Construction approaches premium renovations in Victoria, BC through clear planning, disciplined execution, and detail-driven craftsmanship.",
  path: "/about",
  image: "/images/victoria-bathroom-vanity-detail.webp",
  imageAlt: "Bathroom renovation detail by CVR Construction",
});

export default function AboutRoute() {
  return <AboutPage />;
}
