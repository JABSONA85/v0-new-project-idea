import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
});

const _playfair = Playfair_Display({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'ARTISAN Studio | Luxury Custom Furniture & Granite',
  description: 'Premium custom furniture and granite sink studio. Handcrafted laminate kitchens, solid wood furniture, and natural granite sinks.',
  keywords: ['custom furniture', 'granite sinks', 'luxury kitchens', 'solid wood', 'laminate kitchens'],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#111111',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ka">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
