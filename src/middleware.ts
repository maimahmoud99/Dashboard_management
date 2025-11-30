import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  console.log(" Middleware Check:", { pathname, hasToken: !!token });


  if (pathname === "/login") {
    if (token) {
      console.log("✅ Has token, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    console.log("⚠️ No token, staying on login");
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log("❌ No token, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    console.log("✅ Has token, accessing dashboard");
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"],
};