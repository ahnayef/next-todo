import React from 'react'
import Todo from './Todo'
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Metadata } from 'next';


type Props = {
  params: { tid: string };
};

// set dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { tid } = params;
  const author = tid.split("!")[0];
  const utid = tid.split("!")[1];

  let todoInfo: { title: string, description: string } = {
    title: "Private Todo",
    description: "None",
  };

  // fetch data from API
  const todoRef = doc(db, "users", author, "todos", utid);

  const todoSnap = await getDoc(todoRef);

  if ((todoSnap.exists())) {
    if(!(todoSnap.data().private)){
      todoInfo = {
        title: todoSnap.data().title,
        description: `A todo by ${todoSnap.data().authorName}`,
      };
    }else{
      todoInfo = {
        title: "Private Todo",
        description: "---",
      };
    }
  }

  return {
    title: todoInfo.title,
    description: todoInfo.description,
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
          url: "https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/todos.png",
          width: 200,
          height: 200,
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
          url: "https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/todos.png",
          width: 200,
          height: 200,
          alt: 'Meta Image',
        },
      ],
    }
  };
}

export default function Page({ params }: { params: { tid: string } }) {
  return (
    <>
      <Todo params={params} />
    </>
  )
}
