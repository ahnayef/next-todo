import React from 'react'
import Profile from './Profile'
import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';


type Props = {
    params: { pid: string };
};

// set dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const pid = params.pid;
    let userData: { name: string } = {
        name: "",
    };

    // fetch data from API
    const docRef = doc(db, "users", pid);
    const docSnap = await getDoc(docRef);
    const data = [];
    if (docSnap.exists()) {
        data.push(docSnap.data());
        userData = {
            name: data[0].name
        };
    }

    const imgUrl = `https://images.placeholders.dev/?width=1280&height=640&text=${userData.name}&bgColor=%23F6E444&textColor=%23252A34`;

    return {
        title: 'Todogram | Profile',
        description: `${userData.name}'s Todogram profile`,
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
                    url: imgUrl,
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
                    url: imgUrl,
                    width: 1280,
                    height: 640,
                    alt: 'Meta Image',
                },
            ],
        }
    };
}



export default function Page({ params }: { params: { pid: string }; }) {


    return (
        <>
            <Profile params={params} />
        </>
    )
}
