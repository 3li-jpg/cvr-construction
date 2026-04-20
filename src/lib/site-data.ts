export const navItems = [
  { href: "/showroom", label: "Showroom" },
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
    previewImage: "/images/victoria-whole-home-renovation-interior.webp",
    galleryImages: [
      "/images/victoria-commercial-interior-renovation.webp",
      "/images/2025-01-18.webp",
      "/images/victoria-custom-kitchen-renovation.webp",
    ],
  },
  {
    num: "02",
    title: "Kitchen Renovations",
    desc: "Custom kitchen renovations designed around daily use, durable materials, efficient workflow, and a finish level that elevates the entire home.",
    previewImage: "/images/victoria-custom-kitchen-renovation.webp",
    galleryImages: [
      "/images/victoria-kitchen-bath-material-selections.webp",
      "/images/victoria-premium-kitchen-interior.webp",
      "/images/2025-01-18.webp",
    ],
  },
  {
    num: "03",
    title: "Bathroom Renovations",
    desc: "Bathroom remodels with strong waterproofing discipline, clean tile execution, thoughtful lighting, and premium fixture integration.",
    previewImage: "/images/victoria-luxury-bathroom-renovation.webp",
    galleryImages: [
      "/images/victoria-premium-bathroom-finish-detail.webp",
      "/images/victoria-bathroom-vanity-detail.webp",
      "/images/2026-02-26.webp",
    ],
  },
  {
    num: "04",
    title: "Commercial Renovations",
    desc: "Commercial upgrades and interior improvements delivered with straightforward coordination, clean sites, and reliable schedule control.",
    previewImage: "/images/victoria-commercial-interior-renovation.webp",
    galleryImages: [
      "/images/2025-01-18.webp",
      "/images/victoria-commercial-interior-renovation.webp",
      "/images/victoria-whole-home-renovation-interior.webp",
    ],
  },
  {
    num: "05",
    title: "Garden Studios & Custom Spaces",
    desc: "Compact custom builds, secondary spaces, and high-value additions that expand how a property works without sacrificing design quality.",
    previewImage: "/images/victoria-garden-studio-exterior.webp",
    galleryImages: [
      "/images/victoria-garden-studio-exterior.webp",
      "/images/victoria-home-entry-renovation-exterior.webp",
      "/images/victoria-custom-garden-studio-angle.webp",
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
    image: "/images/victoria-home-entry-renovation-exterior.webp",
  },
  {
    num: "02",
    title: "Scope & Pricing",
    desc: "We define the work, outline the sequencing, and build a quote structure that makes expectations clear. Materials, assumptions, and priorities are aligned before construction begins.",
    image: "/images/victoria-kitchen-bath-material-selections.webp",
  },
  {
    num: "03",
    title: "Build & Coordinate",
    desc: "Once work starts, we keep the site organized, the communication direct, and the quality bar high. Every trade and finish is coordinated to protect the final result.",
    image: "/images/victoria-premium-kitchen-interior.webp",
  },
  {
    num: "04",
    title: "Walkthrough & Handover",
    desc: "We finish with a final review, punch-list closure, and a clean handover. The goal is simple: a completed space that feels polished, confident, and ready to live in.",
    image: "/images/victoria-premium-bathroom-finish-detail.webp",
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
    heroImage: "/images/victoria-garden-studio-exterior.webp",
    coverImage: "/images/victoria-garden-studio-exterior.webp",
    galleryImages: [
      "/images/victoria-garden-studio-exterior.webp",
      "/images/victoria-custom-garden-studio-angle.webp",
      "/images/victoria-home-entry-renovation-exterior.webp",
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
    heroImage: "/images/victoria-premium-kitchen-interior.webp",
    coverImage: "/images/victoria-custom-kitchen-renovation.webp",
    galleryImages: [
      "/images/victoria-custom-kitchen-renovation.webp",
      "/images/victoria-premium-kitchen-interior.webp",
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
    heroImage: "/images/victoria-luxury-bathroom-renovation.webp",
    coverImage: "/images/victoria-luxury-bathroom-renovation.webp",
    galleryImages: [
      "/images/victoria-luxury-bathroom-renovation.webp",
      "/images/victoria-bathroom-vanity-detail.webp",
      "/images/victoria-premium-bathroom-finish-detail.webp",
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
    heroImage: "/images/victoria-front-entry-rebuild.webp",
    coverImage: "/images/victoria-front-entry-rebuild.webp",
    galleryImages: [
      "/images/victoria-front-entry-rebuild.webp",
      "/images/victoria-commercial-interior-renovation.webp",
      "/images/victoria-home-entry-renovation-exterior.webp",
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
    heroImage: "/images/victoria-garden-studio-exterior.webp",
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
    heroImage: "/images/victoria-luxury-bathroom-renovation.webp",
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
    heroImage: "/images/victoria-premium-kitchen-interior.webp",
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
    image: "/images/victoria-garden-studio-exterior.webp",
    category: "Custom Space",
    eyebrow: "Custom Space",
    alt: "Garden studio exterior by CVR Construction",
  },
  {
    title: "Kitchen Renovation",
    image: "/images/victoria-custom-kitchen-renovation.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "Kitchen renovation by CVR Construction",
  },
  {
    title: "Luxury Bathroom",
    image: "/images/victoria-luxury-bathroom-renovation.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "Bathroom renovation by CVR Construction",
  },
  {
    title: "Vanity Detail",
    image: "/images/victoria-premium-bathroom-finish-detail.webp",
    category: "Bathroom",
    eyebrow: "Finish Detail",
    alt: "Bathroom vanity and tile detail by CVR Construction",
  },
  {
    title: "Character Kitchen",
    image: "/images/victoria-premium-kitchen-interior.webp",
    category: "Kitchen",
    eyebrow: "Interior Detail",
    alt: "Kitchen interior detail by CVR Construction",
  },
  {
    title: "Utility Room Fit-Out",
    image: "/images/victoria-commercial-interior-renovation.webp",
    category: "Interior",
    eyebrow: "Commercial Upgrade",
    alt: "Utility room renovation by CVR Construction",
  },
  {
    title: "Front Entry Rebuild",
    image: "/images/victoria-front-entry-rebuild.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "Front entry rebuild by CVR Construction",
  },
  {
    title: "Bathroom Remodel Detail",
    image: "/images/victoria-bathroom-vanity-detail.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Detail",
    alt: "Modern bathroom vanity and fixtures by CVR Construction",
  },
  {
    title: "Garden Studio Exterior Angle",
    image: "/images/victoria-custom-garden-studio-angle.webp",
    category: "Custom Space",
    eyebrow: "Exterior Finish",
    alt: "Garden studio exterior walkway by CVR Construction",
  },
  {
    title: "Refined Interior",
    image: "/images/2025-01-18.webp",
    category: "Interior",
    eyebrow: "Interior Upgrade",
    alt: "Interior renovation by CVR Construction",
  },
] as const;

export const showroomContact = {
  phone: "+1 250 466 6531",
  phoneHref: "tel:+12504666531",
  email: "cvrshowroom@outlook.com",
  emailHref: "mailto:cvrshowroom@outlook.com",
} as const;

export const showroomBrands = [
  "KOHLER",
  "Moen",
  "PEARL",
  "Grohe",
  "Delta",
  "Glacier Bay",
  "RAINLEX",
  "American Standard",
  "Pfister",
  "MAAX",
] as const;

export const showroomReasons = [
  {
    title: "Compare Finishes In Person",
    description:
      "See how textures, finishes, and proportions actually read in real light before they go into the home.",
  },
  {
    title: "Review Real Product Options",
    description:
      "Compare fixture lines, faucet styles, shower components, and bath products side by side instead of relying on tabs and screenshots.",
  },
  {
    title: "Choose With Better Guidance",
    description:
      "Use the showroom as a faster decision point when you want product options narrowed down with more confidence.",
  },
] as const;

export const showroomCollections = [
  {
    index: "01",
    eyebrow: "Showroom / Faucets & Fixtures",
    title: "Kitchen & Bath Fixtures",
    description:
      "A tighter product selection for clients who want better-looking faucets, hardware, and fixture lines without guessing from online thumbnails alone.",
    image: "/images/victoria-premium-kitchen-interior.webp",
    alt: "CVR showroom kitchen and bath fixture selection",
  },
  {
    index: "02",
    eyebrow: "Showroom / Tubs & Showers",
    title: "Bath & Shower Products",
    description:
      "Explore shower systems, trim, tubs, and core bathroom product lines in person so the finish, scale, and overall direction are easier to lock in.",
    image: "/images/victoria-luxury-bathroom-renovation.webp",
    alt: "CVR showroom bath and shower product selection",
  },
  {
    index: "03",
    eyebrow: "Showroom / Product Guidance",
    title: "Selections That Feel Resolved",
    description:
      "The showroom is built to make product decisions feel clearer. Better contrast, fewer weak choices, and a stronger sense of what belongs in the final space.",
    image: "/images/victoria-custom-garden-studio-angle.webp",
    alt: "CVR showroom premium product consultation image",
  },
] as const;

export const showroomSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "CVR Showroom",
  url: "https://www.cvrconstruction.ca/showroom",
  telephone: showroomContact.phone,
  email: showroomContact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: ["Victoria, BC", "Greater Victoria", "Vancouver Island"],
  brand: showroomBrands.map((name) => ({
    "@type": "Brand",
    name,
  })),
} as const;

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

export const studioFacts = [
  { value: "12", suffix: "+", label: "Years On The Island" },
  { value: "150", suffix: "+", label: "Completed Projects" },
  { value: "40", suffix: "+", label: "Trades Coordinated" },
  { value: "100", suffix: "%", label: "Licensed & Insured" },
] as const;

export const studioPhilosophy = [
  "CVR Construction is a Victoria-based builder focused on disciplined renovation work. The bias is toward restraint, cleaner scopes, and finishes that hold their quality long after handover. We take on fewer projects and work them harder.",
  "Every project is shaped by its own conditions — the home, the site, the client's appetite for detail. The way we coordinate trades, sequence the build, and close out the last ten percent is what makes the end result feel premium rather than just completed.",
] as const;

export type StudioCertification = {
  title: string;
  meta: string;
  year?: string;
  href?: string;
};

export const studioCertifications: StudioCertification[] = [
  {
    title: "BBB Accredited Business",
    meta: "Better Business Bureau",
    year: "Ongoing",
    href: "https://www.bbb.org/ca/bc/victoria/profile/remodeling/cvr-construction-ltd-0047-235975091",
  },
  {
    title: "WorkSafeBC Registered",
    meta: "Active Coverage",
    year: "Current",
  },
  {
    title: "Licensed & Insured In British Columbia",
    meta: "Full Liability Coverage",
    year: "Current",
  },
  {
    title: "CHBA Victoria Member",
    meta: "Canadian Home Builders' Association",
  },
  {
    title: "RenoMark Renovator",
    meta: "Professional Renovation Standard",
  },
  {
    title: "Houzz Best Of Service",
    meta: "Recognition",
    year: "2024",
  },
  {
    title: "HomeStars Best Of Award",
    meta: "Recognition",
    year: "2024",
  },
  {
    title: "Canadian Construction Association",
    meta: "Professional Membership",
  },
];

export const aboutHero = {
  src: "/images/victoria-whole-home-renovation-interior.webp",
  alt: "CVR Construction premium whole-home renovation in Victoria BC",
};

export const projectsHero = {
  src: "/images/victoria-custom-kitchen-renovation.webp",
  alt: "CVR Construction custom kitchen project in Victoria BC",
};

export const journalsHero = {
  src: "/images/victoria-kitchen-bath-material-selections.webp",
  alt: "CVR Construction material selection studio in Victoria BC",
};

export const galleryHero = {
  src: "/images/victoria-luxury-bathroom-renovation.webp",
  alt: "CVR Construction luxury bathroom renovation in Victoria BC",
};

export const aboutStudioPortrait = {
  image: "/images/victoria-home-entry-renovation-exterior.webp",
  alt: "CVR Construction completed home on Vancouver Island",
};

export type StudioPartner = {
  name: string;
};

export const studioPartners: StudioPartner[] = showroomBrands.map((name) => ({
  name,
}));

export const studioYears = [
  "2013",
  "2016",
  "2019",
  "2021",
  "2024",
  "2026",
] as const;
