'use client';

import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleSignOut } from '@/actions';
import { toast } from 'sonner';

export default function NavigationMenuDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const signOut = async () => {
    try {
      await handleSignOut();
      toast.success('sign out successfully,go to home page automatically');
      router.push('/');
    } catch (err) {
      toast.error('sign out failed!');
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{children}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-6 md:w-[200px] lg:w-[200px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div>
                    <Link href="/setting">setting</Link>
                    <div onClick={signOut}>signOut</div>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
