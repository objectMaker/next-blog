import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const token = cookies().get('token');
  return (
    <header className="flex h-16 w-full flex-row items-center justify-between  border-b px-12 drop-shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <Image width={50} height={50} src="/pig.svg" alt="small pig"></Image>
        </Link>
        <Button asChild className="mr-2" size="sm" variant="outline">
          <Link href="/user">user</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/article">article</Link>
        </Button>
      </div>
      {token?.value ? (
        <div className="flex items-center justify-center">
          <Image width={50} height={50} src="/pig.svg" alt="small pig"></Image>{' '}
          <span>猪猪在线</span>
        </div>
      ) : (
        <Button asChild>
          <Link href="/signIn">signIn</Link>
        </Button>
      )}
    </header>
  );
}
