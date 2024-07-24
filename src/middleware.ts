import type { NextRequest } from 'next/server';
import { getUserInfoByJwt } from './actions';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const user = await getUserInfoByJwt();
    if (!user) {
      return NextResponse.redirect(new URL('/notFound', request.url));
    }
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL('/notFound', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/diary',
};
