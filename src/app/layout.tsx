import { cn } from '@/lib/utils';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import Header from '@/app/_components/Header';
import { Toaster } from 'sonner';
import StoreProvider from './StoreProvider';
import { ThemeProvider } from '@/components/theme-provider';
import SessionProvider from './SessionProvider';

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
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider>
              <Toaster position="top-center" richColors offset="60px" />
              <Header></Header>
              {children}
            </StoreProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
