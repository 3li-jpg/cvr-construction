export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journals", label: "Journals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export type ServiceEntry = {
  num: string;
  title: string;
  desc: string;
  previewImage: string;
  galleryImages: readonly string[];
};

export const services: ServiceEntry[] = [
  {
    num: "01",
    title: "Whole-Home Renovations",
    desc: "Premium home renovations in Victoria, BC with refined finishes, smarter layouts, and disciplined project delivery from demolition through completion.",
    previewImage: "/images/2024-01-13-1.webp",
    galleryImages: [
      "/images/2024-10-02.webp",
      "/images/2025-01-18.webp",
      "/images/2024-01-13-2.webp",
    ],
  },
  {
    num: "02",
    title: "Kitchen Renovations",
    desc: "Custom kitchen renovations designed around daily use, durable materials, efficient workflow, and a finish level that elevates the entire home.",
    previewImage: "/images/2024-01-13-2.webp",
    galleryImages: [
      "/images/2025-03-19.webp",
      "/images/2025-05-06.webp",
      "/images/2025-01-18.webp",
    ],
  },
  {
    num: "03",
    title: "Bathroom Renovations",
    desc: "Bathroom remodels with strong waterproofing discipline, clean tile execution, thoughtful lighting, and premium fixture integration.",
    previewImage: "/images/2025-06-09.webp",
    galleryImages: [
      "/images/2025-04-21.webp",
      "/images/2025-11-01.webp",
      "/images/2026-02-26.webp",
    ],
  },
  {
    num: "04",
    title: "Commercial Renovations",
    desc: "Commercial upgrades and interior improvements delivered with straightforward coordination, clean sites, and reliable schedule control.",
    previewImage: "/images/2024-10-02.webp",
    galleryImages: [
      "/images/2025-01-18.webp",
      "/images/2024-10-02.webp",
      "/images/2024-01-13-1.webp",
    ],
  },
  {
    num: "05",
    title: "Garden Studios & Custom Spaces",
    desc: "Compact custom builds, secondary spaces, and high-value additions that expand how a property works without sacrificing design quality.",
    previewImage: "/images/2024-01-13.webp",
    galleryImages: [
      "/images/2024-01-13.webp",
      "/images/2024-01-24.webp",
      "/images/2024-01-24-2.webp",
    ],
  },
];

export type ProcessStep = {
  num: string;
  title: string;
  desc: string;
  image: string;
};

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Consult & Site Review",
    desc: "We start by understanding your goals, the space, the investment range, and the level of finish you want. That early clarity keeps the project grounded and realistic from day one.",
    image: "/images/2024-01-24.webp",
  },
  {
    num: "02",
    title: "Scope & Pricing",
    desc: "We define the work, outline the sequencing, and build a quote structure that makes expectations clear. Materials, assumptions, and priorities are aligned before construction begins.",
    image: "/images/2025-03-19.webp",
  },
  {
    num: "03",
    title: "Build & Coordinate",
    desc: "Once work starts, we keep the site organized, the communication direct, and the quality bar high. Every trade and finish is coordinated to protect the final result.",
    image: "/images/2025-05-06.webp",
  },
  {
    num: "04",
    title: "Walkthrough & Handover",
    desc: "We finish with a final review, punch-list closure, and a clean handover. The goal is simple: a completed space that feels polished, confident, and ready to live in.",
    image: "/images/2025-04-21.webp",
  },
];

export type ProjectStorySection = {
  heading: string;
  body: string;
};

export type ProjectEntry = {
  slug: string;
  title: string;
  year: string;
  updatedAt: string;
  category: string;
  location: string;
  summary: string;
  intro: string;
  heroImage: string;
  coverImage: string;
  galleryImages: readonly string[];
  scope: readonly string[];
  highlights: readonly string[];
  outcome: string;
  storySections: readonly ProjectStorySection[];
};

