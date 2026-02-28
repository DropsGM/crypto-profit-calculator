import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((mod) => mod.Analytics),
  { ssr: false }
)
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Crypto Profit Calculator',
  description: 'Minimalist crypto profit calculator for Base',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/preview.png',
    'fc:frame:image:aspect_ratio': '3:2',
    'fc:frame:button:1': 'Open App',
    'fc:frame:button:1:action': 'launch_frame',
    'fc:frame:button:1:target': 'https://v0-crypto-profit-calculator-eta.vercel.app',
    'of:accepts:farcaster': 'vNext',
    'fc:miniapp:splash_image_url': '/splash.png',
    'fc:miniapp:splash_background_color': '#000000',
    'base:app_id': '697b57a77a620235c741a8ee',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
