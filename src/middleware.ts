import { NextResponse, NextRequest } from 'next/server';
export default function middleware(request: NextRequest) {
  if (!request.cookies.get('token')?.value) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/diary',
};
