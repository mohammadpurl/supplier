import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async authorized({ auth, request }) {
      const { nextUrl } = request;

      const isAuthenticated = !!auth?.user;

      const authRoutes = ["/signin", "/verify", "/api/auth", "/_next", "/favicon.ico"];
      const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

      if (isAuthRoutes && isAuthenticated) {
        return Response.redirect(new URL("/", nextUrl));
      }

      const isProtectedRoute = nextUrl.pathname.startsWith("/");

      if (isProtectedRoute && !isAuthenticated) {
        return Response.redirect(new URL("/signin", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
