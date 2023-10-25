import React from 'react'
import style from "./todobox.module.css"
import { FaBook, FaClipboardList, FaTrash } from 'react-icons/fa';

export default function TodoBox() {
  return (
    <div className={style.todoBox}>
    <div className={style.card}>
      <div className={style.heading}>
        <i><FaClipboardList /></i>
        <p>Title</p>
      </div>

      <div className={style.btnArea}>
        <button className='btn'><FaBook /> Open</button>
        <button className='btn del'><FaTrash /> Delete</button>
      </div>
      <div className={style.progress}>
        <div className={style.bar} style={{ width: `70%` }}></div>
      </div>
    </div>
  </div>
  )
}
