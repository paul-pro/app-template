import { SignOutButton } from '~/app/_components/sign-out-button';
import { auth } from '~/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute right-8 top-8">
        <SignOutButton />
      </div>
      <div className="container relative z-10 flex flex-col items-center justify-center gap-12 px-4">
        <h1 className="text-4xl font-bold">Welcome to Dashboard</h1>
      </div>
    </main>
  );
} 