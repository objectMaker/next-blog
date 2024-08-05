import { SessionProvider } from 'next-auth/react';

export default function SP({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