export const projects: ProjectEntry[] = [
  {
    slug: "forest-garden-studio",
    title: "Forest Garden Studio",
    year: "2024",
    updatedAt: "2026-04-01",
    category: "Custom Space",
    location: "Victoria, BC",
    summary:
      "A compact backyard studio designed to feel calm, durable, and properly integrated into a wooded residential property.",
    intro:
      "This project focused on building a secondary space that felt intentional rather than temporary. The result is a clean-lined garden studio with better utility, stronger detailing, and a finish quality that matches the main property.",
    heroImage: "/images/2024-01-13.webp",
    coverImage: "/images/2024-01-13.webp",
    galleryImages: [
      "/images/2024-01-13.webp",
      "/images/2024-01-24-2.webp",
      "/images/2024-01-24.webp",
    ],
    scope: [
      "Site review and planning",
      "Structure and envelope work",
      "Exterior finish detailing",
      "Interior trim and final fit-out",
    ],
    highlights: [
      "Minimal roofline with a clean profile",
      "Warm cladding and trim contrast",
      "Flexible space for work, wellness, or hosting",
    ],
    outcome:
      "The completed studio feels deliberate, private, and high-value. It expands the property without reading like an afterthought.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The studio needed to feel integrated with the property rather than dropped into the yard as a secondary afterthought. That meant clean roof geometry, calm detailing, and an exterior palette that felt grounded in the site.",
      },
      {
        heading: "Execution Notes",
        body:
          "The work centered on restraint and finish discipline. Alignment at the openings, the deck transition, and the cladding profile all had to feel crisp because small buildings reveal mistakes quickly.",
      },
    ],
  },
  {
    slug: "custom-kitchen-renovation",
    title: "Custom Kitchen Renovation",
    year: "2025",
    updatedAt: "2026-03-18",
    category: "Kitchen Renovation",
    location: "Greater Victoria",
    summary:
      "A character-home kitchen renovation centered on better circulation, stronger material contrast, and a more composed working layout.",
    intro:
      "The brief was to make the kitchen feel sharper, calmer, and more efficient without stripping away the character of the home. The work focused on layout discipline, cleaner lines, and details that would hold up to daily use.",
    heroImage: "/images/2025-05-06.webp",
    coverImage: "/images/2024-01-13-2.webp",
    galleryImages: [
      "/images/2024-01-13-2.webp",
      "/images/2025-05-06.webp",
      "/images/2025-01-18.webp",
    ],
    scope: [
      "Kitchen demolition and reconfiguration",
      "Cabinet and fixture coordination",
      "Finish carpentry and hardware detailing",
      "Lighting and surface integration",
    ],
    highlights: [
      "Better working flow through the core prep zones",
      "More confident finish palette",
      "Sharper visual alignment across cabinetry and openings",
    ],
    outcome:
      "The updated kitchen feels more premium and more useful. It reads cleaner, works harder, and anchors the home better than the previous layout.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The room had to work harder without becoming visually busy. The renovation focused on improving circulation, calming the material palette, and tightening the way key surfaces and cabinetry met one another.",
      },
      {
        heading: "Execution Notes",
        body:
          "Kitchens succeed or fail in the details clients touch every day. Hardware alignment, appliance integration, trim tolerances, and lighting placement were all treated as finish-critical decisions rather than last-stage corrections.",
      },
    ],
  },
  {
    slug: "luxury-bathroom-remodel",
    title: "Luxury Bathroom Remodel",
    year: "2025",
    updatedAt: "2026-02-26",
    category: "Bathroom Renovation",
    location: "Victoria, BC",
    summary:
      "A bathroom remodel built around cleaner lines, stronger waterproofing discipline, and a higher-end finish standard.",
    intro:
      "This remodel focused on making a compact bathroom feel quieter and more refined. The design direction prioritized restraint, material consistency, and better coordination between tile, vanity, plumbing fixtures, and lighting.",
    heroImage: "/images/2025-06-09.webp",
    coverImage: "/images/2025-06-09.webp",
    galleryImages: [
      "/images/2025-06-09.webp",
      "/images/2025-11-01.webp",
      "/images/2025-04-21.webp",
    ],
    scope: [
      "Demolition and waterproofing prep",
      "Tile and wet-area detailing",
      "Vanity, plumbing, and fixture installation",
      "Final trim and punch-list refinement",
    ],
    highlights: [
      "Layered material contrast without visual clutter",
      "Fixture palette that feels considered, not standard",
      "Balanced lighting and cleaner sightlines",
    ],
    outcome:
      "The finished bathroom feels calm, elevated, and durable. It performs better in daily use and carries a visibly higher level of finish.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The room needed to feel quieter, more spacious, and more resolved without relying on unnecessary visual noise. Material consistency and clean sightlines did most of that work.",
      },
      {
        heading: "Execution Notes",
        body:
          "Bathrooms demand discipline in the layers clients never see. Waterproofing, substrate prep, fixture coordination, and tile alignment all had to be right before the final room could read as premium.",
      },
    ],
  },
  {
    slug: "front-entry-rebuild",
    title: "Front Entry Rebuild",
    year: "2024",
    updatedAt: "2025-12-14",
    category: "Exterior Upgrade",
    location: "Vancouver Island",
    summary:
      "A front entry rebuild that improved first impression, weather resilience, and the overall sense of arrival at the property.",
    intro:
      "The goal was to turn a weak first impression into a stronger arrival sequence. The work focused on proportion, exterior durability, and cleaner transitions between structure, cladding, and the approach to the home.",
    heroImage: "/images/2024-01-24-1.webp",
    coverImage: "/images/2024-01-24-1.webp",
    galleryImages: [
      "/images/2024-01-24-1.webp",
      "/images/2024-10-02.webp",
      "/images/2024-01-24.webp",
    ],
    scope: [
      "Entry rebuild and exterior detailing",
      "Material replacement and weather protection improvements",
      "Finish work at trim and transition points",
      "Visual cleanup of the approach sequence",
    ],
    highlights: [
      "Stronger curb presence",
      "Improved durability in exposed areas",
      "A clearer, more confident front-door experience",
    ],
    outcome:
      "The entry now reads as intentional and complete. It strengthens both the exterior character of the house and the everyday experience of coming home.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The rebuild needed to improve both appearance and confidence in the exterior envelope. The approach focused on stronger proportion, cleaner transitions, and a more intentional arrival sequence.",
      },
      {
        heading: "Execution Notes",
        body:
          "Exterior upgrades live or die by durability at their transition points. This project required attention to weather exposure, trim clarity, and the way the rebuilt entry connected visually back to the house.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type JournalSection = {
  heading: string;
  body: readonly string[];
};

