import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  console.log("🔍 Middleware Check:", { pathname, hasToken: !!token });

  // إذا المستخدم على صفحة login
  if (pathname === "/login") {
    // لو عنده token، يروح على dashboard
    if (token) {
      console.log("✅ Has token, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // لو مفيش token، يفضل في login
    console.log("⚠️ No token, staying on login");
    return NextResponse.next();
  }

  // إذا المستخدم على صفحة dashboard أو أي صفحة محمية
  if (pathname.startsWith("/dashboard")) {
    // لو مفيش token، يروح على login
    if (!token) {
      console.log("❌ No token, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // لو عنده token، يدخل dashboard
    console.log("✅ Has token, accessing dashboard");
    return NextResponse.next();
  }

  // باقي الصفحات
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"],
};