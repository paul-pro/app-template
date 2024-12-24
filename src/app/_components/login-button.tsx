'use client';

import { Button } from '@radix-ui/themes';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export function LoginButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn('twitter', {
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('Failed to sign in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return <Button disabled>Loading...</Button>;
  }

  if (session) {
    return <Button onClick={handleSignOut}>Sign out</Button>;
  }

  return <Button onClick={handleSignIn}>Sign in with Twitter</Button>;
}
