import Link from 'next/link';
import Image from 'next/image';

// import Search from './Search';
// import { Button } from '@/components/ui/button';
import Avatar from './Avatar';
// import { useUserInfo } from '@/lib/hooks';
import ToggleTheme from './ToggleTheme';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
export default async function Page() {
  const session = await auth();
  console.log(session);
  return (
    <header className="relative flex h-16 w-full items-center justify-between bg-slate-100 p-2 px-14 text-card-foreground dark:bg-slate-600 dark:text-white">
      <Link href="/" className="w-48 cursor-pointer">
        <Image src="/cat.svg" height={40} width={40} alt="home"></Image>
      </Link>
      <ToggleTheme className="absolute right-2 top-1/2 -translate-y-1/2" />
      <div className="flex w-48 justify-end">
        {session?.user ? (
          <Avatar>
            <div className="flex cursor-pointer items-center">
              {session?.user?.email}
            </div>
          </Avatar>
        ) : (
          <Button variant="link" asChild>
            <Link href="signIn">signIn</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
