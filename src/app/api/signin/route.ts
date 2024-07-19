import { type NextRequest } from 'next/server';
import db from '@/db';
import { setToken } from '@/app/_utils';
import { notFound } from 'next/navigation';

export async function POST(request: NextRequest) {
  const req = await request.json();
  const user = await db.user.findUnique({
    where: {
      username: req.username,
    },
  });
  if (user?.id) {
    setToken(user.id + '');
  } else {
    notFound();
  }
  return Response.json(req);
}
