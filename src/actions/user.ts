'use server';
import { formSchema } from '@/app/(auth)/signUp/page';
import { formSchema as signInformSchema } from '@/app/(auth)/signIn/page';
import { z } from 'zod';
import db from '@/db';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { revalidatePath } from 'next/cache';

export const handleSignUp = async (user: z.infer<typeof formSchema>) => {
  const dbUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (dbUser) {
    throw new Error('email already exists');
  }
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
export const handleSignOut = async () => {
  setToken(undefined);
};

export async function setToken(id?: string) {
  const cookie = cookies();
  if (!id) {
    cookie.delete('token');
    return;
  }
  const token = jwt.sign(
    {
      userId: id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.NEXT_PUBLIC_JWT_SECRET as string,
  );
  //have user create session
  cookie.set('token', token);
}

export async function getUserInfoByJwt() {
  const token = cookies().get('token');
  if (!token?.value) {
    return null;
  }
  try {
    const payload = (await jwt.verify(
      token?.value || '',
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
    )) as {
      userId: string;
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
    cookies().delete('token');
    throw err;
  }
}
