import '~/styles/globals.css';

import { Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@radix-ui/themes/styles.css';

import { headers } from 'next/headers';
import { AuthProvider } from '~/app/_components/auth-provider';
import { TRPCReactProvider } from '~/trpc/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Date Picker App',
  description: 'Select and save dates with Twitter authentication',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Theme>
          <AuthProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
