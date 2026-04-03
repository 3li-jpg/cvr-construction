import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const themeInitScript = `
  (() => {
    try {
      const storedTheme = window.localStorage.getItem("theme");
      const isDark = storedTheme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    } catch {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cvrconstruction.ca"),
  title: {
    default: "CVR Construction | Premium Construction Company in Victoria, BC",
    template: "%s | CVR Construction",
  },
  description:
    "CVR Construction is a Victoria, BC construction company specializing in premium home renovations, kitchen and bathroom remodels, custom spaces, and detail-driven commercial upgrades across Greater Victoria and Vancouver Island.",
  keywords: [
    "CVR Construction",
    "construction company Victoria BC",
    "Victoria construction company",
    "Victoria renovation contractor",
    "premium renovations Victoria",
    "kitchen renovation Victoria BC",
    "bathroom renovation Victoria BC",
    "commercial renovations Victoria BC",
    "Vancouver Island construction company",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CVR Construction | Premium Construction Company in Victoria, BC",
    description:
      "Premium renovations, kitchens, bathrooms, custom spaces, and commercial upgrades delivered with clean execution across Victoria and Vancouver Island.",
    url: "https://www.cvrconstruction.ca",
    siteName: "CVR Construction",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/2024-01-13.webp",
        width: 1360,
        height: 765,
        alt: "CVR Construction custom garden studio project in Victoria BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVR Construction | Premium Construction Company in Victoria, BC",
    description:
      "Victoria, BC construction company for premium renovations, kitchens, bathrooms, custom spaces, and commercial upgrades.",
    images: ["/images/2024-01-13.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": "https://www.cvrconstruction.ca/#business",
  name: "CVR Construction Ltd.",
  alternateName: "CVR Construction",
  url: "https://www.cvrconstruction.ca",
  image: "https://www.cvrconstruction.ca/images/2024-01-13.webp",
  description:
    "CVR Construction is a Victoria, BC construction company specializing in premium renovations, kitchen and bathroom remodels, custom spaces, and commercial upgrades across Greater Victoria and Vancouver Island.",
  telephone: "+1-250-880-1270",
  email: "info@cvrconstruction.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Victoria",
    },
    {
      "@type": "AdministrativeArea",
      name: "Vancouver Island",
    },
  ],
  sameAs: [
    "https://www.instagram.com/cvr_construction_ltd/",
    "https://www.facebook.com/profile.php?id=61552800609732",
    "https://wa.me/12508801270",
    "https://maps.app.goo.gl/WpiNvvknAfY1fdir6",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction and Renovation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Whole-Home Renovations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kitchen Renovations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bathroom Renovations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Renovations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Garden Studios and Custom Spaces",
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+1-250-880-1270",
    email: "info@cvrconstruction.ca",
    areaServed: "CA",
    availableLanguage: ["en"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          id="cvr-construction-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
