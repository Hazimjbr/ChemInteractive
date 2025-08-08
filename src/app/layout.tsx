import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import FloatingActions from '@/components/floating-actions';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChemInteractive',
  description: 'Interactive Chemistry Learning Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <FloatingActions />
        <Toaster />
      </body>
    </html>
  );
}
