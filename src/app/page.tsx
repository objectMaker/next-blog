'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [res2, setRes2] = useState('');
  useEffect(() => {
    async function fetchD() {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
      });
      const res3 = await res.json();
      setRes2(res3);
    }
    fetchD();
  }, []);

  console.log(res2);
  return (
    <div>
      app
      {JSON.stringify(res2)}
    </div>
  );
}
