'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex h-16 flex-row justify-between px-6">
      <div className="flex flex-row">
        <Link href="/user" className="mr-2">
          user
        </Link>
        <Link href="/article">article</Link>
      </div>
      <div>users</div>
    </header>
  );
}
