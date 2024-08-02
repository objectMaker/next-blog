'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Github } from 'lucide-react';
import { signInAction } from '@/actions';
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() as '/signUp';
  const pathnameMap = {
    '/signUp': '/signIn',
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="-mt-16">
        <div className="flex flex-col items-center gap-y-1 pb-4">
          <Image
            src="/pig.svg"
            width={120}
            height={120}
            alt="Picture of the pig"
          />
          <div className="h-8 rounded-sm bg-gray-800 p-2 text-center text-lg font-bold leading-[100%] text-white">
            well come to {pathname.slice(1)}
          </div>
        </div>
        <div className="w-[500px] overflow-hidden rounded-md border border-gray-200 shadow-lg">
          <div className="p-5 shadow-lg">
            {children}
            <div className="flex items-center justify-between">
              <div className="text-gray-500">already have an account?</div>
              <Button asChild variant="link" className="p-0 text-gray-500">
                <Link href={pathnameMap[pathname] || '/signUp'}>
                  to {pathnameMap[pathname]?.slice?.(1) || 'signUp'}
                </Link>
              </Button>
            </div>
            <Separator className="my-2"></Separator>
            <footer className="flex w-full items-center justify-between text-gray-500">
              <div>third party login:</div>
              <div className="flex items-center gap-x-2">
                <form action={signInAction}>
                  <Button className="size-10 rounded-full p-2" title="github">
                    <Github className="size-5" />
                  </Button>
                </form>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
