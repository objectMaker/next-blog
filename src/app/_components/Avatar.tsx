'use client';

import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleSignOut } from '@/actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
      router.push('/signIn');
    } catch (err) {
      toast.error('sign out failed!');
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {children}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex w-48 flex-col gap-y-1 p-2">
              <Button asChild variant="ghost" className="h-8">
                <Link href="/setting">setting</Link>
              </Button>
              <Button onClick={signOut} variant="ghost" className="h-8">
                signOut
              </Button>
              <Button variant="ghost" className="h-8"></Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
