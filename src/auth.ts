import db from '@/db';
import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Nodemailer from 'next-auth/providers/nodemailer';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { sendVerificationRequest } from './magicLink';
import { saltAndHashPassword } from '@/utils/password';
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github,
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async generateVerificationToken() {
        return crypto.randomUUID();
      },
      sendVerificationRequest,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password as string);

        // logic to verify if the user exists
        user = await db.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.');
        }
        if (user?.password !== pwHash) {
          throw new Error('email or password incorrect');
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
