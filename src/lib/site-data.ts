export const navItems = [
  { href: "/", label: "Home" },
  { href: "/showroom", label: "Showroom" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journals", label: "Journals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const businessContact = {
  name: "CVR Construction Ltd.",
  addressLine1: "1226 Finlayson Street",
  cityRegionPostal: "Victoria, BC V8T 2V3",
  country: "Canada",
  phone: "+1 (250) 880 1270",
  phoneHref: "tel:+12508801270",
  email: "cvrconstruction@outlook.com",
  emailHref: "mailto:cvrconstruction@outlook.com",
  whatsapp: "https://wa.me/12508801270",
  mapsHref:
    "https://maps.google.com/?q=1226+Finlayson+Street,+Victoria,+BC+V8T+2V3,+Canada",
} as const;

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
    title: "Full Home Remodeling",
    desc: "Full home remodeling in Victoria, BC with disciplined planning, refined finishes, and clear project delivery from demolition through final handover.",
    previewImage: "/images/victoria-dark-gray-kitchen-and-bath-001.webp",
    galleryImages: [
      "/images/victoria-white-basement-suite-2024-001.webp",
      "/images/victoria-condo-kitchen-and-marble-baths-002.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-001.webp",
    ],
  },
  {
    num: "02",
    title: "Kitchen Renovation",
    desc: "Kitchen renovation work designed around daily use, durable materials, efficient workflow, and a finish level that lifts the entire home.",
    previewImage: "/images/victoria-dark-gray-kitchen-and-bath-002.webp",
    galleryImages: [
      "/images/victoria-rustic-checkerboard-cabin-kitchen-001.webp",
      "/images/victoria-legacy-wood-kitchen-001.webp",
      "/images/victoria-white-kitchen-suite-final.webp",
    ],
  },
  {
    num: "03",
    title: "Bathroom Remodeling",
    desc: "Bathroom remodeling with strong waterproofing discipline, clean tile execution, thoughtful lighting, and premium fixture integration.",
    previewImage: "/images/victoria-modern-bath-and-laundry-suite-003.webp",
    galleryImages: [
      "/images/victoria-framed-bathroom-renovation-001.webp",
      "/images/victoria-green-tile-bath-and-mudroom-001.webp",
      "/images/victoria-white-shower-bath-single-001.webp",
    ],
  },
  {
    num: "04",
    title: "Commercial Upgrades",
    desc: "Commercial upgrades and interior improvements delivered with straightforward coordination, clean sites, and reliable schedule control.",
    previewImage: "/images/victoria-commercial-interior-renovation.webp",
    galleryImages: [
      "/images/victoria-front-entry-rebuild.webp",
      "/images/victoria-upper-deck-and-stairs-001.webp",
      "/images/victoria-white-railing-deck-001.webp",
    ],
  },
  {
    num: "05",
    title: "Custom Spaces",
    desc: "Custom spaces, compact additions, and secondary builds that expand how a property works without sacrificing design quality.",
    previewImage: "/images/victoria-forest-cabin-and-outhouse-005.webp",
    galleryImages: [
      "/images/victoria-outbuilding-bath-conversion-after-final-main.webp",
      "/images/victoria-gray-siding-and-forest-shed-001.webp",
      "/images/victoria-small-adu-exterior-and-rooms-001.webp",
    ],
  },
  {
    num: "06",
    title: "Tile, Flooring & Fixtures",
    desc: "Tile, flooring, fixtures, and finish details installed with clean execution, precise layouts, and a more polished final result.",
    previewImage: "/images/victoria-green-tile-bath-and-mudroom-003.webp",
    galleryImages: [
      "/images/victoria-framed-bathroom-renovation-006.webp",
      "/images/victoria-modern-bath-and-laundry-suite-006.webp",
      "/images/victoria-green-tile-bath-and-mudroom-004.webp",
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
    desc: "We start by understanding your goals, the space, the investment range, and the level of finish you want. Site conditions, priorities, and constraints are reviewed early so the project starts with a grounded plan instead of assumptions.",
    image: "/images/victoria-home-entry-renovation-exterior.webp",
  },
  {
    num: "02",
    title: "Scope & Pricing",
    desc: "We define the work, outline the sequencing, and build a quote structure that makes expectations clear. Materials, assumptions, timelines, and priorities are aligned before construction begins so decisions are easier to track.",
    image: "/images/victoria-kitchen-bath-material-selections.webp",
  },
  {
    num: "03",
    title: "Build & Coordinate",
    desc: "Once work starts, we keep the site organized, the communication direct, and the quality bar high. Every trade, finish, and handoff is coordinated with the final result in mind, from rough work through visible details.",
    image: "/images/victoria-premium-kitchen-interior.webp",
  },
  {
    num: "04",
    title: "Walkthrough & Handover",
    desc: "We finish with a final review, punch-list closure, and a clean handover. The last details are checked with the same care as the main build, so the completed space feels polished, confident, and ready to live in.",
    image: "/images/victoria-premium-bathroom-finish-detail.webp",
  },
];

export type ProjectStorySection = {
  heading: string;
  body: string;
};

export type ProjectBeforeAfterComparison = {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  label?: string;
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
  beforeAfterImages?: readonly ProjectBeforeAfterComparison[];
  scope: readonly string[];
  highlights: readonly string[];
  outcome: string;
  storySections: readonly ProjectStorySection[];
};

export const projects: ProjectEntry[] = [
  {
    slug: "forest-garden-studio",
    title: "Forest Cabin And Outhouse",
    year: "2024",
    updatedAt: "2026-04-30",
    category: "Custom Space",
    location: "Victoria, BC",
    summary:
      "A compact forest cabin and outhouse project designed to feel calm, durable, and properly integrated into a wooded residential property.",
    intro:
      "This project focused on building a secondary forest space that felt intentional rather than temporary. The result is a warm cabin and outhouse setting with stronger exterior detailing, practical access, and a finish quality that feels grounded in the site.",
    heroImage: "/images/victoria-forest-cabin-and-outhouse-005.webp",
    coverImage: "/images/victoria-forest-cabin-and-outhouse-005.webp",
    galleryImages: [
      "/images/victoria-forest-cabin-and-outhouse-001.webp",
      "/images/victoria-forest-cabin-and-outhouse-002.webp",
      "/images/victoria-forest-cabin-and-outhouse-003.webp",
      "/images/victoria-forest-cabin-and-outhouse-004.webp",
      "/images/victoria-forest-cabin-and-outhouse-005.webp",
    ],
    scope: [
      "Site review and planning",
      "Cabin and outhouse exterior work",
      "Deck and access detailing",
      "Woodland finish coordination",
    ],
    highlights: [
      "Warm cabin forms set into the trees",
      "Simple exterior detailing that suits the wooded site",
      "Practical deck and access points for daily use",
    ],
    outcome:
      "The completed cabin and outhouse feel deliberate, private, and settled into the landscape. The project adds useful outdoor living support without reading like an afterthought.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The cabin and outhouse needed to feel integrated with the wooded property rather than dropped into the site. That meant warm exterior materials, simple forms, and access details that worked with the surrounding trees.",
      },
      {
        heading: "Execution Notes",
        body:
          "The work centered on restraint and site fit. The deck transitions, exterior edges, and compact building forms had to feel clean because small structures reveal proportion and finish decisions quickly.",
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
    slug: "kitchen-remodelling",
    title: "Kitchen Remodelling",
    year: "2025",
    updatedAt: "2026-04-30",
    category: "Kitchen Renovation",
    location: "Vancouver Island",
    summary:
      "A cabin kitchen renovation that kept the warmth of the original wood interior while introducing sharper cabinetry, brighter work surfaces, and a bold checkerboard floor.",
    intro:
      "This project updated a compact cabin kitchen without stripping away its personality. The work focused on preserving the warmth of the timber shell while bringing in cleaner cabinetry, more usable prep space, and a stronger visual rhythm through the finished palette.",
    heroImage: "/images/victoria-rustic-checkerboard-cabin-kitchen-025.webp",
    coverImage: "/images/victoria-rustic-checkerboard-cabin-kitchen-025.webp",
    galleryImages: [
      "/images/victoria-rustic-checkerboard-cabin-kitchen-001.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-002.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-003.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-004.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-005.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-006.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-007.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-008.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-009.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-010.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-011.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-012.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-013.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-014.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-015.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-016.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-017.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-018.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-019.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-020.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-021.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-022.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-023.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-024.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-025.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-026.webp",
      "/images/victoria-rustic-checkerboard-cabin-kitchen-027.webp",
    ],
    scope: [
      "Kitchen layout refinement",
      "Cabinet and hardware installation",
      "Countertop and sink integration",
      "Appliance and finish coordination",
      "Flooring and final detailing",
    ],
    highlights: [
      "Checkerboard flooring that anchors the room",
      "Soft green cabinetry against warm timber walls and ceilings",
      "Long, brighter prep surfaces with cleaner working zones",
    ],
    outcome:
      "The completed kitchen feels brighter, better organized, and more intentional. It still reads like part of the cabin, but with a clearer working layout and a much stronger finish standard.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The goal was to modernize function without flattening the rustic character of the home. The checkerboard floor, soft green cabinetry, and warm wood backdrop were balanced to make the room feel both playful and grounded.",
      },
      {
        heading: "Execution Notes",
        body:
          "The success of the room depends on contrast and fit. Cabinet lines, countertop edges, appliance placement, and the long sink run all needed to feel crisp against the existing timber envelope so the renovation looked resolved rather than patched in.",
      },
    ],
  },
  {
    slug: "outbuilding-garage-conversion",
    title: "Outbuilding Garage Conversion",
    year: "2023",
    updatedAt: "2026-05-01",
    category: "Garage Conversion",
    location: "Greater Victoria",
    summary:
      "An outbuilding garage conversion that turned a rough, unfinished structure into a cleaner, more practical garage with brighter surfaces and a finished daily-use feel.",
    intro:
      "This project converted an outbuilding garage from a rough, work-in-progress shell into a more usable finished space. The work focused on bringing order to the layout, closing in the unfinished surfaces, and creating a simple, durable finish that made the garage feel intentional instead of improvised.",
    heroImage: "/images/victoria-outbuilding-bath-conversion-after-final-main.webp",
    coverImage: "/images/victoria-outbuilding-bath-conversion-after-final-main.webp",
    galleryImages: [
      "/images/victoria-outbuilding-bath-conversion-after-final-main.webp",
      "/images/victoria-outbuilding-bath-conversion-during-001.webp",
      "/images/victoria-outbuilding-bath-conversion-during-002.webp",
      "/images/victoria-outbuilding-bath-conversion-during-003.webp",
      "/images/victoria-outbuilding-bath-conversion-during-004.webp",
    ],
    beforeAfterImages: [
      {
        label: "Existing condition",
        beforeImage: "/images/victoria-outbuilding-bath-conversion-before-001.webp",
        afterImage: "/images/victoria-outbuilding-bath-conversion-after-final-main.webp",
        beforeAlt: "Outbuilding garage conversion before construction",
        afterAlt: "Finished outbuilding garage conversion by CVR Construction",
      },
    ],
    scope: [
      "Outbuilding garage conversion",
      "Garage layout and finish coordination",
      "Wall, ceiling, and surface finishing",
      "Flooring, trim, and final detailing",
    ],
    highlights: [
      "Before and after transformation from unfinished outbuilding to finished garage",
      "Cleaner garage envelope with brighter, more usable surfaces",
      "Practical layout for a compact outbuilding footprint",
    ],
    outcome:
      "The completed conversion gives the outbuilding a more useful, finished garage space. It replaces the rough existing condition with a cleaner layout, brighter surfaces, and a garage that feels ready for daily use.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The priority was to make the garage conversion feel practical and complete without overcomplicating the small footprint. Every visible surface and transition had to support a cleaner space that could work as part of the outbuilding rather than a temporary add-on.",
      },
      {
        heading: "Execution Notes",
        body:
          "Conversion work depends on resolving what the existing structure gives you. The visible finish needed to hide the roughness of the starting point while keeping trim and surface transitions simple enough to feel durable and maintainable.",
      },
    ],
  },
  {
    slug: "dark-gray-kitchen-and-bath",
    title: "Dark Gray Kitchen And Bath",
    year: "2025",
    updatedAt: "2026-04-30",
    category: "Kitchen & Bathroom Renovation",
    location: "Greater Victoria",
    summary:
      "A dark gray kitchen and bath renovation with a sharper finish palette, cleaner storage, and coordinated details across two high-use rooms.",
    intro:
      "This project brought a kitchen and bathroom into the same darker, more composed finish direction. The work focused on strong cabinet contrast, cleaner surfaces, improved storage, and fixture coordination that makes both rooms feel more intentional and refined.",
    heroImage: "/images/victoria-dark-gray-kitchen-and-bath-001.webp",
    coverImage: "/images/victoria-dark-gray-kitchen-and-bath-001.webp",
    galleryImages: [
      "/images/victoria-dark-gray-kitchen-and-bath-001.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-002.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-003.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-004.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-005.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-006.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-007.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-008.webp",
      "/images/victoria-dark-gray-kitchen-and-bath-009.webp",
    ],
    scope: [
      "Kitchen and bathroom renovation",
      "Cabinet, vanity, and storage coordination",
      "Counter, fixture, and hardware integration",
      "Tile, trim, paint, and final detailing",
    ],
    highlights: [
      "Dark gray cabinetry used as the anchor finish",
      "Coordinated kitchen and bath palette for a more cohesive home update",
      "Cleaner storage, fixture, and surface details in both rooms",
    ],
    outcome:
      "The completed renovation gives the home a stronger visual direction and more polished daily-use spaces. The kitchen and bathroom now feel connected by a consistent finish standard instead of treated as separate updates.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The goal was to make the darker finish direction feel confident rather than heavy. Cabinet colour, counters, fixtures, and lighting had to balance contrast with enough brightness for both rooms to stay practical and comfortable.",
      },
      {
        heading: "Execution Notes",
        body:
          "Coordinating a kitchen and bath together means small inconsistencies become more visible. Cabinet lines, hardware placement, tile transitions, and fixture finishes were treated as connected decisions so the work felt deliberate across the home.",
      },
    ],
  },
  {
    slug: "modern-bath-and-laundry-suite",
    title: "Modern Bath And Laundry Suite",
    year: "2025",
    updatedAt: "2026-04-30",
    category: "Bathroom Renovation",
    location: "Greater Victoria",
    summary:
      "A modern bathroom and laundry suite remodel with large-format tile, dark contrast walls, cleaner fixtures, and a more functional shared utility layout.",
    intro:
      "This project turned a hard-working bathroom and laundry zone into a cleaner, brighter suite with better storage, stronger fixture coordination, and a more polished daily-use layout. The finish direction balances crisp white surfaces, dark wall colour, matte black hardware, and marble-look tile for a room that feels practical without reading utilitarian.",
    heroImage: "/images/victoria-modern-bath-and-laundry-suite-004.webp",
    coverImage: "/images/victoria-modern-bath-and-laundry-suite-004.webp",
    galleryImages: [
      "/images/victoria-modern-bath-and-laundry-suite-003.webp",
      "/images/victoria-modern-bath-and-laundry-suite-004.webp",
      "/images/victoria-modern-bath-and-laundry-suite-005.webp",
      "/images/victoria-modern-bath-and-laundry-suite-006.webp",
      "/images/victoria-modern-bath-and-laundry-suite-007.webp",
      "/images/victoria-modern-bath-and-laundry-suite-008.webp",
    ],
    scope: [
      "Bathroom and laundry suite remodeling",
      "Large-format tile and shower enclosure installation",
      "Vanity, fixture, and hardware coordination",
      "Tub, shower, and plumbing finish integration",
      "Flooring, paint, trim, and final detailing",
    ],
    highlights: [
      "Marble-look tile shower with black fixture contrast",
      "Double vanity with cleaner storage and lighting",
      "Bright floor tile balanced by a darker wall palette",
    ],
    outcome:
      "The finished suite feels more composed, more functional, and easier to use day to day. It now carries the finish quality of a primary bathroom while still supporting the practical needs of a laundry-connected space.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The room needed to feel elevated while still handling everyday utility. Dark walls, white tile, black hardware, and a long vanity helped create contrast without making the suite feel visually crowded.",
      },
      {
        heading: "Execution Notes",
        body:
          "The project depended on clean alignment across tile, glass, fixtures, vanity placement, and trim. Those details matter most in a compact suite where every transition is visible from multiple angles.",
      },
    ],
  },
  {
    slug: "legacy-wood-kitchen",
    title: "Legacy Wood Kitchen",
    year: "2025",
    updatedAt: "2026-04-30",
    category: "Kitchen Renovation",
    location: "Vancouver Island",
    summary:
      "A warm wood kitchen refresh that retained the character of the original interior while tightening the finish, storage, and daily working layout.",
    intro:
      "This project updated a legacy wood kitchen without erasing the warmth that made the space feel established. The work focused on cleaner cabinetry, brighter work surfaces, improved storage, and details that make the room feel more resolved for everyday use.",
    heroImage: "/images/victoria-legacy-wood-kitchen-001.webp",
    coverImage: "/images/victoria-legacy-wood-kitchen-001.webp",
    galleryImages: [
      "/images/victoria-legacy-wood-kitchen-001.webp",
      "/images/victoria-legacy-wood-kitchen-002.webp",
      "/images/victoria-legacy-wood-kitchen-003.webp",
    ],
    beforeAfterImages: [
      {
        label: "Kitchen refresh",
        beforeImage: "/images/victoria-legacy-wood-kitchen-before.webp",
        afterImage: "/images/victoria-legacy-wood-kitchen-001.webp",
        beforeAlt: "Legacy wood kitchen before renovation",
        afterAlt: "Legacy wood kitchen after renovation by CVR Construction",
      },
    ],
    scope: [
      "Kitchen refresh and finish coordination",
      "Cabinet, counter, and storage improvements",
      "Fixture and appliance integration",
      "Trim, paint, and final detailing",
    ],
    highlights: [
      "Existing wood character preserved as part of the finished palette",
      "Brighter working surfaces with a cleaner daily-use layout",
      "Sharper detailing around cabinetry, fixtures, and storage zones",
    ],
    outcome:
      "The finished kitchen feels more composed and usable while still carrying the warmth of the original home. It reads as a refresh that belongs to the space instead of a replacement dropped into it.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The room needed to feel renewed without losing its established wood character. The finish direction kept the warmth of the existing interior and used cleaner surfaces, cabinetry, and fixture coordination to make the kitchen feel brighter and more deliberate.",
      },
      {
        heading: "Execution Notes",
        body:
          "A refresh like this depends on restraint. The visible details around cabinetry, counters, appliances, and trim had to tighten the room while still respecting the original envelope of the home.",
      },
    ],
  },
  {
    slug: "upper-deck-and-stairs",
    title: "Upper Deck And Stairs",
    year: "2025",
    updatedAt: "2026-04-30",
    category: "Exterior Upgrade",
    location: "Vancouver Island",
    summary:
      "An upper deck and stair rebuild that improved outdoor access, structural confidence, and the finished look of the exterior approach.",
    intro:
      "This project rebuilt an elevated outdoor access sequence so it could feel safer, cleaner, and more integrated with the home. The work focused on durable exterior detailing, clear stair geometry, and a more confident deck connection for everyday use.",
    heroImage: "/images/victoria-upper-deck-and-stairs-001.webp",
    coverImage: "/images/victoria-upper-deck-and-stairs-001.webp",
    galleryImages: [
      "/images/victoria-upper-deck-and-stairs-001.webp",
      "/images/victoria-upper-deck-and-stairs-002.webp",
      "/images/victoria-upper-deck-and-stairs-003.webp",
      "/images/victoria-upper-deck-and-stairs-004.webp",
      "/images/victoria-upper-deck-and-stairs-005.webp",
      "/images/victoria-upper-deck-and-stairs-006.webp",
    ],
    beforeAfterImages: [
      {
        label: "Deck and stair rebuild",
        beforeImage: "/images/victoria-upper-deck-and-stairs-before.webp",
        afterImage: "/images/victoria-upper-deck-and-stairs-003.webp",
        beforeAlt: "Upper deck before stair and railing rebuild",
        afterAlt: "Upper deck and stairs after rebuild by CVR Construction",
      },
    ],
    scope: [
      "Upper deck and stair rebuild",
      "Exterior framing and structural coordination",
      "Railing, landing, and access detailing",
      "Weather-exposed finish work and cleanup",
    ],
    highlights: [
      "Cleaner elevated access from deck to grade",
      "More resolved exterior lines across stairs, landing, and railing",
      "Durable detailing for exposed outdoor conditions",
    ],
    outcome:
      "The rebuilt deck and stair sequence gives the home a stronger, more dependable outdoor connection. It improves both daily access and the exterior impression of the property.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The goal was to make the upper access route feel intentional and dependable. Proportion, landing clarity, railing alignment, and the way the stairs met the exterior all mattered because this element is both functional and highly visible.",
      },
      {
        heading: "Execution Notes",
        body:
          "Exterior stair and deck work has to resolve structure, weather exposure, and finish quality at the same time. Framing, fastening, transitions, and final detailing were coordinated so the rebuild felt solid rather than simply replaced.",
      },
    ],
  },
  {
    slug: "framed-bathroom-renovation",
    title: "Framed Bathroom Renovation",
    year: "2025",
    updatedAt: "2026-04-30",
    category: "Bathroom Renovation",
    location: "Greater Victoria",
    summary:
      "A framed bathroom renovation that moved from exposed construction stages into a finished, cleaner bathroom with brighter tile, coordinated fixtures, and sharper trim details.",
    intro:
      "This project shows the bathroom build through framing, rough-in, and final finish. The work focused on turning a compact construction shell into a complete bathroom with clean tile, practical fixture placement, and a more polished daily-use feel.",
    heroImage: "/images/victoria-framed-bathroom-renovation-001.webp",
    coverImage: "/images/victoria-framed-bathroom-renovation-001.webp",
    galleryImages: [
      "/images/victoria-framed-bathroom-renovation-001.webp",
      "/images/victoria-framed-bathroom-renovation-002.webp",
      "/images/victoria-framed-bathroom-renovation-003.webp",
      "/images/victoria-framed-bathroom-renovation-004.webp",
      "/images/victoria-framed-bathroom-renovation-005.webp",
      "/images/victoria-framed-bathroom-renovation-006.webp",
      "/images/victoria-framed-bathroom-renovation-007.webp",
      "/images/victoria-framed-bathroom-renovation-008.webp",
    ],
    beforeAfterImages: [
      {
        label: "Bathroom renovation",
        beforeImage: "/images/victoria-framed-bathroom-renovation-008.webp",
        afterImage: "/images/victoria-framed-bathroom-renovation-001.webp",
        beforeAlt: "Framed bathroom renovation before construction",
        afterAlt: "Finished framed bathroom renovation by CVR Construction",
      },
    ],
    scope: [
      "Bathroom framing and renovation",
      "Plumbing and fixture coordination",
      "Tile, tub, and wall finish installation",
      "Trim, paint, and final detailing",
    ],
    highlights: [
      "Visible construction sequence from framing to finished bathroom",
      "Clean tile and fixture coordination in a compact footprint",
      "Sharper finished envelope with brighter daily-use surfaces",
    ],
    outcome:
      "The finished bathroom feels clean, practical, and fully resolved. The project sequence shows how the rough framed condition was brought through each stage into a more durable and polished room.",
    storySections: [
      {
        heading: "Design Priorities",
        body:
          "The priority was to make a compact bathroom feel complete and orderly without overcomplicating the finish palette. Bright tile, clean fixture placement, and tight trim work helped the final room feel more open and usable.",
      },
      {
        heading: "Execution Notes",
        body:
          "The construction sequence mattered because the finished quality depended on the early layers. Framing, rough-in coordination, waterproofing prep, tile layout, and final trim all had to line up before the room could read as polished.",
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

export const landingProjects = projects.filter(
  (project) =>
    project.slug !== "modern-bath-and-laundry-suite" &&
    project.slug !== "legacy-wood-kitchen" &&
    project.slug !== "upper-deck-and-stairs" &&
    project.slug !== "framed-bathroom-renovation"
);

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
    title: "Rustic Cabin Kitchen",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-025.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "Rustic checkerboard cabin kitchen renovation by CVR Construction",
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
    title: "Modern Bath And Laundry Suite",
    image: "/images/victoria-modern-bath-and-laundry-suite-004.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "Modern bathroom and laundry suite remodel by CVR Construction",
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
    title: "Legacy Wood Kitchen",
    image: "/images/victoria-legacy-wood-kitchen-001.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "legacy wood kitchen by CVR Construction",
  },
  {
    title: "Legacy Wood Kitchen",
    image: "/images/victoria-legacy-wood-kitchen-002.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "legacy wood kitchen by CVR Construction",
  },
  {
    title: "Legacy Wood Kitchen",
    image: "/images/victoria-legacy-wood-kitchen-003.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "legacy wood kitchen by CVR Construction",
  },
  {
    title: "White Basement Suite",
    image: "/images/victoria-white-basement-suite-2024-001.webp",
    category: "Interior",
    eyebrow: "Basement Suite",
    alt: "white basement suite by CVR Construction",
  },
  {
    title: "Gray Siding And Forest Shed",
    image: "/images/victoria-gray-siding-and-forest-shed-001.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "gray siding and forest shed by CVR Construction",
  },
  {
    title: "Gray Siding And Forest Shed",
    image: "/images/victoria-gray-siding-and-forest-shed-002.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "gray siding and forest shed by CVR Construction",
  },
  {
    title: "Gray Siding And Forest Shed",
    image: "/images/victoria-gray-siding-and-forest-shed-003.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "gray siding and forest shed by CVR Construction",
  },
  {
    title: "Gray Siding And Forest Shed",
    image: "/images/victoria-gray-siding-and-forest-shed-004.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "gray siding and forest shed by CVR Construction",
  },
  {
    title: "Condo Kitchen And Marble Baths",
    image: "/images/victoria-condo-kitchen-and-marble-baths-001.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "condo kitchen and marble baths by CVR Construction",
  },
  {
    title: "Condo Kitchen And Marble Baths",
    image: "/images/victoria-condo-kitchen-and-marble-baths-002.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "condo kitchen and marble baths by CVR Construction",
  },
  {
    title: "Condo Kitchen And Marble Baths",
    image: "/images/victoria-condo-kitchen-and-marble-baths-003.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "condo kitchen and marble baths by CVR Construction",
  },
  {
    title: "Condo Kitchen And Marble Baths",
    image: "/images/victoria-condo-kitchen-and-marble-baths-004.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "condo kitchen and marble baths by CVR Construction",
  },
  {
    title: "Condo Kitchen And Marble Baths",
    image: "/images/victoria-condo-kitchen-and-marble-baths-005.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "condo kitchen and marble baths by CVR Construction",
  },
  {
    title: "Condo Kitchen And Marble Baths",
    image: "/images/victoria-condo-kitchen-and-marble-baths-006.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "condo kitchen and marble baths by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-001.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-002.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-003.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-004.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-005.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-006.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-007.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-008.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-009.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-010.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-011.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-012.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-013.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-014.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-015.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-016.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-017.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-018.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-019.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-020.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-021.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-022.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-023.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-024.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-026.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Kitchen Remodelling",
    image: "/images/victoria-rustic-checkerboard-cabin-kitchen-027.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "rustic checkerboard cabin kitchen by CVR Construction",
  },
  {
    title: "Upper Deck And Stairs",
    image: "/images/victoria-upper-deck-and-stairs-001.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "upper deck and stairs by CVR Construction",
  },
  {
    title: "Upper Deck And Stairs",
    image: "/images/victoria-upper-deck-and-stairs-002.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "upper deck and stairs by CVR Construction",
  },
  {
    title: "Upper Deck And Stairs",
    image: "/images/victoria-upper-deck-and-stairs-003.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "upper deck and stairs by CVR Construction",
  },
  {
    title: "Upper Deck And Stairs",
    image: "/images/victoria-upper-deck-and-stairs-004.webp",
    category: "Exterior",
    eyebrow: "Exterior Upgrade",
    alt: "upper deck and stairs by CVR Construction",
  },
  {
    title: "Modern Bath And Laundry Suite",
    image: "/images/victoria-modern-bath-and-laundry-suite-003.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "modern bath and laundry suite by CVR Construction",
  },
  {
    title: "Modern Bath And Laundry Suite",
    image: "/images/victoria-modern-bath-and-laundry-suite-005.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "modern bath and laundry suite by CVR Construction",
  },
  {
    title: "Modern Bath And Laundry Suite",
    image: "/images/victoria-modern-bath-and-laundry-suite-006.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "modern bath and laundry suite by CVR Construction",
  },
  {
    title: "Modern Bath And Laundry Suite",
    image: "/images/victoria-modern-bath-and-laundry-suite-007.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "modern bath and laundry suite by CVR Construction",
  },
  {
    title: "Modern Bath And Laundry Suite",
    image: "/images/victoria-modern-bath-and-laundry-suite-008.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "modern bath and laundry suite by CVR Construction",
  },
  {
    title: "White Railing Deck",
    image: "/images/victoria-white-railing-deck-001.webp",
    category: "Exterior",
    eyebrow: "Deck Upgrade",
    alt: "white railing deck by CVR Construction",
  },
  {
    title: "White Railing Deck",
    image: "/images/victoria-white-railing-deck-002.webp",
    category: "Exterior",
    eyebrow: "Deck Upgrade",
    alt: "white railing deck by CVR Construction",
  },
  {
    title: "Green Tile Bath And Mudroom",
    image: "/images/victoria-green-tile-bath-and-mudroom-001.webp",
    category: "Bathroom",
    eyebrow: "Bathroom & Mudroom Renovation",
    alt: "green tile bath and mudroom by CVR Construction",
  },
  {
    title: "Green Tile Bath And Mudroom",
    image: "/images/victoria-green-tile-bath-and-mudroom-002.webp",
    category: "Bathroom",
    eyebrow: "Bathroom & Mudroom Renovation",
    alt: "green tile bath and mudroom by CVR Construction",
  },
  {
    title: "Green Tile Bath And Mudroom",
    image: "/images/victoria-green-tile-bath-and-mudroom-003.webp",
    category: "Bathroom",
    eyebrow: "Bathroom & Mudroom Renovation",
    alt: "green tile bath and mudroom by CVR Construction",
  },
  {
    title: "Green Tile Bath And Mudroom",
    image: "/images/victoria-green-tile-bath-and-mudroom-004.webp",
    category: "Bathroom",
    eyebrow: "Bathroom & Mudroom Renovation",
    alt: "green tile bath and mudroom by CVR Construction",
  },
  {
    title: "Green Tile Bath And Mudroom",
    image: "/images/victoria-green-tile-bath-and-mudroom-005.webp",
    category: "Bathroom",
    eyebrow: "Bathroom & Mudroom Renovation",
    alt: "green tile bath and mudroom by CVR Construction",
  },
  {
    title: "Dark Gray Kitchen And Bath",
    image: "/images/victoria-dark-gray-kitchen-and-bath-001.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "dark gray kitchen and bath by CVR Construction",
  },
  {
    title: "Dark Gray Kitchen And Bath",
    image: "/images/victoria-dark-gray-kitchen-and-bath-002.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "dark gray kitchen and bath by CVR Construction",
  },
  {
    title: "Dark Gray Kitchen And Bath",
    image: "/images/victoria-dark-gray-kitchen-and-bath-003.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "dark gray kitchen and bath by CVR Construction",
  },
  {
    title: "Dark Gray Kitchen And Bath",
    image: "/images/victoria-dark-gray-kitchen-and-bath-004.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "dark gray kitchen and bath by CVR Construction",
  },
  {
    title: "Dark Gray Kitchen And Bath",
    image: "/images/victoria-dark-gray-kitchen-and-bath-005.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "dark gray kitchen and bath by CVR Construction",
  },
  {
    title: "Dark Gray Kitchen And Bath",
    image: "/images/victoria-dark-gray-kitchen-and-bath-006.webp",
    category: "Kitchen & Bath",
    eyebrow: "Kitchen & Bathroom Renovation",
    alt: "dark gray kitchen and bath by CVR Construction",
  },
  {
    title: "Outbuilding Garage Conversion",
    image: "/images/victoria-outbuilding-bath-conversion-after-final-main.webp",
    category: "Garage",
    eyebrow: "Garage Conversion",
    alt: "outbuilding garage conversion by CVR Construction",
  },
  {
    title: "Framed Bathroom Renovation",
    image: "/images/victoria-framed-bathroom-renovation-001.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "framed bathroom renovation by CVR Construction",
  },
  {
    title: "Framed Bathroom Renovation",
    image: "/images/victoria-framed-bathroom-renovation-002.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "framed bathroom renovation by CVR Construction",
  },
  {
    title: "Framed Bathroom Renovation",
    image: "/images/victoria-framed-bathroom-renovation-003.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "framed bathroom renovation by CVR Construction",
  },
  {
    title: "Forest Cabin And Outhouse",
    image: "/images/victoria-forest-cabin-and-outhouse-001.webp",
    category: "Custom Space",
    eyebrow: "Cabin & Outhouse",
    alt: "forest cabin and outhouse by CVR Construction",
  },
  {
    title: "Forest Cabin And Outhouse",
    image: "/images/victoria-forest-cabin-and-outhouse-002.webp",
    category: "Custom Space",
    eyebrow: "Cabin & Outhouse",
    alt: "forest cabin and outhouse by CVR Construction",
  },
  {
    title: "Forest Cabin And Outhouse",
    image: "/images/victoria-forest-cabin-and-outhouse-003.webp",
    category: "Custom Space",
    eyebrow: "Cabin & Outhouse",
    alt: "forest cabin and outhouse by CVR Construction",
  },
  {
    title: "Forest Cabin And Outhouse",
    image: "/images/victoria-forest-cabin-and-outhouse-004.webp",
    category: "Custom Space",
    eyebrow: "Cabin & Outhouse",
    alt: "forest cabin and outhouse by CVR Construction",
  },
  {
    title: "Forest Cabin And Outhouse",
    image: "/images/victoria-forest-cabin-and-outhouse-005.webp",
    category: "Custom Space",
    eyebrow: "Cabin & Outhouse",
    alt: "forest cabin and outhouse by CVR Construction",
  },
  {
    title: "Small ADU Exterior And Rooms",
    image: "/images/victoria-small-adu-exterior-and-rooms-001.webp",
    category: "Custom Space",
    eyebrow: "ADU Build",
    alt: "small adu exterior and rooms by CVR Construction",
  },
  {
    title: "Small ADU Exterior And Rooms",
    image: "/images/victoria-small-adu-exterior-and-rooms-002.webp",
    category: "Custom Space",
    eyebrow: "ADU Build",
    alt: "small adu exterior and rooms by CVR Construction",
  },
  {
    title: "Beige House Washroom",
    image: "/images/victoria-beige-house-exterior-and-old-baths-washroom.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "beige house washroom by CVR Construction",
  },
  {
    title: "White Kitchen Suite",
    image: "/images/victoria-white-kitchen-suite-final.webp",
    category: "Kitchen",
    eyebrow: "Kitchen Renovation",
    alt: "white kitchen suite by CVR Construction",
  },
  {
    title: "White Shower Bath",
    image: "/images/victoria-white-shower-bath-single-001.webp",
    category: "Bathroom",
    eyebrow: "Bathroom Renovation",
    alt: "white shower bath by CVR Construction",
  },
] as const;

export const showroomContact = {
  addressLine1: "1057 Fort St",
  cityRegionPostal: "Victoria, BC V8V 3K5",
  country: "Canada",
  phone: "+1 (250) 466 6531",
  phoneHref: "tel:+12504666531",
  email: "cvrshowroom@outlook.com",
  emailHref: "mailto:cvrshowroom@outlook.com",
  mapsHref: "https://maps.app.goo.gl/6AWwv3gmKRYqnbrYA",
  instagram: "https://www.instagram.com/cvr_kitchenandbath/",
  facebook: "https://www.facebook.com/people/CVR-Kitchen-Bath/61592060245229/",
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
    streetAddress: showroomContact.addressLine1,
    addressLocality: "Victoria",
    addressRegion: "BC",
    postalCode: "V8V 3K5",
    addressCountry: "CA",
  },
  areaServed: ["Victoria, BC", "Greater Victoria", "Vancouver Island"],
  sameAs: [showroomContact.instagram, showroomContact.facebook],
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
  {
    href: "https://www.tiktok.com/@cvr.construction",
    label: "TikTok",
  },
  {
    href: "https://www.youtube.com/@cvrconstructionltd",
    label: "YouTube",
  },
  { href: "https://wa.me/12508801270", label: "WhatsApp" },
  { href: "https://maps.app.goo.gl/WpiNvvknAfY1fdir6", label: "Google" },
  { href: "https://www.yelp.ca/biz/cvr-construction-victoria", label: "Yelp" },
] as const;