export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  excerpt: string;
  description: string;
  heroImage: string;
  readingTime: string;
  keyTakeaways: readonly string[];
  sections: readonly JournalSection[];
};

export const journalPosts: JournalEntry[] = [
  {
    slug: "choosing-a-construction-company-in-victoria",
    title: "Choosing a Construction Company in Victoria",
    date: "Apr 1, 2026",
    publishedAt: "2026-04-01",
    excerpt:
      "The best renovation teams combine clear scope, realistic scheduling, premium craftsmanship, and steady communication from first walkthrough to final handover.",
    description:
      "How to evaluate renovation contractors in Victoria, compare communication quality, and look for real signs of disciplined project delivery.",
    heroImage: "/images/2024-01-13.webp",
    readingTime: "4 min read",
    keyTakeaways: [
      "Scope clarity matters more than sales polish.",
      "Finish discipline shows up in real completed work, not just renderings.",
      "Reliable communication is one of the strongest signs of a strong builder.",
    ],
    sections: [
      {
        heading: "Look for scope clarity early",
        body: [
          "A strong construction company does not rely on vague confidence. They ask detailed questions early, define what is included, and surface assumptions before pricing hardens.",
          "That clarity matters because most renovation stress comes from scope drift, missing allowances, and late surprises that should have been identified at the first walkthrough.",
        ],
      },
      {
        heading: "Pay attention to finish discipline",
        body: [
          "Premium work is not just about expensive materials. It comes from sequencing, prep quality, clean site standards, and how well the last ten percent is executed.",
          "Ask to see examples of completed kitchens, bathrooms, or custom spaces that show trim alignment, tile consistency, and general attention to final detailing.",
        ],
      },
      {
        heading: "Communication should feel steady, not reactive",
        body: [
          "Reliable builders communicate clearly before things become a problem. That means realistic timelines, straightforward trade coordination, and quick clarification when site conditions change.",
          "If the communication feels vague or overly polished during the sales stage, it usually gets worse once construction begins.",
        ],
      },
    ],
  },
  {
    slug: "planning-a-kitchen-or-bathroom-renovation",
    title: "Planning a Kitchen or Bathroom Renovation",
    date: "Mar 18, 2026",
    publishedAt: "2026-03-18",
    excerpt:
      "High-value renovations start with smart layout decisions, durable material selections, and a builder who can coordinate finishes without losing momentum on site.",
    description:
      "A practical guide to planning kitchens and bathrooms with better layout decisions, durable finish choices, and cleaner execution.",
    heroImage: "/images/2025-06-09.webp",
    readingTime: "5 min read",
    keyTakeaways: [
      "Layout quality usually matters more than expensive add-ons.",
      "Durable finishes outperform trend-driven choices in high-use rooms.",
      "Builder coordination is what protects the final design on site.",
    ],
    sections: [
      {
        heading: "Start with how the room works",
        body: [
          "The most expensive kitchens and bathrooms are not always the best ones. Good layouts outperform expensive add-ons when the room starts flowing better and handling daily use more cleanly.",
          "Think first about movement, storage, task lighting, and where the room currently loses time or comfort.",
        ],
      },
      {
        heading: "Choose finishes that can age well",
        body: [
          "Durability matters more than novelty in high-use rooms. Surfaces, fixtures, and hardware should still feel sharp after repeated cleaning, moisture exposure, and daily traffic.",
          "That usually means simplifying the palette, avoiding trendy compromises, and coordinating details so the final room feels resolved rather than busy.",
        ],
      },
      {
        heading: "Builder coordination affects the final result",
        body: [
          "Even a good design can lose quality if trades are not sequenced properly. Tile transitions, cabinet tolerances, fixture placement, and finish carpentry all depend on disciplined coordination.",
          "The right builder protects the design by keeping execution clean and decisions organized before the job gets busy.",
        ],
      },
    ],
  },
  {
    slug: "what-makes-a-premium-renovation-last",
    title: "What Makes a Premium Renovation Last",
    date: "Feb 6, 2026",
    publishedAt: "2026-02-06",
    excerpt:
      "Lasting renovation work comes from disciplined prep, strong site management, and details resolved properly before the final layer goes in.",
    description:
      "What separates premium renovations from cosmetic upgrades, and why prep, sequencing, and detail resolution matter so much.",
    heroImage: "/images/2025-05-06.webp",
    readingTime: "4 min read",
    keyTakeaways: [
      "The hidden work is what determines whether the visible work lasts.",
      "Sequencing is one of the clearest markers of a premium renovation.",
      "Refinement should happen throughout the build, not just at the end.",
    ],
    sections: [
      {
        heading: "The hidden work matters most",
        body: [
          "What clients do not see often determines how long the visible finish holds up. Substrate prep, waterproofing, framing corrections, and mechanical coordination all shape the quality of the end result.",
          "Shortcuts in the hidden layers usually show up later as movement, cracking, moisture issues, or rooms that never feel quite right.",
        ],
      },
      {
        heading: "Sequencing protects quality",
        body: [
          "Premium renovations are not just built carefully. They are built in the right order. When site management is disciplined, each trade leaves the next trade a cleaner, more accurate starting point.",
          "That is how sharp lines, better fit, and more durable finishes become repeatable rather than accidental.",
        ],
      },
      {
        heading: "Refinement is part of delivery",
        body: [
          "The final walkthrough should not be the first time anyone notices problems. Good builders resolve details as they go and close the project with intent.",
          "That refinement is what makes a completed space feel composed, premium, and ready to live in immediately.",
        ],
      },
    ],
  },
];

