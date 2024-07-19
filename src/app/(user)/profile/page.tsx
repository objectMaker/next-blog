import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default function Page() {
  const token = cookies().get('token');

  const decoded = jwt.verify(token?.value || '', 'token private key');
  console.log(decoded);
  return (
    <>
      <div>123</div>
    </>
  );
}
