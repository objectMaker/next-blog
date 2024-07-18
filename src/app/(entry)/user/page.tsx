'use client';
import { MouseEvent, useState } from 'react';

export default function User() {
  const [formInfo, setFormInfo] = useState({
    username: '',
    email: '',
  });
  async function handleSubmit(e: MouseEvent) {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      body: JSON.stringify(formInfo),
    });
    const realRes = await res.json();
    console.log(realRes, 'realres');
  }
  function handleInputChange(field: string, value: string) {
    setFormInfo({
      ...formInfo,
      [field]: value,
    });
  }
  return (
    <div>
      <form>
        username:
        <input
          className="rounded border border-red-900"
          type="text"
          value={formInfo.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
        />
        email:
        <input
          type="text"
          value={formInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="rounded border border-red-900"
        />
        <button onClick={handleSubmit} className=" ml-3 border p-1">
          submit
        </button>
      </form>
    </div>
  );
}
