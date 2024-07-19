import { type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '@/db';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const req = await request.json();
  const user = await db.user.findUnique({
    where: {
      username: req.username,
    },
  });
  const token = jwt.sign(
    {
      userId: user?.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    'token private key',
  );
  //have user create session
  const cookie = cookies();
  cookie.set('token', token);

  return Response.json(req);
}
