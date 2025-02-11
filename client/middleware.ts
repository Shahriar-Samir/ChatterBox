import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  // Validate token (Ensures it's present & meaningful)
  const isValidToken =
    !!token && token !== "undefined" && token !== "null" && token.length > 10;

  // Define protected routes (Require authentication)
  const protectedRoutes = ["/", "/search"];
  const isProtectedRoute =
    protectedRoutes.includes(pathname) || pathname.match(/^\/[^/]+$/); // Matches "/:cid"

  // Define authentication pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // 🟥 If not authenticated & on a protected route, redirect to login
  if (!isValidToken && isProtectedRoute) {
    if (pathname !== "/login" && pathname !== "/signup") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🟩 If authenticated & on login/signup, redirect to home (avoid redirect loop)
  if (isValidToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/search/:path*", "/:path*"], // Matches protected & auth routes
};
