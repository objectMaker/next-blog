import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import db from '@/db';
// import { redirect } from 'next/navigation';

export function validateJwt() {
  const token = cookies().get('token');
  try {
    jwt.verify(token?.value || '', 'token private key');
  } catch (err) {
    redirect('/');
  }
}

export async function getUserInfo() {
  const token = cookies().get('token');
  try {
    const res = jwt.verify(
      token?.value || '',
      'token private key',
    ) as JwtPayload;
    res.userId;
    const user = await db.user.findUnique({
      where: {
        id: res.userId,
      },
    });
    return user;
  } catch (err) {
    redirect('/');
  }
}
