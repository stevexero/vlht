import type { Metadata } from 'next';
import { Geist, Geist_Mono, Allura, Rajdhani } from 'next/font/google';
import { createClient } from './lib/supabase/server';
import ZFooter from './components/footer/ZFooter';
import ZNavbar from './components/navbar/ZNavbar';
import './globals.css';
import ToastContainer from './ui/ToastContainer';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const allura = Allura({
  weight: '400',
  style: 'normal',
  variable: '--font-allura',
  subsets: ['latin'],
});

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vegas Luxury Home Tours',
  description: 'Experience the best of Vegas with our luxury home tours',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang='en'>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <Script
            src='https://cloud.umami.is/script.js'
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy='afterInteractive'
            defer
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${allura.variable} ${rajdhani.variable} min-h-screen antialiased flex flex-col`}
      >
        <ZNavbar user={user} />
        <ToastContainer />
        <main className='flex-grow bg-gray-100'>{children}</main>
        <ZFooter user={user} />
      </body>
    </html>
  );
}
