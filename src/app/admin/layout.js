export const metadata = {
  title: 'Next.js',
  description: 'Welcome to your Backend, Assaf',
}

export default function RootLayout({
  children}) {
 return (
    <html>
      <body>{children}</body>
    </html>
  )
}
