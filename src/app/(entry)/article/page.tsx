'use client';

import { Button } from '@/components/ui/button';
import Dialog from './_components/dialog';
import { ChangeEvent, useState } from 'react';

export default function Article() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<
    {
      title: string;
      id: string;
      user_id: string;
    }[]
  >([]);

  const [formData, setFormData] = useState({
    count: '',
    size: '',
  });
  function handleChange(e: ChangeEvent<HTMLInputElement>, key: string) {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  }
  //创建文章列表
  async function handleQuery() {
    const res = await fetch(
      `/api/article?size=${formData.size}&count=${formData.count}`,
      {
        method: 'GET',
      },
    );
    const list = await res.json();
    setList(list);
  }

  return (
    <div className="m-auto w-full max-w-screen-xl">
      count:
      <input type="text" onChange={(e) => handleChange(e, 'count')} />
      size:
      <input type="text" onChange={(e) => handleChange(e, 'size')} />
      <div className="flex justify-end gap-x-2 pt-3">
        <Button variant="outline" size="sm" onClick={handleQuery}>
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
      {list.map((item, index) => (
        <div key={index}>
          <span>{index + 1 + ':'}</span>
          <br />
          title:
          <span>{item.title + '     '}</span>
          <br />
          id:
          <span>{item.id + '     '}</span>
          <br />
          userid:
          <span>{item.user_id + '     '}</span>
        </div>
      ))}
    </div>
  );
}
