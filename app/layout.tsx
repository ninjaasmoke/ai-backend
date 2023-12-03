import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const mp = localFont({
  src: [
    {
      path: '../public/fonts/MPRegular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/MPBold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-mp'
})

export const metadata: Metadata = {
  title: 'AI',
  description: 'This is a description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mp.className}>{children}</body>
    </html>
  )
}
