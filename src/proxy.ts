import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { signToken, verifyToken } from "@/lib/auth/session";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/auth"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session");
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/auth/v1/login", request.url));
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && sessionCookie) {
    try {
      await verifyToken(sessionCookie.value);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
      // Invalid session, let them through to auth pages
    }
  }

  const res = NextResponse.next();

  // Refresh session on GET requests
  if (sessionCookie && request.method === "GET") {
    try {
      const parsed = await verifyToken(sessionCookie.value);
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookies.set({
        name: "session",
        value: await signToken({
          ...parsed,
          expires: expiresInOneDay.toISOString(),
        }),
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: expiresInOneDay,
      });
    } catch (error) {
      console.error("Error updating session:", error);
      res.cookies.delete("session");
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/v1/login", request.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
