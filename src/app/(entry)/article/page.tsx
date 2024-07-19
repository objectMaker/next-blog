'use client';

import { Button } from '@/components/ui/button';
import Dialog from './_components/dialog';
import { useState } from 'react';

export default function Article() {
  const [open, setOpen] = useState(false);
  //创建文章列表
  return (
    <div className="m-auto w-full max-w-screen-xl">
      <div className="flex justify-end gap-x-2 pt-3">
        <Button variant="outline" size="sm">
          查询
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
        >
          新增
        </Button>
        <Dialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
