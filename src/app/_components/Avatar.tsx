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
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks';
import { incremented, initializeCount, selectCount } from '@/lib/counterSlice';
import { useRef } from 'react';
export default function NavigationMenuDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useAppStore();
  const state = store.getState();
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

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
          <NavigationMenuTrigger className="bg-transparent">
            {children}
            {JSON.stringify(state)}
            {count}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex w-48 flex-col gap-y-1 p-2">
              <Button asChild variant="ghost" className="h-8">
                <Link href="/setting">setting</Link>
              </Button>
              <Button onClick={signOut} variant="ghost" className="h-8">
                signOut
              </Button>
              <Button
                onClick={() => {
                  dispatch(incremented());
                }}
                variant="ghost"
                className="h-8"
              ></Button>
              count++
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
