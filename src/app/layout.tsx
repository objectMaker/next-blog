import { cn } from '@/lib/utils';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import Header from '@/app/_components/Header';
import { Toaster } from 'sonner';
import SideBar from './_components/SideBar';

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
        <Toaster position="top-center" richColors offset="60px" />
        <Header></Header>
        <div className="flex flex-1 overflow-hidden">
          <SideBar></SideBar>
          <div className="h-full flex-1 overflow-y-auto transition-all duration-100 ease-out">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
