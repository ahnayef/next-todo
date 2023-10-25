"use client"

import React, { useEffect, useState } from 'react'
import style from "./todos.module.css"

import TodoBox from './TodoBox';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';




export default function Todos() {

  const [user, loading, error] = useAuthState(auth);

  const [isLoaded,setIsloaded]=useState(false);

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

    if(user){
      const getTodos = async ()=>{


        const ref =collection(db, "users", `${user?.uid}`,"todos");
        const docSanp = await getDocs(ref);

        let publicTodos:any = [];
        let privateTodos:any = [];

        docSanp.forEach((doc)=>{
          if(doc.data().private){
            privateTodos.push(doc.data());
          }else{
            publicTodos.push(doc.data());
          }
        });
        
        setPublicTodos(publicTodos);
        setPrivateTodos(privateTodos);

        setIsloaded(true);
      }

      getTodos();
    }

  }, [user]);


  return (
    <>
      <div className={style.todosMain}>
        <h1>Your todos</h1>

        {
          !isLoaded ? <div className="loader"></div> : 
          
          <div className={style.toboxArea}>
          <h2>Public:</h2>
          <hr />
          <div className={style.public}>

          {
            publicTodos.map((todo:any)=>{
              const progress= Math.round((todo.lists.filter((list:any)=>list.done).length/todo.lists.length)*100).toString();;
              return <TodoBox tdTitle={todo.title} progress={progress} tid={todo.tid} key={todo.tid} />
            })
          }

          </div>
          <h2>Private:</h2>
          <hr />
          <div className={style.private}>

          {
            privateTodos.map((todo:any)=>{
              const progress = ((todo.lists.filter((list:any)=>list.done).length/todo.lists.length)*100).toString();
              return <TodoBox tdTitle={todo.title} progress={progress} tid={todo.tid} key={todo.tid} />
            })
          }

          </div>

        </div>
        }



      </div>
    </>
  )
}
