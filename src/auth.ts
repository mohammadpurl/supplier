import NextAuth, { CredentialsSignin } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { createData } from "./core/http-service/http-service";
import { NewVerifyUserModel, NNewVerifyUserModel, VerifyUserModel } from "./app/(auth)/verify/_types/verify-user.type";
import { User, UserSession, UserToken } from "./types/user.interface";
import { API_URL } from "./configs/global";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { Problem } from "./types/http-errors.interface";
import { authConfig } from "./auth.config";
import { RawAxiosRequestHeaders } from "axios";

declare module "next-auth" {
  interface User {
    accessToken: string;
  }

  interface Session {
    user: UserSession;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserToken;
  }
}

export class AuthroizeError extends CredentialsSignin {
  problem: Problem;
  constructor(err: Problem) {
    super();
    this.problem = err;
  }
}

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
  
} = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "text" },
        grant_type:{  label:"grant_type", type: "text"},
        client_id:{  label:"client_id", type: "text"},
        client_secret:{  label:"client_secret", type: "text"},
      },
      async authorize(credentials) {
        try {
          const formData = new URLSearchParams();
          formData.append("grant_type", "password");
          formData.append("username", credentials.username as string);
          formData.append("password", credentials.password as string);
          formData.append("scope", "user");
          formData.append("client_id", "supplier-client");
          formData.append("client_secret", "supplier-secret");
          
          const user = await createData<NNewVerifyUserModel, User>(
            `${API_URL}/auth/check-otp`,
            { formData }
          );
          console.log("logged innnnnnnnnnnn",user)
          // Auth.js expects the user object to be returned
          return {
            accessToken: user.access_token,
          };
        } catch (error: unknown) {
          throw new AuthroizeError(error as Problem);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt");
      console.log(user);
      if (user) {
        token.user = jwtDecode<UserToken>(user.accessToken);
        token.user.accessToken = user.accessToken;
        console.log("jwt accessToken",token)
      }

      return token;
    },
    async session({ session, token }) {
      console.log("dgggtttthgh",token)
      Object.assign(session.user, token.user ?? {});
      console.log("sessionsessionsessionsessionsession",session)
      return session;
    },
  },
});
