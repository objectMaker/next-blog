import db from '@/db';
import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { comparePassword } from '@/utils/password';

const providers: Provider[] = [
  Github,
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      let user = null;

      // logic to verify if the user exists
      user = await db.user.findFirst({
        where: {
          email: credentials.email as string,
        },
      });
      if (!user?.password) {
        // No user found, so this is their first attempt to login
        // meaning this is also the place you could do registration
        throw new Error('User not found.');
      }
      if (!comparePassword(credentials.password as string, user.password)) {
        throw new Error('email or password incorrect');
      }
      // return user object with their profile data
      return user;
    },
  }),
];
export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers,
  pages: {
    signIn: '/signIn',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
