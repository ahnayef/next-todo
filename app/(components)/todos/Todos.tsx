import React from 'react'
import style from "./todos.module.css"

import { FaBook, FaClipboardList, FaTrash } from 'react-icons/fa';
import TodoBox from './TodoBox';

export default function Todos() {
  return (
    <>
      <div className={style.todosMain}>
        <h1>Your todos</h1>
        <div className={style.toboxArea}>

          <TodoBox/>
          <TodoBox/>
          <TodoBox/>
          <TodoBox/>
          <TodoBox/>

        </div>
      </div>
    </>
  )
}
