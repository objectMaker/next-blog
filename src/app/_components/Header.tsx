import Link from 'next/link';
import Image from 'next/image';

import Search from './Search';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-slate-100 p-2">
      <Link href="/">
        <Image src="/cat.svg" height={40} width={40} alt="home"></Image>
      </Link>
      <Search />
      <Button variant="ghost" asChild>
        <Link href="/signUp">signUp</Link>
      </Button>
    </header>
  );
}
