"use client"

import Link from 'next/link'
import style from './page.module.css'
import "@/app/assets/icon/style.css"
import { useEffect, useState } from "react";
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { signOut } from 'firebase/auth';

export default function Home() {

  const [user, loading, error] = useAuthState(auth);
  const [uname, setUname] = useState("");


  const logOut = () => {
    signOut(auth).then(() => {
      toast.success("Logged out");
    }).catch((error) => {
      toast.error("Something went wrong");
      console.log(error)
    });
  }

  useEffect(() => {
    let width = screen.width;
    if (width <= 425) {
      alert("Please use tab or desktop for now. Mobile version will be available soon.");
      location.assign("https://github.com/ahnayef");
    }
  }, [])


  useEffect(() => {
    if (user) {
      const loadData = async () => {
        let data = [];
        const docRef = doc(db, "users", `${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          data.push(docSnap.data());
          setUname(data[0]?.name);
        } else {
          toast.error("No such document");
        }
      }
      loadData();
    }
  }, [user]);

  return (
    <>
      <ToastContainer theme='dark' />
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
            user ? <div className={style.welcome}>
              <h1>Welcome back, <b>{uname}</b></h1>
              <Link href="/todo" className={style.btn}>My todos</Link>
              <button className={`${style.btn} ${style.red}`} onClick={logOut}>Logout</button>
            </div> : <>
              <Link href="/login" className={style.btn}>Log in</Link>
              <Link href="/signup" className={style.btn}>Sign up</Link>
            </>
          }
        </div>


        <div className={style.right}>
          <div className={style.todoBox}>
            <h1>Todo</h1>
            <p>Small steps, big impact.</p>
            <Link href="/createTodo" className={style.btn}>Create your first todo</Link>
            <i className="icon-check"></i>
          </div>
        </div>
      </div>
    </>
  )
}
