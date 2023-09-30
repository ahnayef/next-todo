"use client"

import Link from 'next/link'
import style from './page.module.css'
import "@/app/assets/icon/style.css"
import { useEffect } from "react";
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

export default function Home() {

  const [user, loading, error] = useAuthState(auth);



  useEffect(() => {
    let width = screen.width;
    if (width <= 425) {
      alert("Please use tab or desktop for now. Mobile version will be available soon.");
      location.assign("https://github.com/ahnayef");
    }
  }, [])

  return (
    <>
      <Head>
        <title>Todo | Home</title>
        {/* meta  */}
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <meta charSet="utf-8" />
        <meta name="description" content="Home" />
        <meta name="keywords" content="todo, task, workflow, management, routine" />
        <meta property="og:title" content="Todo" />
        <meta property="og:image" content="https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta.png" />
        <meta property="og:url" content="https://www.todogram.vercel.app" />
        <meta name="author" content="AHNayef" />
      </Head>


      <div className={style.home}>
        
        <div className={style.left}>

          {
            user ? <div>Login</div> : <>
            <Link href="/login" className={style.btn}>Log in</Link>
            <Link href="/signup" className={style.btn}>Sign up</Link>
            </>
          }
        </div>


        <div className={style.right}>
          <div className={style.todoBox}>
            <h1>Todo</h1>
            <p>Small steps, big impact.</p>
            <Link href="/todo" className={style.btn}>Create your first todo</Link>
            <i className="icon-check"></i>
          </div>
        </div>
      </div>
    </>
  )
}
