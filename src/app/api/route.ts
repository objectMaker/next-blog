import { type NextRequest } from 'next/server'
import {prisma} from '../../../prisma/client'

export async function GET(request: NextRequest) {
	const allUsers = await prisma.users.findMany()
	console.dir(allUsers, { depth: null })
	console.log(allUsers,"alluser")
	return Response.json(allUsers)
}