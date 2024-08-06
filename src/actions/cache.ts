import db from '@/db';
import { cache } from 'react';

export const findArticle = cache(async (userId: string) => {
  const list = await db.article.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  return list;
});
