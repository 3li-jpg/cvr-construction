import { NextResponse, type NextRequest } from "next/server";

const MARKDOWN_ROUTES: Record<string, string> = {
  "/": "/api/md/home",
  "/about": "/api/md/about",
  "/contact": "/api/md/contact",
};

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  return accept.split(",").some((part) => {
    const [type] = part.trim().split(";");
    return type === "text/markdown" || type === "text/x-markdown";
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const target = MARKDOWN_ROUTES[pathname];

  if (target && wantsMarkdown(request.headers.get("accept"))) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    const res = NextResponse.rewrite(url);
    res.headers.set("Vary", "Accept");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/about", "/contact"],
};
