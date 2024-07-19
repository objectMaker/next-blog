import { type NextRequest } from 'next/server';

import db from '@/db';
import { setToken } from '@/app/_utils';

export async function GET() {
  const allUsers = await db.user.findMany();
  return Response.json(allUsers);
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  //create user
  await db.user.create({
    data: req,
  });
  const user = await db.user.findUnique({
    where: {
      email: req.email,
    },
  });
  if (user?.id) {
    setToken(user.id + '');
  }
  return Response.json(req);
}
