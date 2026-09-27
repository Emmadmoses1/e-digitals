import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'E-DIGITALS — Brand Identity Designer & Web Developer',
    template: '%s | E-DIGITALS',
  },
  description:
    'Brand identity designer and web developer creating distinctive visual identities, modern websites and digital experiences for ambitious businesses.',
  keywords: [
    'brand identity designer',
    'web developer',
    'logo design',
    'web design',
    'Nigeria',
    'digital experience',
  ],
  authors: [{ name: 'E-DIGITALS' }],
  creator: 'E-DIGITALS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'E-DIGITALS',
    title: 'E-DIGITALS — Brand Identity Designer & Web Developer',
    description:
      'Brand identity designer and web developer creating distinctive visual identities, modern websites and digital experiences for ambitious businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-DIGITALS — Brand Identity Designer & Web Developer',
    description:
      'Brand identity designer and web developer creating distinctive visual identities, modern websites and digital experiences for ambitious businesses.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
