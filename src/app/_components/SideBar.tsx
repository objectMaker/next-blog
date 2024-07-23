'use client';

import { cn } from '@/lib/utils';
import { PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { selectCollapse, toggleCollapse } from '@/lib/collapseStore';
export default function SideBar(props: { className?: string }) {
  const dispatch = useAppDispatch();
  const collapse = useAppSelector(selectCollapse);
  const sideNavList = [
    {
      href: '/',
      words: '导航',
      icon: 'xx',
    },
    {
      href: '/article',
      words: '文章',
      icon: 'xx',
    },
    {
      href: '/diary',
      words: '日记',
      icon: 'xx',
    },
  ];

  return (
    <div
      className={cn(
        ' flex flex-col gap-y-2 bg-slate-200 p-2 shadow-sm transition-all duration-100 ease-out ',
        props.className,
        collapse ? 'w-14' : 'w-56',
      )}
    >
      <div className=" flex justify-end">
        {
          <PanelLeftOpen
            onClick={() => {
              dispatch(toggleCollapse());
            }}
            className={cn('cursor-pointer', collapse ? ' rotate-180' : '')}
          />
        }
      </div>
      {sideNavList.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.words}
        </Link>
      ))}
    </div>
  );
}