export function getJournalPostBySlug(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}

export const galleryItems = [
  {
    title: "Forest Garden Studio Exterior",
    image: "/images/2024-01-13.webp",
    category: "Custom Space",
  },
  {
    title: "Kitchen Renovation",
    image: "/images/2024-01-13-2.webp",
    category: "Kitchen",
  },
  {
    title: "Luxury Bathroom",
    image: "/images/2025-06-09.webp",
    category: "Bathroom",
  },
  {
    title: "Vanity Detail",
    image: "/images/2025-04-21.webp",
    category: "Bathroom",
  },
  {
    title: "Character Kitchen",
    image: "/images/2025-05-06.webp",
    category: "Kitchen",
  },
  {
    title: "Utility Room Fit-Out",
    image: "/images/2024-10-02.webp",
    category: "Interior",
  },
  {
    title: "Front Entry Rebuild",
    image: "/images/2024-01-24-1.webp",
    category: "Exterior",
  },
  {
    title: "Bathroom Remodel Detail",
    image: "/images/2025-11-01.webp",
    category: "Bathroom",
  },
  {
    title: "Garden Studio Exterior Angle",
    image: "/images/2024-01-24-2.webp",
    category: "Custom Space",
  },
] as const;

export const socialLinks = [
  {
    href: "https://www.instagram.com/cvr_construction_ltd/",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61552800609732",
    label: "Facebook",
  },
  { href: "https://wa.me/12508801270", label: "WhatsApp" },
] as const;

export const studioPrinciples = [
  {
    title: "Clarity Before Construction",
    description:
      "We work to reduce ambiguity early so scope, finish level, and expectations are aligned before the site gets moving.",
  },
  {
    title: "Detail-Driven Execution",
    description:
      "Projects are managed with a premium finish standard, disciplined sequencing, and close attention to the details clients notice at handover.",
  },
  {
    title: "Straightforward Communication",
    description:
      "We aim for communication that is calm, direct, and useful. Clients should know what is happening and why it matters.",
  },
] as const;

export const studioStats = [
  { label: "Primary Region", value: "Victoria & Greater Victoria" },
  { label: "Core Focus", value: "Renovations, kitchens, bathrooms & custom spaces" },
  { label: "Project Standard", value: "Premium finish quality with disciplined delivery" },
] as const;
