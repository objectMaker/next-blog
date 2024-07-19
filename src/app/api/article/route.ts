import { type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '@/db';
import { cookies } from 'next/headers';
import { getUserInfo } from '@/app/_utils';

export async function POST(request: NextRequest) {
  const user = await getUserInfo();
  if (!user?.id) {
    return;
  }
  console.log(user, 'user');
  const req = await request.json();

  const createRes = await db.article.create({
    data: {
      ...req,
      user_id: user?.id,
    },
  });
  console.log(createRes, 'createRes');

  return Response.json(req);
}
