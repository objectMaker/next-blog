'use client';

import Link from 'next/link';
import Image from 'next/image';

import Search from './Search';
import { Button } from '@/components/ui/button';
import Avatar from './Avatar';
import { useUserInfo } from '@/lib/hooks';
export default function Page() {
  const userInfo = useUserInfo();

  return (
    <header className="flex h-16 w-full items-center justify-between bg-slate-100 p-2">
      <Link href="/" className="w-48 cursor-pointer">
        <Image src="/cat.svg" height={40} width={40} alt="home"></Image>
      </Link>
      <Search />
      <div className="flex w-48 justify-end">
        {userInfo?.username ? (
          <Avatar>
            <div className="flex cursor-pointer items-center">
              <Image src="/pig.svg" width={42} height={42} alt="userImage" />
              {userInfo?.username}
            </div>
          </Avatar>
        ) : (
          <Button variant="ghost" asChild>
            <Link href="/signIn">signIn</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
