import { cn } from '@/lib/utils';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';

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
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