export const trustLinks = [
  {
    label: "BBB Accredited",
    href: "https://www.bbb.org/ca/bc/victoria/profile/remodeling/cvr-construction-ltd-0047-235975091",
  },
  {
    label: "Google Reviews",
    href: "https://maps.app.goo.gl/WpiNvvknAfY1fdir6",
  },
  {
    label: "Yelp Reviews",
    href: "https://www.yelp.ca/biz/cvr-construction-victoria",
  },
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
  { value: "20", suffix: "+", label: "Years Experience" },
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

export const showroomHero = {
  src: "/images/victoria-premium-kitchen-interior.webp",
  alt: "CVR Showroom in-person product selection in Victoria BC",
};

export const contactHero = {
  src: "/images/victoria-front-entry-rebuild.webp",
  alt: "Front entry rebuild by CVR Construction in Victoria BC",
};

export const showroomPortrait = {
  src: "/images/victoria-kitchen-bath-material-selections.webp",
  alt: "Premium material and fixture selections inside the CVR Showroom",
};

export const showroomFacts = [
  { value: "1", suffix: "", label: "Design Guidance", displayValue: "1:1" },
  { value: "10", suffix: "+", label: "Premium Brands" },
  { value: "15", suffix: "", label: "Product Categories" },
  { value: "20", suffix: "+", label: "Years Experience" },
] as const;

export const aboutStudioPortrait = {
  image: "/images/victoria-home-entry-renovation-exterior.webp",
  alt: "CVR Construction completed home on Vancouver Island",
};

export type StudioPartner = {
  name: string;
};

// Placeholder partners — swap these with real collaborators when confirmed.
export const studioPartners: StudioPartner[] = [
  { name: "Westbrook Architects" },
  { name: "Aspen Timber Co." },
  { name: "Northbank Millwork" },
  { name: "Harbour Stone Supply" },
  { name: "Meridian Studio" },
  { name: "Coastline Joinery" },
  { name: "Fairhaven Lighting" },
  { name: "Keystone Tile Works" },
  { name: "Pacifica Electrical" },
  { name: "Parkside Cabinetry" },
];

export const studioYears = [
  "2013",
  "2016",
  "2019",
  "2021",
  "2024",
  "2026",
] as const;
