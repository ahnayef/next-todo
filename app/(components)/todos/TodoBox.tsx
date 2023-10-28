import React from 'react'
import style from "./todobox.module.css"
import { FaBook, FaClipboardList, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getAnalytics } from 'firebase/analytics';

export default function TodoBox(props: {
  tdTitle: string,
  progress: string,
  tid: string,
  author: string
}) {

  const { author, tdTitle, progress, tid } = props;

  const analitics = getAnalytics();

  const delTodo = (tid: string) => {
    deleteDoc(doc(db, "users", `${auth.currentUser?.uid}`, "todos", `${tid}`)).then(() => {
      (analitics as any).logEvent("Todo deleted", { Author: author });
      toast.success('Todo deleted successfully');
      setTimeout(() => location.reload(), 500);
    }).catch(() => toast.error("Something went wrong"));
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
            <Link href={`todo/${author}!${tid}`} className='btn'><FaBook /> Open</Link>
            <button onClick={() => { delTodo(tid) }} className='btn del'><FaTrash /> Delete</button>
          </div>
          <div className={style.progress}>
            <div className={style.bar} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}
