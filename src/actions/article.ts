'use server';
import db from '@/db';

export const createArticle = async (data: {
  userId: string;
  content: string;
  title: string;
}) => {
  await db.article.create({
    data,
  });
  return new Promise((res) => {
    setTimeout(() => {
      res('123');
    }, 2000);
  });
};
