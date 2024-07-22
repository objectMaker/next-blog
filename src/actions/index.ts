'use server';
import { formSchema } from '@/app/(auth)/signUp/page';
import { formSchema as signInformSchema } from '@/app/(auth)/signIn/page';
import { z } from 'zod';
import db from '@/db';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const handleSignUp = async (user: z.infer<typeof formSchema>) => {
  try {
    await db.user.create({
      data: {
        username: user.email,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('create user failed');
  }
};

export const handleSignIn = async (user: z.infer<typeof signInformSchema>) => {
  try {
    const userInfo = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!userInfo) {
      throw new Error('not found user');
    }
    await setToken(userInfo.id);
  } catch (error) {
    console.log(error);
    throw new Error('create user failed');
  }
};

export async function setToken(id: number) {
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

export async function getUserInfoByJwt() {
  const token = cookies().get('token');
  try {
    const payload = (await jwt.verify(
      token?.value || '',
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
    )) as {
      userId: number;
      iat: number;
      exp: number;
    };
    const userInfo = await db.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    return userInfo;
  } catch (err) {
    console.log(err);
    return null;
  }
}
