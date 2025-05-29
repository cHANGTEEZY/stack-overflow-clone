import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "./lib/api";
import { ActionResponse } from "./types/global";
import { IAccount } from "./database/account.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },

    async jwt({ token, account }) {
      if (account) {
        const { success, data: existingAccount } =
          (await api.accounts.getByProvider(
            account.type === "credentials"
              ? (token.email ?? "")
              : (account.providerAccountId ?? "")
          )) as ActionResponse<IAccount>;

        if (!success || !existingAccount?.userId) return token;

        const userId = existingAccount.userId;
        token.sub = userId.toString();
      }
      return token;
    },

    async signIn({ user, profile, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        name: user.name,
        email: user.email,
        image: user.image ?? "",
        username:
          account.provider === "github"
            ? (profile?.nickname ?? user.name?.toLowerCase() ?? "")
            : (user.name?.toLowerCase() ?? ""),
      };
      const { success } = (await api.auth.OauthSignIn({
        user: {
          name: userInfo.name ?? "",
          email: userInfo.email ?? "",
          image: userInfo.image,
          username: userInfo.username,
        },
        provider: account.provider as "github" | "google",
        providerAccountId: account.providerAccountId as string,
      })) as ActionResponse;

      if (!success) return false;
      return true;
    },
  },
});
