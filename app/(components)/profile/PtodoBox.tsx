import React from 'react'
import { FaBook, FaClipboardList, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import style from "../todos/todobox.module.css"
import { track } from '@vercel/analytics';

export default function PtodoBox(props: {
  tdTitle: string,
  progress: string,
  tid: string,
  author: string,
  isOwner: boolean
}) {

  const { author, tdTitle, progress, tid, isOwner } = props;


  const delTodo = (tid: string) => {
  
    if(confirm("Are you sure you want to delete this todo?")){
    deleteDoc(doc(db, "users", `${auth.currentUser?.uid}`, "todos", `${tid}`)).then(() => {
      toast.success('Todo deleted successfully');
      track("Delete todo from profile",{uid: author});
      setTimeout(() => location.reload(), 500);
    }).catch(() => toast.error("Something went wrong"));
   }else{
      return;
   }

  };

  return (
    <>
      <div className={style.todoBox}>
        <div className={style.card}>
          <div className={style.heading}>
            <i><FaClipboardList /></i>
            <p>{tdTitle}</p>
          </div>

          <div className={style.btnArea}>
            <Link href={`/todo/${author}!${tid}`} onClick={()=>{track("Open todo from profile",{tid: tid}) }} className='btn'><FaBook /> Open</Link>
            {isOwner ? <button onClick={() => { delTodo(tid) }} className='btn del'><FaTrash /> Delete</button> : null}
          </div>
          <div className={style.progress}>
            <div className={style.bar} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}
