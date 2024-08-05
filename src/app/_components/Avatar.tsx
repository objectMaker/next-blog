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
import { handleSignOut } from '@/actions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
export default function NavigationMenuDemo({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <Button
                onClick={() => {
                  handleSignOut();
                  toast.success(
                    'Sign out successfully,automatically to signIn',
                  );
                }}
                variant="ghost"
                className="h-8"
              >
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
