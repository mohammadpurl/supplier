import NextAuthConfig from 'next-auth';

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async authorized({ auth, request }: { auth: any; request: any }) {
      const { nextUrl } = request;

      const isAuthenticated = !!auth?.user;

      const authRoutes = ["/auth/check-otp", "/auth/get-otp"];
      const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

      if (isAuthRoutes && isAuthenticated) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");

      if (isProtectedRoute && !isAuthenticated) {
        return Response.redirect(new URL("/signin", nextUrl));
      }

      return true;
    },
  },
  providers: [],
};
