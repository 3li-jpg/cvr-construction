import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WebMCPRegistrar } from "@/components/WebMCPRegistrar";
import { faqItems } from "@/lib/faq-data";
import { businessContact, services } from "@/lib/site-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["italic"],
  display: "swap",
});

const themeInitScript = `
  (() => {
    try {
      const storedTheme = window.localStorage.getItem("theme");
      const isDark = storedTheme !== "light";
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    } catch {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cvrconstruction.ca"),
  title: {
    default: "CVR Construction — Kitchen, Bath & Home Remodeling | Victoria BC",
    template: "%s | CVR Construction",
  },
  description:
    "Premier bathroom renovation, kitchen remodeling, and full home remodeling contractor in Victoria, BC. 20+ years experience, licensed & insured. Visit our kitchen & bath showroom.",
  keywords: [
    "CVR Construction",
    "bathroom renovation Victoria BC",
    "kitchen remodeling Victoria",
    "home remodeling Victoria",
    "contractor Victoria BC",
    "kitchen and bath showroom Victoria",
    "construction company Victoria BC",
    "Victoria renovation contractor",
    "premium renovations Victoria",
    "commercial renovations Victoria BC",
    "Vancouver Island construction company",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "rWHfeQE_HjxgAXavOC3ikn617ngYRyqWEjFdp1rV7ck",
  },
  openGraph: {
    title: "CVR Construction — Kitchen, Bath & Home Remodeling | Victoria BC",
    description:
      "Premier bathroom renovation, kitchen remodeling, and home remodeling contractor in Victoria, BC. 20+ years experience, licensed & insured. Kitchen & bath showroom now open.",
    url: "https://www.cvrconstruction.ca",
    siteName: "CVR Construction",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/victoria-garden-studio-exterior.webp",
        width: 1360,
        height: 765,
        alt: "CVR Construction custom garden studio project in Victoria BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVR Construction — Kitchen, Bath & Home Remodeling | Victoria BC",
    description:
      "Victoria, BC contractor for bathroom renovation, kitchen remodeling, home remodeling, and custom spaces. Visit our showroom.",
    images: ["/images/victoria-garden-studio-exterior.webp"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a09" },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": "https://www.cvrconstruction.ca/#business",
  name: "CVR Construction Ltd.",
  alternateName: "CVR Construction",
  url: "https://www.cvrconstruction.ca",
  image: "https://www.cvrconstruction.ca/images/victoria-garden-studio-exterior.webp",
  description:
    "CVR Construction is a Victoria, BC construction company specializing in premium renovations, kitchen and bathroom remodels, custom spaces, and commercial upgrades across Greater Victoria and Vancouver Island.",
  telephone: "+1-250-880-1270",
  email: businessContact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessContact.addressLine1,
    addressLocality: "Victoria",
    addressRegion: "BC",
    postalCode: "V8T 2V3",
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
    businessContact.whatsapp,
    businessContact.mapsHref,
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction and Renovation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Home Remodeling",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kitchen Renovation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bathroom Remodeling",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Upgrades",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Spaces",
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+1-250-880-1270",
    email: businessContact.email,
    areaServed: "CA",
    availableLanguage: ["en"],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": "https://www.cvrconstruction.ca/#website",
  url: "https://www.cvrconstruction.ca",
  name: "CVR Construction",
  publisher: {
    "@id": "https://www.cvrconstruction.ca/#business",
  },
  inLanguage: "en-CA",
};

const serviceSchemas = services.map((service) => ({
  "@type": "Service",
  "@id": `https://www.cvrconstruction.ca/#service-${service.num}`,
  name: service.title,
  description: service.desc,
  provider: {
    "@id": "https://www.cvrconstruction.ca/#business",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Victoria",
    },
    {
      "@type": "AdministrativeArea",
      name: "Greater Victoria",
    },
    {
      "@type": "AdministrativeArea",
      name: "Vancouver Island",
    },
  ],
  image: `https://www.cvrconstruction.ca${service.previewImage}`,
}));

const faqPageSchema = {
  "@type": "FAQPage",
  "@id": "https://www.cvrconstruction.ca/#faq",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.content,
    },
  })),
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema, websiteSchema, ...serviceSchemas, faqPageSchema],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[200] rounded-none bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-black dark:text-white dark:focus:ring-white dark:focus:ring-offset-black"
        >
          Skip to main content
        </a>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          id="cvr-construction-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <AnalyticsTracker />
        <WebMCPRegistrar />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
