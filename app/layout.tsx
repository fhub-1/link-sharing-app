import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { FolderSync, Link2OffIcon, Menu } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'DevLinks',
  description: 'A simple devlink app to help you study.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className='flex min-h-screen w-full flex-col'>
          <header className='sticky z-40 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
            <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
              <Link
                href='/'
                className='flex items-center gap-2 text-lg font-semibold md:text-base'
              >
                <Link2OffIcon className='h-6 w-6' />
                <span className='sr-only'>links</span>
              </Link>
              <Link
                href='/manage'
                className='text-muted-foreground transition-colors hover:text-foreground'
              >
                manage
              </Link>
              <Link
                href='/profile'
                className='text-muted-foreground transition-colors hover:text-foreground'
              >
                Profile
              </Link>
              <Link
                href='/preview'
                className='text-muted-foreground transition-colors hover:text-foreground'
              >
                preview
              </Link>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='shrink-0 md:hidden'
                >
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left'>
                <nav className='grid gap-6 text-lg font-medium'>
                  <Link
                    href='/'
                    className='flex items-center gap-2 text-lg font-semibold'
                  >
                    <FolderSync className='h-6 w-6' />
                    <span className='sr-only'>Acme Inc</span>
                  </Link>
                  <Link
                    href='/invoices'
                    className='text-muted-foreground transition-colors hover:text-foreground'
                  >
                    Invoices
                  </Link>
                  <Link
                    href='/clientlist'
                    className='text-muted-foreground transition-colors hover:text-foreground'
                  >
                    Clients
                  </Link>
                  <Link
                    href='/reports'
                    className='text-muted-foreground transition-colors hover:text-foreground'
                  >
                    Reports
                  </Link>
                  <Link
                    href='/settings'
                    className='text-muted-foreground transition-colors hover:text-foreground'
                  >
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </header>
          <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
            {children}
          </main>
        </div>
        <Toaster position='bottom-center' />
      </body>
    </html>
  );
}