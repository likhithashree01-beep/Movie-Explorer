import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Movie Explorer',
  description: 'Search and explore movies, save your favorites',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
