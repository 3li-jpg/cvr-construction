import type { Metadata } from "next";
import { ShowroomPage } from "@/components/ShowroomPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Victoria Showroom",
  description:
    "Visit the CVR Showroom at 1057 Fort St, Victoria, BC to compare in-person kitchen and bath product selections across Kohler, Moen, Grohe, Delta, Glacier Bay, Rainlex, American Standard, Pfister, and MAAX.",
  path: "/showroom",
  image: "/images/victoria-premium-kitchen-interior.webp",
  imageAlt: "CVR Showroom in-person product selection page preview image",
});

export default function ShowroomRoute() {
  return <ShowroomPage />;
}
