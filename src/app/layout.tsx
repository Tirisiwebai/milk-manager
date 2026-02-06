import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Milk Manager - The simplest way to track milk for your cafe',
  description: 'Save time. Save money. Reduce waste. The dairy tracking tool for specialty cafes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
