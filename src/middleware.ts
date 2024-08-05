import { auth } from '@/auth';
export default auth((req) => {
  const { nextUrl } = req;
  // console.log("NEXT URL" + nextUrl.pathname)
  const isLoggedIn = !!req.auth;
  if (['/signIn', '/signUp'].includes(nextUrl.pathname) && isLoggedIn) {
    return Response.redirect(new URL('/', nextUrl));
  }
  if (['/setting', '/create'].includes(nextUrl.pathname) && !isLoggedIn) {
    return Response.redirect(new URL('notFound', nextUrl));
  }
});
// invoke the middle ware!

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
