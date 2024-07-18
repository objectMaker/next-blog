import db from '@/db';

export async function GET() {
  const allUsers = await db.users.findMany();
  return Response.json(allUsers);
}
