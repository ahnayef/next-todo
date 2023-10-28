"use client"

import { auth, db } from "@/app/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiSolidEdit } from "react-icons/bi";
import { FaCheck, FaCopy, FaLink, FaListUl, FaPlus, FaSave, FaShareAlt, FaTimes } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import style from "./todo.module.css"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { getAnalytics, logEvent } from "firebase/analytics";


const initialState: { tid: any, title: any, author: any, authorName: string, private: boolean, lists: Array<any> } = {
  tid: "",
  title: "",
  author: "",
  authorName: "",
  private: false,
  lists: []
}

export default function Page({ params }: { params: { tid: string } }) {

  const { tid } = params;
  const author = tid.split("!")[0];
  const utid = tid.split("!")[1];
  
  const [todoState, setTodoState] = useState(initialState);
  const [todoProgress, setTodoProgress] = useState("0%");
  const [isOwner, setISOwner] = useState(false);
  const [copyData, setCopyData] = useState("");

  const analytics = getAnalytics();

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




  // Load todo from db using tid

  useEffect(() => {

    if (user?.uid === author) {
      setISOwner(true);
    }

    const getTodo = () => {
      axios.post("/api/getSingleTodo", { user: user?.uid, author: author, tid: utid }).then((res) => {
        const todo = res.data;
        setTodoState(todo);
        console.log(todo);
        let data = JSON.stringify(todo);
        setCopyData(encodeURIComponent(data));

      }).catch(err => toast.error(err.response.data))
    }

    user && getTodo();

  }, [tid, user]);





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
    logEvent(analytics, "Delete a task", { user: user?.uid,email:user?.email });
    if (toUpdate.id === id) {
      setToUpdate({
        id: "",
        text: "",
        done: false
      });
    }

  }

  const markDone = (id: any) => {
    let newTodo = todoState.lists.map((item: any) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    setTodoState({ ...todoState, lists: newTodo });
    logEvent(analytics, "Mark a task done", { user: user?.uid,email:user?.email });
    setToUpdate({
      id: "",
      text: "",
      done: false
    });
  }

  const cancelUpdate = () => {
    setToUpdate({
      id: "",
      text: "",
      done: false
    });
    logEvent(analytics, "Cancel updating a task", { user: user?.uid,email:user?.email });
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
    logEvent(analytics, "Update task", { user: user?.uid,email:user?.email });

    setToUpdate({
      id: "",
      text: "",
      done: false
    });

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

  const saveTodo = () => {
    if (todoState.title && todoState.lists.length > 0) {
      let todo = {
        private: todoState.private,
        title: todoState.title,
        lists: todoState.lists,
      }

      // Update todo here
      const todoRef = doc(db, "users", `${user?.uid}`, "todos", `${tid.split("!")[1]}`);

      updateDoc(todoRef, todo).then(() => {
        toast.success("Todo saved successfully");
        logEvent(analytics, "Save todo", { user: user?.uid,email:user?.email });
        location.reload();
      }
      ).catch(err => console.log(err));


    } else {
      const target = document.querySelector("#tTitle") as HTMLInputElement;
      target?.focus();
      toast.error("Title can't be empty");
    }
  }

  return (
    <>
      <ToastContainer theme='dark' />
      <div className={style.sTodoMain}>

        <h1>Todo</h1>

        <ul>
          {todoState ? <h1 className={style.title}> <i><FaListUl /></i> <input onChange={handleTitle} value={todoState?.title} id='tTitle' placeholder='Todo Title' disabled={isOwner ? false : true} /></h1> : ""}

          {isOwner ?
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

            </div> : null}

          {todoState && todoState.lists.sort((a, b) => a.id > b.id ? 1 : -1).map((item: any, index: any) => {
            return (
              <li key={item.id} className={item.done ? style.done : ""}>

                <div className={style.index}>
                  {isOwner ?
                    <p title='Mark done' onClick={() => markDone(item.id)}>
                    </p>
                    : <p>{index + 1}</p>}

                </div>

                <p className={style.text}>
                  {item.text}
                </p>

                {isOwner ?
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
                  : null}
              </li>
            )
          })}
          <div className={style.progress}>
            <div className={style.bar} style={{ width: `${todoProgress}` }}></div>
          </div>
          {
            todoState.lists.length > 0 ? <>{isOwner ? <button onClick={saveTodo}> <FaSave />&nbsp;Save</button> : null} <div className={style.regularArea}>
              <Link href={`/createTodo?datas=${copyData}`}><FaCopy />&nbsp;Duplicate</Link>
              <button onClick={() => {
                navigator.clipboard.writeText(`${location.origin}/todo/${tid}`);
                navigator.vibrate(200);
                toast.success("Link copied to clipboard");
                logEvent(analytics, "Copy link", { user: user?.uid,email:user?.email });
              }}><FaLink />&nbsp;Copy Link</button>
              <button onClick={() => {
                navigator.share({
                  title: todoState.title,
                  text: "Check out this todo",
                  url: `${location.origin}/todo/${tid}`
                }).then(()=>{
                  logEvent(analytics, "Share todo", { user: user?.uid,email:user?.email });
                });
              }}><FaShareAlt />&nbsp;Share</button>
            </div> </> : ""
          }
          <div className={style.authorArea}>
            <p>Created by: <Link href={`/profile/${author}`}>{todoState.authorName}</Link></p>
          </div>
        </ul>
      </div>

    </>
  )
}
