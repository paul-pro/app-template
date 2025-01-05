'use client';

import { signIn, useSession } from '~/lib/auth-client';
import { useState } from 'react';

export function LoginButton() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn.social({
        provider: 'twitter',
        callbackURL: '/',
      });
    } catch (error) {
      console.error('Failed to sign in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session && (session === undefined || isLoading)) {
    return (
      <button
        disabled
        className='rounded-md bg-zinc-800/90 px-6 py-2 text-white opacity-50'
      >
        Connecting...
      </button>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className='rounded-md bg-zinc-800 px-6 py-2 text-white transition-colors hover:bg-zinc-900'
    >
      Sign in with Twitter
    </button>
  );
}
