'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink() {
  const pathname = usePathname() as '/signUp';
  const pathnameMap = {
    '/signUp': '/signIn',
  };
  return (
    <Link href={pathnameMap[pathname] || '/signUp'} className="text-gray-500">
      to {pathnameMap[pathname]?.slice?.(1) || 'signUp'}
    </Link>
  );
}
