import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth"; // مطمئن شو این مسیر درست است

const PUBLIC_PATHS = ["/signin", "/verify", "/api/auth", "/_next", "/favicon.ico"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath));
}

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();

  // اگر کاربر لاگین است و می‌خواهد به صفحه signin یا verify برود، ریدایرکت کن به صفحه اصلی
  if (session && ["/signin", "/verify"].some((p) => nextUrl.pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // اگر مسیر public است، اجازه بده ادامه دهد
  if (isPublicPath(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // اگر کاربر لاگین نیست و می‌خواهد به صفحه محافظت‌شده برود، ریدایرکت کن به signin
  if (!session) {
    const url = nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Create a new response
  const response = NextResponse.next();

  // Add the Authorization header if we have a session
  if (session?.user?.accessToken) {
    response.headers.set('Authorization', `Bearer ${session.user.accessToken}`);
  }

  
  return response;
}

// فقط روی مسیرهای داشبورد اجرا شود یا کل سایت (بسته به نیازت)
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
