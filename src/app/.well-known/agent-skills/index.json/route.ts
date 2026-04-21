import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const SITE_ORIGIN = "https://www.cvrconstruction.ca";

type SkillEntry = {
  name: string;
  type: "skill";
  description: string;
  url: string;
  path: string;
};

const skills: SkillEntry[] = [
  {
    name: "contact-cvr-construction",
    type: "skill",
    description:
      "How an AI agent should help a user get in touch with CVR Construction in Victoria, BC.",
    url: `${SITE_ORIGIN}/.well-known/agent-skills/contact/SKILL.md`,
    path: "public/.well-known/agent-skills/contact/SKILL.md",
  },
  {
    name: "request-quote-cvr-construction",
    type: "skill",
    description:
      "How an AI agent should collect requirements and request a detailed quote from CVR Construction.",
    url: `${SITE_ORIGIN}/.well-known/agent-skills/request-quote/SKILL.md`,
    path: "public/.well-known/agent-skills/request-quote/SKILL.md",
  },
];

async function sha256OfFile(relPath: string): Promise<string> {
  const absPath = path.join(/* turbopackIgnore: true */ process.cwd(), relPath);
  const buf = await readFile(absPath);
  return createHash("sha256").update(buf).digest("hex");
}

export async function GET() {
  const entries = await Promise.all(
    skills.map(async ({ path: filePath, ...skill }) => ({
      ...skill,
      sha256: await sha256OfFile(filePath),
    })),
  );

  const body = {
    $schema:
      "https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schemas/v0.2.0/index.json",
    version: "0.2.0",
    site: {
      name: "CVR Construction",
      url: SITE_ORIGIN,
    },
    skills: entries,
  };

  return new NextResponse(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
