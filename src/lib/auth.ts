import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from "better-auth/next-js";
import { db } from '~/server/db';
import { env } from '~/env';
import { z } from 'zod';

const twitterProfileSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    profile_image_url: z.string().optional(),
    public_metrics: z.object({
      followers_count: z.number(),
    }).optional(),
  }),
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    additionalFields: {
      twitterUsername: {
        type: "string",
      },
      twitterFollowers: {
        type: "number",
        nullable: true,
      },
    },
  },
  socialProviders: {
    twitter: {
      clientId: env.AUTH_TWITTER_ID,
      clientSecret: env.AUTH_TWITTER_SECRET,
      scope: ['users.read', 'tweet.read'],
      getUserInfo: async (token) => {
        const response = await fetch(
          'https://api.twitter.com/2/users/me?user.fields=public_metrics,profile_image_url',
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        );
        const profile = await response.json();
        
        try {
          const parsed = twitterProfileSchema.parse(profile);
          const { data } = parsed;
          
          return {
            user: {
              id: data.id,
              name: data.name,
              email: data.username || null,
              image: data.profile_image_url,
              emailVerified: false,
              twitterUsername: data.username,
              twitterFollowers: data.public_metrics?.followers_count ?? null,
            },
            data: profile,
          };
        } catch (error) {
          console.error('Failed to parse Twitter profile:', error);
          throw error;
        }
      },
    },
  },
  session: {
    freshAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  plugins: [nextCookies()], // for handling cookies in server actions
}); 