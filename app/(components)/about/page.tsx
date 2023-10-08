import React from 'react'
import About from './About'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Todogram | About',
    description: 'About us',
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
                url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/about.png',
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
                url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/about.png',
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
            <About />
        </>
    )
}
