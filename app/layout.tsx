import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  metadataBase: new URL('https://postgres-drizzle.vercel.app'),
  title: 'Vercel SingleStore Demo with Drizzle',
  description:
    'A simple Next.js app with SingleStore as the database and Drizzle as the ORM',
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
