import { cn } from '@/lib/utils';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import Header from '@/app/_components/Header';
import { Toaster } from 'sonner';
import StoreProvider from './StoreProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex h-screen flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <StoreProvider count={3}>
          <Toaster position="top-center" richColors offset="60px" />
          <Header></Header>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
