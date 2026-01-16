import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'Siddhanth Kunwar | Full Stack Developer',
    template: '%s | Siddhanth Kunwar',
  },
  description: 'Full Stack Developer specializing in Blockchain, AI, and Web Development. Building innovative solutions with React, Next.js, Ethereum, and Machine Learning.',
  keywords: ['Full Stack Developer', 'Blockchain Developer', 'Web3', 'React Developer', 'Next.js', 'Ethereum', 'AI Engineer', 'Machine Learning', 'Portfolio', 'Siddhanth Kunwar'],
  authors: [{ name: 'Siddhanth Kunwar', url: 'https://github.com/xenon0906' }],
  creator: 'Siddhanth Kunwar',
  metadataBase: new URL('https://siddhanthkunwar.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://siddhanthkunwar.vercel.app',
    title: 'Siddhanth Kunwar | Full Stack Developer',
    description: 'Full Stack Developer specializing in Blockchain, AI, and Web Development.',
    siteName: 'Siddhanth Kunwar Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Siddhanth Kunwar - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siddhanth Kunwar | Full Stack Developer',
    description: 'Full Stack Developer specializing in Blockchain, AI, and Web Development.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
