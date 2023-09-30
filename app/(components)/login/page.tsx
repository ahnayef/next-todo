import { Metadata } from 'next'
import Login from './Login'




export const metadata: Metadata = {
  title: 'Todogram | Login',
  description: 'Login to Todogram',
  authors: [{ name: "AHNayef", url: "https://ahnayef.t.me" }],
  keywords: ["todo", "workflow", "management", "routine", "progress"],
  metadataBase: new URL('https://todogram.vercel.app'),
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false
  },

  openGraph: {
    url: 'https://www.todogram.vercel.app',
    siteName: 'Todogram',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/login.png',
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
        url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/login.png',
        width: 1280,
        height: 640,
        alt: 'Meta Image',
      },
    ],
  }
}



export default function page() {



  return (
    <>
      <Login />
    </>
  )
}
