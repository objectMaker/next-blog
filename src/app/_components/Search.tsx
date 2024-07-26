'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import { SearchIcon } from 'lucide-react';

export default function Search() {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="relative flex w-96 items-center">
      <Input
        value={value}
        onChange={handleChange}
        className="flex-1 pr-10 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <SearchIcon className="absolute right-3 w-8 cursor-pointer pl-2 text-muted-foreground"></SearchIcon>
    </div>
  );
}
