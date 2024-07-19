import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed flex h-16 w-full flex-row items-center justify-between  border-b px-12 drop-shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <Image width={50} height={50} src="/pig.svg" alt="small pig"></Image>
        </Link>
        <Link href="/user" className="mr-2">
          user
        </Link>
        <Link href="/article">article</Link>
      </div>
      <Link href="/login">login</Link>
    </header>
  );
}
