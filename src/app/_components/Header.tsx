import Link from 'next/link';
import Image from 'next/image';

import Search from './Search';
import { Button } from '@/components/ui/button';
import { getUserInfoByJwt } from '@/actions';

export default async function Page() {
  const userInfo = await getUserInfoByJwt();
  return (
    <header className="flex h-16 w-full items-center justify-between bg-slate-100 p-2">
      <Link href="/" className="cursor-pointer">
        <Image src="/cat.svg" height={40} width={40} alt="home"></Image>
      </Link>
      <Search />
      {userInfo ? (
        <div className="flex cursor-pointer items-center">
          <Image src="/pig.svg" width={42} height={42} alt="userImage" />
          {userInfo?.username}
        </div>
      ) : (
        <Button variant="ghost" asChild>
          <Link href="/signUp">signUp</Link>
        </Button>
      )}
    </header>
  );
}
