import { DatePicker } from '~/app/_components/date-picker';
import { ErrorBoundary } from '~/app/_components/error-boundary';
import { LoginButton } from '~/app/_components/login-button';
import { auth } from '~/server/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <ErrorBoundary>{session?.user ? <DatePicker /> : <LoginButton />}</ErrorBoundary>
      </div>
    </main>
  );
}
