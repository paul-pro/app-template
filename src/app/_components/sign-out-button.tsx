'use client';

import { signOut } from '~/lib/auth-client';
import { useState } from 'react';

export function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = '/';
          },
        },
      });
    } catch (error) {
      console.error('Failed to sign out:', error);
      setIsSigningOut(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isSigningOut}
      className='rounded-md border border-zinc-200 px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900'
    >
      {isSigningOut ? 'Signing out...' : 'Sign out'}
    </button>
  );
}