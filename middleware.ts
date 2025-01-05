import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const session = response.ok ? await response.json() : null;

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// This config is used by Next.js to optimize middleware execution.
// The middleware will only run on /dashboard routes, skipping unnecessary
// session checks on public pages.
export const config = {
  matcher: ["/dashboard"],
}; 