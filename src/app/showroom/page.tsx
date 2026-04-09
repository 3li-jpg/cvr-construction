import type { Metadata } from "next";
import { ShowroomPage } from "@/components/ShowroomPage";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Showroom",
  description:
    "Visit the CVR Showroom in Victoria, BC to compare in-person product selections across Kohler, Moen, Pearl, Grohe, Delta, Glacier Bay, Rainlex, American Standard, Pfister, and MAAX.",
  path: "/showroom",
  image: "/images/victoria-premium-kitchen-interior.webp",
  imageAlt: "CVR Showroom in-person product selection page preview image",
});

export default function ShowroomRoute() {
  return <ShowroomPage />;
}
