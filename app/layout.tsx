import type { Metadata } from 'next';
import { Geist, Geist_Mono, Allura, Rajdhani } from 'next/font/google';
import './globals.css';
// import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ZNavbar from './components/navbar/ZNavbar';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${allura.variable} ${rajdhani.variable} antialiased relative`}
      >
        <ZNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
