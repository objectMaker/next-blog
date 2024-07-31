import db from '@/db';
import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Nodemailer from 'next-auth/providers/nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { sendVerificationRequest } from './magicLink';
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
  ],
});
