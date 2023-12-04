import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'ASSAF KIMMEL STUDIO',
  description: 'Assaf Kimmel is an architect based in Berlin, working across the fields of architecture, installation art, fashion, performance and speculative design.',
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

export const revalidate = 10;