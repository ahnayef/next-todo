import './globals.css'
import type { Metadata } from 'next'
import Navbar from './(components)/Navbar/Navbar'


export const metadata :Metadata = {
  title: 'Todogram',
  description: 'Small steps, big impact',
  authors:[{name:"AHNayef",url:"https://ahnayef.t.me"}],
  keywords:["todo", "workflow", "management", "routine", "progress"],

  viewport:{
      width:"device-width",
      initialScale:1,
      userScalable:true
  },

  openGraph: {
    url: 'https://www.todogram.vercel.app',
    siteName: 'Todogram',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta.png',
        width: 2782,
        height: 1391,
        alt: 'Meta Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
      </body>
    </html>

  )
}
