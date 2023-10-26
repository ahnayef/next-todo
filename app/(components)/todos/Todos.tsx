"use client"

import React, { useEffect, useState } from 'react'
import style from "./todos.module.css"

import TodoBox from './TodoBox';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';




export default function Todos() {

  const [user, loading, error] = useAuthState(auth);

  const [isLoaded, setIsloaded] = useState(false);

  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }
    else if (!user) {
      location.href = '/login';
    }
    else if (error) {
      console.log(error)
    }
  }, [user, loading, error]);


  const [publicTodos, setPublicTodos] = useState([]);
  const [privateTodos, setPrivateTodos] = useState([]);


  useEffect(() => {

    if (user) {
      const getTodos = async () => {
        const ref = collection(db, "users", `${user?.uid}`, "todos");
        const docSanp = await getDocs(ref);

        if (!(docSanp.empty)) {
          let publicTodos: any = [];
          let privateTodos: any = [];

          docSanp.forEach((doc) => {
            if (doc.data().private) {
              privateTodos.push(doc.data());
            } else {
              publicTodos.push(doc.data());
            }
          });

          setPublicTodos(publicTodos);
          setPrivateTodos(privateTodos);
          setIsEmpty(false);
          setIsloaded(true);
        } else {
          setIsloaded(true);
        }
      }

      getTodos();
    }

  }, [user]);


  return (
    <>
      <div className={style.todosMain}>
        <h1>Your todos</h1>
        <Link href="/createTodo" className='btn' style={{ fontSize: "1.01em" }}>Creare a new Todo</Link>

        {!isEmpty ?

          <div className={style.toboxArea}>
            <h2>Public:</h2>
            <hr />
            <div className={style.public}>

              {
                publicTodos.map((todo: any) => {
                  const progress = Math.round((todo.lists.filter((list: any) => list.done).length / todo.lists.length) * 100).toString();;
                  return <TodoBox tdTitle={todo.title} progress={progress} tid={todo.tid} key={todo.tid} />
                })
              }

            </div>
            <h2>Private:</h2>
            <hr />
            <div className={style.private}>

              {
                privateTodos.map((todo: any) => {
                  const progress = ((todo.lists.filter((list: any) => list.done).length / todo.lists.length) * 100).toString();
                  return <TodoBox tdTitle={todo.title} progress={progress} tid={todo.tid} key={todo.tid} />
                })
              }

            </div>

          </div>
          : <h2>You don&#39;t have any todos yet!</h2>}
        {!isLoaded ? <div className="loader"></div> : null}


      </div>
    </>
  )
}
