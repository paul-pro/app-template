import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { DefaultSession, NextAuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { env } from '~/env';
import { db } from '~/server/db';
import { accounts, sessions, verificationTokens } from '~/server/db/schema';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      twitterUsername?: string;
      twitterFollowers?: number;
      profileImageUrl?: string;
    } & DefaultSession['user'];
  }

  interface User {
    twitterUsername?: string;
    twitterFollowers?: number;
    profileImageUrl?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    TwitterProvider({
      clientId: env.AUTH_TWITTER_ID,
      clientSecret: env.AUTH_TWITTER_SECRET,
      version: '2.0',
      profile(profile) {
        if (!profile.data) {
          throw new Error('Twitter profile data is missing');
        }

        return {
          id: profile.data.id,
          name: profile.data.name ?? profile.data.username ?? 'Unknown',
          email: null, // Twitter API v2 doesn't provide email
          image: profile.data.profile_image_url,
          twitterUsername: profile.data.username,
          twitterFollowers: profile.data.public_metrics?.followers_count ?? 0,
          profileImageUrl: profile.data.profile_image_url,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.twitterUsername = user.twitterUsername;
        token.twitterFollowers = user.twitterFollowers;
        token.profileImageUrl = user.profileImageUrl;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.twitterUsername = token.twitterUsername as string;
        session.user.twitterFollowers = token.twitterFollowers as number;
        session.user.profileImageUrl = token.profileImageUrl as string;
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};
