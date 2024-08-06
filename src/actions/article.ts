'use server';
import db from '@/db';
import { revalidatePath, unstable_cache } from 'next/cache';
import { cache } from 'react';

export const createArticle = async (data: {
  userId: string;
  content: string;
  title: string;
}) => {
  await db.article.create({
    data,
  });
  revalidatePath('/article');
  return new Promise((res) => {
    setTimeout(() => {
      res('123');
    }, 2000);
  });
};

export const findArticle = unstable_cache(
  cache(async (userId: string) => {
    console.log('chach-------');

    const list = await db.article.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
    return list;
  }),
);
