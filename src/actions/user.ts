'use server';

import { z } from 'zod';
import db from '@/db';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { signInformSchema, signUpFormSchema } from '@/lib/schemas';
import { signIn, signOut } from '@/auth';
import { verifyCode } from './nodeMailer';
import { saltAndHashPassword } from '@/utils/password';

export const handleSignUp = async (user: z.infer<typeof signUpFormSchema>) => {
  const dbUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (dbUser) {
    throw new Error('email already exists');
  }
  const formData = new FormData();
  formData.append('email', user.email);
  formData.append('code', user.code);
  const pass = await verifyCode(formData);
  if (!pass) {
    throw new Error('verify code not valid');
  }
  try {
    const pwHash = saltAndHashPassword(user.password as string);
    await db.user.create({
      data: {
        email: user.email,
        password: pwHash,
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
  try {
    await signOut({
      redirectTo: '/signIn',
    });
  } catch (err) {
    console.log(err, 'err++++++++++++++++++++');
    throw err;
  }
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

export const githubSignInAction = async () => {
  await signIn('github', {
    redirectTo: '/',
  });
};

export const credentialSignInAction = async (formData: FormData) => {
  try {
    await signIn('credentials', formData);
  } catch (err) {
    if (err instanceof Error) {
      if (
        (
          err.cause as unknown as {
            err: Error;
          }
        )?.err instanceof Error
      ) {
        throw (
          err.cause as unknown as {
            err: Error;
          }
        )?.err;
      }
    }
    console.log(err, 'xxxxxxxxxxxxx');
    throw err;
  }
};
