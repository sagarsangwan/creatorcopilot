import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  providers: [
    // ...
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account.provider === "google") {
        try {
          // Exchange Google ID token for Django tokens
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/`,

            {
              token: account.id_token,
              access_token: account.access_token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Store the Django tokens in the account object
          account.meta = response.data;
          return true;
        } catch (error) {
          console.error(
            "Error during Google sign in:",
            error.response?.data || error.message
          );
          return false;
        }
      }
      return false;
    },
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        if (account.provider === "google" && account.meta) {
          token.user = account.meta.user;
          token.access_token = account.meta.access;
          token.refresh_token = account.meta.refresh;
          token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        }
        return token;
      }

      // Token refresh
      if (getCurrentEpochTime() > token.ref || 0) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token/refresh/`,
            {
              refresh: token.refresh_token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.access) {
            token.access_token = response.data.access;
            // token.refresh_token = response.data.refresh;
            token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
          } else {
            console.error(
              "Invalid refresh token response format:",
              response.data
            );
            return { ...token, error: "InvalidRefreshResponse" };
          }
        } catch (error) {
          console.error(
            "Error refreshing token:",
            error.response?.data || error.message
          );
          // If refresh token is invalid, clear the tokens to force re-authentication
          if (error.response?.status === 401) {
            return {
              ...token,
              access_token: null,
              refresh_token: null,
              error: "RefreshAccessTokenError",
            };
          }
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.access_token = token.access_token;
        session.error = token.error;
        session.user.name = token.name;
        session.user.picture = token.picture;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },
});
