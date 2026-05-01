import type { NextConfig } from "next";

const agentLinkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/skills-index"; type="application/json"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects/outbuilding-bath-conversion",
        destination: "/projects/outbuilding-garage-conversion",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "Link", value: agentLinkHeader },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/about",
        headers: [
          { key: "Link", value: agentLinkHeader },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/contact",
        headers: [
          { key: "Link", value: agentLinkHeader },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/.well-known/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
