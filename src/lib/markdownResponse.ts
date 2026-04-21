import { NextResponse } from "next/server";

export type MarkdownInit = {
  body: string;
  title: string;
  path: string;
};

export function markdownResponse({ body, title, path }: MarkdownInit) {
  const tokens = Math.ceil(body.length / 4);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `inline; filename="${path.replace(/^\//, "") || "index"}.md"`,
      "Cache-Control": "public, max-age=300, must-revalidate",
      "Vary": "Accept",
      "X-Markdown-Source": `https://www.cvrconstruction.ca${path}`,
      "X-Markdown-Title": title,
      "x-markdown-tokens": String(tokens),
      "Link": '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc"',
    },
  });
}
