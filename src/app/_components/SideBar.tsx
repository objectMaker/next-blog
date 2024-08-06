'use client';

import { cn } from '@/lib/utils';
import {
  BookText,
  PanelLeftOpen,
  UserRoundCog,
  House,
  FilePlus,
} from 'lucide-react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { selectCollapse, toggleCollapse } from '@/lib/collapseStore';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SideBar(props: { className?: string; session: any }) {
  console.log(props.session, 'props.session');
  const dispatch = useAppDispatch();
  const collapse = useAppSelector(selectCollapse);
  const pathname = usePathname();
  const sideNavList = [
    {
      href: '/',
      words: 'home',
      icon: <House />,
    },
    {
      href: '/article',
      words: 'article',
      icon: <BookText />,
    },
    {
      href: '/setting',
      words: 'setting',
      icon: <UserRoundCog />,
      auth: true,
    },
    {
      href: '/create',
      words: 'create',
      icon: <FilePlus />,
      auth: true,
    },
  ];

  return (
    <div
      className={cn(
        'flex w-16 flex-col gap-y-4 bg-muted p-2 shadow-sm transition-all duration-100 ease-out',
        props.className,
        collapse ? 'w-16' : 'w-16 lg:w-56',
      )}
    >
      <div
        className={cn(
          'hidden justify-end lg:flex',
          collapse && 'justify-center',
        )}
      >
        {
          <PanelLeftOpen
            onClick={() => {
              dispatch(toggleCollapse());
            }}
            className={cn(
              'cursor-pointer text-muted-foreground',
              collapse ? '' : 'rotate-180',
            )}
          />
        }
      </div>
      {sideNavList
        .filter((item) => {
          return !(item.auth && !props.session);
        })
        .map((item) => (
          <Button
            asChild
            key={item.href}
            className={cn(
              'flex justify-center bg-secondary p-6 text-foreground hover:text-white',
              pathname === item.href ? 'bg-primary text-white' : '',
              collapse ? '' : 'justify-center lg:justify-between',
            )}
          >
            <Link href={item.href}>
              <div>{item.icon}</div>
              <h2 className={cn('hidden text-lg', collapse ? '' : 'lg:block')}>
                {item.words}
              </h2>
            </Link>
          </Button>
        ))}
    </div>
  );
}
