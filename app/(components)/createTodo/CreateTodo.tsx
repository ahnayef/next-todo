"use client"

import React, { useEffect, useState } from 'react'
import style from "./createTodo.module.css"

import { FiTrash } from 'react-icons/fi';
import { BiSolidEdit } from 'react-icons/bi';
import { FaCheck, FaListUl, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';



const initialState: { tid: any, title: any, author: any, authorName: string, private: boolean, lists: Array<any> } = {
    tid: "",
    title: "",
    author: "",
    authorName: "",
    private: false,
    lists: []
}


export default function CreateTodo({  searchParams, }: { searchParams?: { [key: string]: string | string[] | undefined } }) {

    const tdata = searchParams?.datas;

    const [user, loading, error] = useAuthState(auth);
    const analytics = getAnalytics();

    useEffect(() => {
        if (loading) {
            return;
        }
        else if (!user) {
            logEvent(analytics, "Unauthorized access attempt to profile");
            location.href = '/login';
        }
        else if (error) {
            console.log(error)
        }
    }, [user, loading, error]);



    const [todoState, setTodoState] = useState(initialState);
    const [todoProgress, setTodoProgress] = useState("0%");

    //Copy todo
    useEffect(() => {
        if (tdata) {
            let copyData = JSON.parse(tdata as string);
            setTodoState(copyData);
        }

    }, []);

    //Check progress
    useEffect(() => {
        if (todoState.lists.length > 0) {
            let done = todoState.lists.filter((item: any) => item.done === true);
            let progress = (done.length / todoState.lists.length) * 100;
            setTodoProgress(progress + "%");
        } else {
            setTodoProgress("0%");
        }
    }, [todoState.lists]);

    // Temp state

    const [tempTask, setTempTask] = useState("");
    const [toUpdate, setToUpdate] = useState({
        id: "",
        text: "",
        done: false
    });

    const handleTitle = (e: any) => {
        setTodoState({ ...todoState, title: e.target.value })
    }

    // Add Task
    const addTast = () => {
        if (tempTask) {
            let num = todoState.lists.length + 1;
            let newTask = { id: num, text: tempTask, done: false };
            setTodoState({ ...todoState, lists: [...todoState.lists, newTask] });
            setTempTask("");
            logEvent(analytics, "Add a new task", { user: user?.uid,email:user?.email });
        } else {
            toast.error("Task can't be empty");
        }
    }

    const deleteTask = (id: any) => {
        let newTodo = todoState.lists.filter((item: any) => item.id !== id);
        setTodoState({ ...todoState, lists: newTodo });

        if (toUpdate.id === id) {
            setToUpdate({
                id: "",
                text: "",
                done: false
            });
        }
        logEvent(analytics, "Delete a task", { user: user?.uid,email:user?.email });
    }

    const markDone = (id: any) => {
        let newTodo = todoState.lists.map((item: any) => {
            if (item.id === id) {
                item.done = !item.done;
            }
            return item;
        });
        setTodoState({ ...todoState, lists: newTodo });

        setToUpdate({
            id: "",
            text: "",
            done: false
        });
        logEvent(analytics, "Mark a task done", { user: user?.uid,email:user?.email });
    }

    const cancelUpdate = () => {
        setToUpdate({
            id: "",
            text: "",
            done: false
        });
        logEvent(analytics, "Cancel updatting a task", { user: user?.uid,email:user?.email });
    }

    const changeTask = (e: any) => {

        let tempTodo = {
            ...toUpdate,
            text: e.target.value
        }
        setToUpdate(tempTodo);

        logEvent(analytics, "Change task", { user: user?.uid,email:user?.email });
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

        logEvent(analytics, "Update task", { user: user?.uid,email:user?.email });
    }


    const handleAddEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTast();

            logEvent(analytics, "Add task using Enter key", { user: user?.uid ,email:user?.email })
        }
    }

    const handleUpdateEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTask();
            logEvent(analytics, "Update a task using Enter key", { user: user?.uid,email:user?.email })
        }
    }

    const saveTodo = async () => {
        if (todoState.title && todoState.lists.length > 0) {

            //Get author name
            const authorRef = doc(db, "users", `${user?.uid}`);
            const authorSnap = await getDoc(authorRef);
            const fetchData = [];

            if (authorSnap.exists()) {

                fetchData.push(authorSnap.data());
                let todo = {
                    authorName: fetchData[0]?.name,
                    author: user?.uid,
                    private: todoState.private,
                    title: todoState.title,
                    lists: todoState.lists,
                }
                addDoc(collection(db, "users", `${user?.uid}`, "todos"), todo).then((docRef) => {
                    updateDoc(doc(db, "users", `${user?.uid}`, "todos", docRef.id), {
                        tid: docRef.id
                    }).then(() => {
                        toast.success("Todo saved successfully!");
                        logEvent(analytics, "Save todo", { user: todo.authorName,email:user?.email });
                        setTodoState(initialState);
                        location.href = '/todos';
                    }).catch((err) => {
                        toast.error("Error adding tid!");
                        console.log(err);
                    })
                }
                ).catch((error) => {
                    toast.error("Error saving todo!");
                    console.error("Error adding document: ", error);
                });


            } else {
                toast.error("Couldn't find user name");
            }

        } else {
            const target = document.querySelector("#tTitle") as HTMLInputElement;
            target?.focus();
            toast.error("Title can't be empty");
            logEvent(analytics, "Try to save todo without Title", { user: user?.uid,email:user?.email });
        }
    }

    return (
        <>
            <ToastContainer theme='dark' />
            <div className={style.crTodoMain}>

                <h1>Todo</h1>

                <ul>
                    {todoState ? <h1 className={style.title}> <i><FaListUl /></i> <input onChange={handleTitle} value={todoState?.title} id='tTitle' placeholder='Todo Title' /></h1> : ""}

                    <div className={style.actionArea}>

                        <div className={style.inputArea}>
                            <input type="text" placeholder="Add Task" value={tempTask} onChange={(e) => setTempTask(e.target.value)} onKeyDown={handleAddEnter} />
                            <button onClick={addTast}><i><FaPlus /></i></button>
                        </div>

                        <div className={style.inputArea}>
                            <input id="updateT" type="text" placeholder="Update Task" value={toUpdate && toUpdate.text} onChange={(e) => changeTask(e)} onKeyDown={handleUpdateEnter} disabled={toUpdate.id ? false : true} />

                            <button onClick={updateTask} disabled={toUpdate.id ? false : true} ><i><FaCheck /></i></button>

                            <button onClick={cancelUpdate} disabled={toUpdate.id ? false : true} ><FaTimes /></button>
                        </div>

                        <div className={style.privacyArea}>

                            {/* <button onClick={() => setTodoState({ ...todoState, public: !todoState.public })}>
                                {todoState.public ? "Public" : "Private"}
                            </button> */}
                            <label htmlFor="tgBtn">Private: </label>
                            <label htmlFor='tgBtn' className={`${style.tBtn} ${style.b2} ${style.buttonTog}`}>
                                <input type="checkbox" className={style.checkbox} id='tgBtn' onChange={() => {
                                    setTodoState({ ...todoState, private: !todoState.private })
                                }} checked={todoState.private} hidden />
                                <div className={style.knobs}>
                                    <span></span>
                                </div>
                            </label>

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


                                    {!item.done ? <i title='Edit' onClick={() => {
                                        setToUpdate({
                                            id: item.id,
                                            text: item.text,
                                            done: false
                                        })

                                        const target = document.querySelector('#updateT') as HTMLInputElement;
                                        target.disabled = false;
                                        target?.focus();

                                    }}><BiSolidEdit /></i> : ''}

                                </div>
                            </li>
                        )
                    })}
                    {
                        todoState.lists.length > 0 ? <button onClick={saveTodo}> <FaSave />&nbsp;Save</button> : ""
                    }
                    <div className={style.progress}>
                        <div className={style.bar} style={{ width: `${todoProgress}` }}></div>
                    </div>
                </ul>
            </div>

        </>
    )
}
