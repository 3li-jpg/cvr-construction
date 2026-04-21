"use client";

import { useEffect } from "react";

type JSONSchema = {
  type?: string;
  properties?: Record<string, unknown>;
  required?: string[];
  additionalProperties?: boolean;
  description?: string;
};

type WebMCPTool = {
  name: string;
  description: string;
  inputSchema: JSONSchema;
  execute: (args: unknown) => Promise<unknown> | unknown;
};

type WebMCPContext = {
  provideContext: (ctx: { tools: WebMCPTool[] }) => Promise<void> | void;
};

type NavigatorWithModelContext = Navigator & {
  modelContext?: WebMCPContext;
};

const CONTACT_INFO = {
  name: "CVR Construction Ltd.",
  email: "info@cvrconstruction.ca",
  phone: "+1-250-880-1270",
  whatsapp: "https://wa.me/12508801270",
  website: "https://www.cvrconstruction.ca",
  location: "Victoria, BC, Canada",
  hours: "Mon–Fri 08:00–17:00 PT",
  serviceArea: ["Greater Victoria, BC", "Saanich Peninsula", "Vancouver Island"],
};

const SERVICES = [
  "Whole-home renovations",
  "Kitchen renovations",
  "Bathroom renovations",
  "Commercial renovations and tenant improvements",
  "Custom garden studios and accessory spaces",
];

const PROJECT_TYPES = [
  "kitchen",
  "bathroom",
  "whole-home",
  "commercial",
  "garden-studio",
  "custom",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

function isProjectType(value: unknown): value is ProjectType {
  return typeof value === "string" && (PROJECT_TYPES as readonly string[]).includes(value);
}

export function WebMCPRegistrar() {
  useEffect(() => {
    const nav = navigator as NavigatorWithModelContext;
    if (!nav.modelContext?.provideContext) return;

    const tools: WebMCPTool[] = [
      {
        name: "getCompanyInfo",
        description:
          "Returns public company information about CVR Construction (name, location, services, service area, contact channels, hours).",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        execute() {
          return {
            ...CONTACT_INFO,
            services: SERVICES,
          };
        },
      },
      {
        name: "getContactChannels",
        description:
          "Returns every public channel to reach CVR Construction: email, phone, WhatsApp, web form, and social media.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        execute() {
          return {
            email: CONTACT_INFO.email,
            phone: CONTACT_INFO.phone,
            whatsapp: CONTACT_INFO.whatsapp,
            contactForm: `${CONTACT_INFO.website}/contact`,
            instagram: "https://www.instagram.com/cvr_construction_ltd/",
            facebook: "https://www.facebook.com/profile.php?id=61552800609732",
            hours: CONTACT_INFO.hours,
          };
        },
      },
      {
        name: "requestQuote",
        description:
          "Navigates the user to the CVR Construction contact page, pre-filling project type and notes so they can submit a renovation or construction quote request. Requires user consent before calling.",
        inputSchema: {
          type: "object",
          properties: {
            projectType: {
              type: "string",
              enum: [...PROJECT_TYPES],
              description:
                "Type of project. One of: kitchen, bathroom, whole-home, commercial, garden-studio, custom.",
            },
            location: {
              type: "string",
              description:
                "City or neighbourhood in Greater Victoria / Vancouver Island.",
            },
            timeline: {
              type: "string",
              description: "Desired start or completion timeline.",
            },
            budget: {
              type: "string",
              description: "Approximate budget range in CAD.",
            },
            notes: {
              type: "string",
              description: "Any additional project details the user wants to share.",
            },
          },
          required: ["projectType"],
          additionalProperties: false,
        },
        execute(rawArgs) {
          const args = (rawArgs ?? {}) as Record<string, unknown>;
          if (!isProjectType(args.projectType)) {
            return {
              status: "error",
              error: `projectType must be one of: ${PROJECT_TYPES.join(", ")}`,
            };
          }

          const qs = new URLSearchParams();
          qs.set("projectType", args.projectType);
          for (const key of ["location", "timeline", "budget", "notes"] as const) {
            const value = args[key];
            if (typeof value === "string" && value.trim().length > 0) {
              qs.set(key, value);
            }
          }
          const url = `/contact?${qs.toString()}`;
          window.location.href = url;
          return { status: "navigating", url };
        },
      },
    ];

    void nav.modelContext.provideContext({ tools });
  }, []);

  return null;
}
