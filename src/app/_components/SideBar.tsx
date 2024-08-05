'use client';

import { cn } from '@/lib/utils';
import { BookText, PanelLeftOpen, UserRoundCog, House } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { selectCollapse, toggleCollapse } from '@/lib/collapseStore';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
export default function SideBar(props: { className?: string }) {
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
    },
  ];

  return (
    <div
      className={cn(
        'flex w-14 flex-col gap-y-4 bg-muted p-2 shadow-sm transition-all duration-100 ease-out',
        props.className,
        collapse ? 'w-16' : 'w-14 lg:w-56',
      )}
    >
      <div className="hidden justify-end lg:flex">
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
      {sideNavList.map((item) => (
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
