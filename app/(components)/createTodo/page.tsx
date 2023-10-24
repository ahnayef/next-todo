"use client"

import React, { useState } from 'react'
import style from "./createTodo.module.css"

import { FiTrash } from 'react-icons/fi';
import { BiSolidEdit } from 'react-icons/bi';
import { FaCheck, FaListUl, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'firebase/database';



const initialState: { title: any, lists: Array<any> } = {
    title: "",
    lists: []
}


export default function Page() {

    const [todoState, setTodoState] = useState(initialState);


    // Temp state

    const [tempTask, setTempTask] = useState("");
    const [toUpdate, setToUpdate] = useState({
        id: "",
        text: "",
        done: false
    });

    const handleTitle = (e: any) => {
        setTodoState({ ...todoState, title: e.target.value })
        console.log(todoState.title)
    }

    // Add Task
    const addTast = () => {
        if (tempTask) {
            let num = todoState.lists.length + 1;
            let newTask = { id: num, text: tempTask, done: false };
            setTodoState({ ...todoState, lists: [...todoState.lists, newTask] });
            setTempTask("");
        } else {
            toast.error("Task can't be empty");
        }
    }

    const deleteTask = (id: any) => {
        let newTodo = todoState.lists.filter((item: any) => item.id !== id);
        setTodoState({ ...todoState, lists: newTodo });
    }

    const markDone = (id: any) => {
        let newTodo = todoState.lists.map((item: any) => {
            if (item.id === id) {
                item.done = !item.done;
            }
            return item;
        });
        setTodoState({ ...todoState, lists: newTodo });
    }

    const cancelUpdate = () => {
        setToUpdate({
            id: "",
            text: "",
            done: false
        });
    }

    const changeTask = (e: any) => {

        let tempTodo = {
            ...toUpdate,
            text: e.target.value
        }
        setToUpdate(tempTodo);
    }

    const updateTask = () => {
        let id = toUpdate.id;
        let newTodo = todoState.lists.map((item: any) => {
            if (item.id === id) {
                item.text = toUpdate.text;
            }
            return item;
        });

        setTodoState({ ...todoState, lists: newTodo });

        setToUpdate({
            id: "",
            text: "",
            done: false
        });

    }


    const handleAddEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTast();
        }
    }

    const handleUpdateEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTask();
        }
    }

    const saveTodo = () => {
        if (todoState.title && todoState.lists.length > 0) {
            let todo = {
                title: todoState.title,
                lists: todoState.lists
            }
            console.log(todo);
        } else {
            toast.error("Title can't be empty");
        }
    }

    return (
        <>
            <ToastContainer theme='dark' />
            <div className={style.crTodoMain}>

                <h1>Todo</h1>

                <ul>
                    {todoState ? <h1 className={style.title}> <i><FaListUl /></i> <input onChange={handleTitle} value={todoState?.title} placeholder='Todo Title' /></h1> : ""}

                    <div className={style.actionArea}>

                        <div>
                            <input type="text" placeholder="Add Task" value={tempTask} onChange={(e) => setTempTask(e.target.value)} onKeyDown={handleAddEnter} />
                            <button onClick={addTast}><i><FaPlus /></i></button>
                        </div>

                        <div>
                            <input id="updateT" type="text" placeholder="Update Task" value={toUpdate && toUpdate.text} onChange={(e) => changeTask(e)} onKeyDown={handleUpdateEnter} disabled={toUpdate.id ? false : true} />

                            <button onClick={updateTask}><i><FaCheck /></i></button>

                            <button onClick={cancelUpdate}><FaTimes /></button>
                        </div>

                    </div>

                    {todoState && todoState.lists.sort((a, b) => a.id > b.id ? 1 : -1).map((item: any, index: any) => {
                        return (
                            <li key={item.id} className={item.done ? style.done : ""}>
                                <div className={style.index}>
                                    <p title='Mark done' onClick={() => markDone(item.id)}>
                                    </p>
                                </div>
                                <p className={style.text}>
                                    {item.text}
                                </p>

                                <div className={style.tools}>
                                    <i title='Delete' onClick={() => deleteTask(item.id)}><FiTrash /></i>


                                    {!item.done ? <i title='Edit' onClick={() =>{setToUpdate({
                                        id: item.id,
                                        text: item.text,
                                        done: false
                                    })
                                    const target = document.querySelector('#updateT') as HTMLInputElement;
                                   target?.focus();
                                    }}><BiSolidEdit /></i> : ''}

                                </div>
                            </li>
                        )
                    })}
                    {
                        todoState.lists.length > 0 ? <button onClick={saveTodo}> <FaSave />&nbsp;Save</button> : ""
                    }
    
                </ul>
            </div>

        </>
    )
}
