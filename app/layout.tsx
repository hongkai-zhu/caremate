import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Caremate Medical Device | Professional Medical Equipment',
  description: 'Caremate Medical Device - Leading manufacturer of blood pressure monitors, stethoscopes, DVT sleeves, and infusion pressure bags. Quality medical devices for healthcare professionals.',
  keywords: 'medical devices, blood pressure monitors, stethoscopes, DVT sleeves, infusion pressure bags, healthcare equipment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
