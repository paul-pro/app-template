import { ErrorBoundary } from '~/app/_components/error-boundary';
import { LoginButton } from '~/app/_components/login-button';
import { auth } from '~/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container relative z-10 flex flex-col items-center justify-center gap-12 px-4">
        <ErrorBoundary>
          <LoginButton />
        </ErrorBoundary>
      </div>
    </main>
  );
}
