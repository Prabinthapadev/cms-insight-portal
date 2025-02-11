
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CMS Insight Portal',
  description: 'Compare and choose the best CMS platform for your needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen pt-16 w-full overflow-x-hidden">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
