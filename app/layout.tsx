import './globals.css'
import type { Metadata } from 'next'
import Navbar from './(components)/Navbar/Navbar'
import { Analytics } from '@vercel/analytics/react'


export const metadata: Metadata = {
  title: 'Todogram',
  description: 'Small steps, big impact',
  authors: [{ name: "AHNayef", url: "https://ahnayef.t.me" }],
  keywords: ["todo", "workflow", "management", "routine", "progress"],
  metadataBase: new URL("https://todogram.vercel.app"),
  themeColor: "#252A34",
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: true,
  },

  manifest: '/manifest.json',
  icons: [
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],


  openGraph: {
    url: 'https://www.todogram.vercel.app',
    siteName: 'Todogram',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta.png',
        width: 1280,
        height: 640,
        alt: 'Meta Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    creator: "_AHNayef_",
    images: [
      {
        url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta.png',
        width: 1280,
        height: 640,
        alt: 'Meta Image',
      },
    ],
  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>

  )
}
