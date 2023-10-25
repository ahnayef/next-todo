"use client"

import React, { useEffect } from 'react'
import style from "./todos.module.css"

import TodoBox from './TodoBox';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';




export default function Todos() {

  const [user, loading, error] = useAuthState(auth);

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


  return (
    <>
      <div className={style.todosMain}>
        <h1>Your todos</h1>
        <div className={style.toboxArea}>

          <h2>Public:</h2>
          <hr />
          <div className={style.public}>
            <TodoBox />
            <TodoBox />
            <TodoBox />

          </div>
          <h2>Private:</h2>
          <hr />
          <div className={style.private}>
            <TodoBox />
            <TodoBox />
          </div>

        </div>
      </div>
    </>
  )
}
