import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAuthMutation } from "./redux/api/apiSlice";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  // Redirect authenticated users away from login/signup pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup"], // You can expand this to other routes
};
