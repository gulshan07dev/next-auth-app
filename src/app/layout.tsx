import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Toaster} from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Authentication App',
  description: 'this is a authentication project created by me',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}<Toaster /></body>
    </html>
  );
}
