import '~/styles/globals.css';
import { Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@radix-ui/themes/styles.css';

import { TRPCReactProvider } from '~/trpc/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'App Template',
  description: 'A modern web application template',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Theme>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </Theme>
      </body>
    </html>
  );
}
