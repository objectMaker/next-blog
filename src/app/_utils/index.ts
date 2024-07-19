import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import db from '@/db';
// import { redirect } from 'next/navigation';

export function validateJwt() {
  const token = cookies().get('token');
  try {
    jwt.verify(
      token?.value || '',
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
    );
  } catch (err) {
    redirect('/');
  }
}

export async function getUserInfo() {
  const token = cookies().get('token');
  try {
    const res = jwt.verify(
      token?.value || '',
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
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

export function setToken(id: string) {
  const token = jwt.sign(
    {
      userId: id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.NEXT_PUBLIC_JWT_SECRET as string,
  );
  //have user create session
  const cookie = cookies();
  cookie.set('token', token);
}
