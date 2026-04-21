import { NextResponse } from "next/server";

export const dynamic = "force-static";

const SITE_ORIGIN = "https://www.cvrconstruction.ca";

export function GET() {
  const body = {
    linkset: [
      {
        anchor: `${SITE_ORIGIN}/`,
        "service-doc": [
          {
            href: `${SITE_ORIGIN}/docs/api`,
            type: "text/html",
            title: "CVR Construction public site & agent API documentation",
          },
        ],
        "service-desc": [
          {
            href: `${SITE_ORIGIN}/.well-known/agent-skills/index.json`,
            type: "application/json",
            title: "Agent skills discovery index",
          },
        ],
        status: [
          {
            href: `${SITE_ORIGIN}/api/health`,
            type: "application/json",
            title: "Health check",
          },
        ],
        sitemap: [
          {
            href: `${SITE_ORIGIN}/sitemap.xml`,
            type: "application/xml",
            title: "Sitemap",
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
