"use client"

import React, { useState } from 'react'
import style from "./createTodo.module.css"

import { FiTrash } from 'react-icons/fi';
import { BiSolidEdit } from 'react-icons/bi';
import { FaListUl } from 'react-icons/fa';

export default function page() {

    const [todo, setTodo] = useState([{
        title: "Test todo",
        lists: [
            { id: 2, text: 'Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1', done: false },

            { id: 4, text: 'Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1', done: false },

            { id: 3, text: 'Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1', done: false },

            { id: 1, text: 'Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1 Todo 1', done: false },

            { id: 5, text: 'Todo 2', done: false },
        ]
    }]);

    // Temp state

    const [tempTask, setTempTask] = useState("");
    const [toUpdate, setTOUpdate] = useState("");


    // Add Task
    const addTast = () => {

    }

    const deleteTask = (id: any) => {

    }

    const markDone = (id: any) => {

    }

    const cancelUpdate = () => {

    }

    const changeTask = (e: any) => {

    }

    const updateTask = (id: any) => {

    }

    return (
        <>
            <div className={style.crTodoMain}>

                <h1>Create Todo</h1>


                <h2>Todos:</h2>

                {todo && todo.length ? '' : <p>No Todos</p>}

                <ul>
                    {todo ? <h1 className={style.title}> <i><FaListUl /></i> {todo[0].title}</h1> : ""}

                    <div className="actionArea">

                        <div>
                        <input type="text" placeholder="Add Task" value={tempTask} onChange={(e) => setTempTask(e.target.value)} />
                        <button onClick={addTast}>Add</button>
                        </div>

                        <div>
                            <input type="text" placeholder="Update Task" value={toUpdate} onChange={(e) => changeTask(e)} />
                            <button onClick={updateTask}>Update</button>
                            <button onClick={cancelUpdate}>Cancel</button>
                        </div>
                        
                    </div>

                    {todo && todo[0].lists.sort((a, b) => a.id > b.id ? 1 : -1).map((item: any, index: any) => {
                        return (
                            <li key={item.id} className={item.done ? style.done : ""}>
                                <div className={style.index}>
                                    <p title='Mark done'>
                                    </p>
                                </div>
                                <p className={style.text}>
                                    {item.text}
                                </p>

                                <div className={style.tools}>
                                    <i title='Delete' onClick={() => deleteTask(item.id)}><FiTrash /></i>
                                    <i title='Edit' onClick={() => setTOUpdate(item.id)}><BiSolidEdit /></i>
                                </div>
                            </li>
                        )
                    })}

                </ul>
            </div>

        </>
    )
}
