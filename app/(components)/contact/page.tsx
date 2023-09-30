import React from 'react'
import Contact from './Contact'
import { Metadata } from 'next'

export const metadata :Metadata = {
    title: 'Todogram | Contact',
    description: 'Contact us',
    authors:[{name:"AHNayef",url:"https://ahnayef.t.me"}],
    keywords:["todo", "workflow", "management", "routine", "progress"],
    metadataBase: new URL('https://todogram.vercel.app'),

    viewport:{
        width:"device-width",
        initialScale:1,
        userScalable:false
    },

    openGraph: {
      url: 'https://www.todogram.vercel.app',
      siteName: 'Todogram',
      images: [
        {
          url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/contact.png',
          width: 1280,
          height: 640,
          alt: 'Meta Image',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }

export default function page() {
  return (
   <>
   <Contact/>
   </>
  )
}
