import { type NextRequest } from 'next/server';

import db from '@/db';

export async function GET() {
  const allUsers = await db.user.findMany();
  return Response.json(allUsers);
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const cRes = await db.user.create({
    data: req,
  });
  console.log(cRes, 'cres');
  return Response.json(req);
}
