'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Search() {
  const [value, setValue] = useState('1');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  console.log(value, 'valueeeee');

  return (
    <div className="relative flex w-96 items-center">
      <Input
        value={value}
        onChange={handleChange}
        className="flex-1 pr-10 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <X
        className={cn(
          'absolute right-10 w-4 cursor-pointer text-muted-foreground',
          value ? 'block' : 'hidden',
        )}
        onClick={() => {
          setValue('');
        }}
      />
      <SearchIcon className="w-8 cursor-pointer pl-2 text-muted-foreground"></SearchIcon>
    </div>
  );
}
