import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Agent & API Documentation | CVR Construction",
  description:
    "Discovery endpoints, content signals, and public links published by CVR Construction for AI agents.",
  alternates: { canonical: "/docs/api" },
  robots: { index: true, follow: true },
};

type Endpoint = {
  path: string;
  method: string;
  purpose: string;
  contentType: string;
  spec?: { label: string; href: string };
};

const ENDPOINTS: Endpoint[] = [
  {
    path: "/robots.txt",
    method: "GET",
    purpose:
      "Crawling rules plus Content-Signal preferences (ai-train, search, ai-input).",
    contentType: "text/plain",
    spec: {
      label: "Content Signals draft",
      href: "https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/",
    },
  },
  {
    path: "/.well-known/api-catalog",
    method: "GET",
    purpose: "Linkset pointing to service-doc, service-desc, status, and sitemap.",
    contentType: "application/linkset+json",
    spec: {
      label: "RFC 9727",
      href: "https://www.rfc-editor.org/rfc/rfc9727",
    },
  },
  {
    path: "/.well-known/agent-skills/index.json",
    method: "GET",
    purpose: "Agent Skills Discovery index (v0.2.0) with sha256-verified skills.",
    contentType: "application/json",
    spec: {
      label: "Agent Skills Discovery RFC",
      href: "https://github.com/cloudflare/agent-skills-discovery-rfc",
    },
  },
  {
    path: "/.well-known/agent-skills/contact/SKILL.md",
    method: "GET",
    purpose: "Markdown skill: how to contact CVR Construction.",
    contentType: "text/markdown",
  },
  {
    path: "/.well-known/agent-skills/request-quote/SKILL.md",
    method: "GET",
    purpose: "Markdown skill: how to collect info and request a quote.",
    contentType: "text/markdown",
  },
  {
    path: "/sitemap.xml",
    method: "GET",
    purpose: "Site-wide sitemap for crawlers.",
    contentType: "application/xml",
  },
  {
    path: "/api/health",
    method: "GET",
    purpose: "Liveness/health probe for agents and uptime checks.",
    contentType: "application/json",
  },
];

export default function DocsApiPage() {
  return (
    <main id="main-content" className="relative bg-white text-black">
      <Navbar />
      <section className="site-shell px-6 pb-24 pt-32 sm:px-8 md:px-12 md:pt-40 lg:px-20">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-black/60">
            Docs / Agent API
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Agent &amp; API Documentation
          </h1>
          <p className="mt-6 text-base leading-relaxed text-black/70">
            CVR Construction publishes a small set of discovery endpoints so AI
            agents can learn about the site, reach its contact surfaces, and
            read structured information about the business. This page is the
            {" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">service-doc</code>
            {" "}
            target advertised in the API catalog linkset.
          </p>
        </header>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold">Discovery endpoints</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-black/5 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Path</th>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium">Content-Type</th>
                  <th className="px-4 py-3 font-medium">Purpose</th>
                  <th className="px-4 py-3 font-medium">Spec</th>
                </tr>
              </thead>
              <tbody>
                {ENDPOINTS.map((endpoint) => (
                  <tr key={`${endpoint.method} ${endpoint.path}`} className="border-t border-black/10 align-top">
                    <td className="px-4 py-3 font-mono text-xs">{endpoint.path}</td>
                    <td className="px-4 py-3 font-mono text-xs">{endpoint.method}</td>
                    <td className="px-4 py-3 font-mono text-xs">{endpoint.contentType}</td>
                    <td className="px-4 py-3 text-black/70">{endpoint.purpose}</td>
                    <td className="px-4 py-3 text-black/70">
                      {endpoint.spec ? (
                        <a
                          className="underline decoration-dotted underline-offset-2 hover:text-black"
                          href={endpoint.spec.href}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {endpoint.spec.label}
                        </a>
                      ) : (
                        <span className="text-black/40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold">Not published</h2>
          <p className="mt-4 text-black/70">
            CVR Construction does not currently run protected APIs or an MCP
            server, so the following discovery documents are intentionally
            omitted:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-black/70">
            <li><code className="rounded bg-black/5 px-1 py-0.5">/.well-known/openid-configuration</code> — no OpenID provider.</li>
            <li><code className="rounded bg-black/5 px-1 py-0.5">/.well-known/oauth-authorization-server</code> — no OAuth AS.</li>
            <li><code className="rounded bg-black/5 px-1 py-0.5">/.well-known/oauth-protected-resource</code> — no protected resources.</li>
            <li><code className="rounded bg-black/5 px-1 py-0.5">/.well-known/mcp/server-card.json</code> — no hosted MCP server.</li>
          </ul>
        </section>

        <p className="mt-16 text-sm text-black/60">
          Questions or issues with an agent integration? <Link href="/contact" className="underline decoration-dotted underline-offset-2 hover:text-black">Reach out</Link>.
        </p>
      </section>
      <Footer />
    </main>
  );
}
