import React from 'react'
import style from "./todos.module.css"

export default function Todos() {
  return (
    <>
    <div className={style.todosMain}>
      <h1>Your todos</h1>
      <div className={style.toboxArea}>
        <div className={style.todoBox}>
          <h3>Title</h3>
          
        </div>
      </div>
      </div>
    </>
  )
}
