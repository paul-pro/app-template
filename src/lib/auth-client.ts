import { createAuthClient } from "better-auth/react";

const baseURL = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/auth`;

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signOut, useSession } = authClient; 