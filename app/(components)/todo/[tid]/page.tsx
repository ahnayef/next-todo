"use client"

import { auth } from "@/app/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiSolidEdit } from "react-icons/bi";
import { FaCheck, FaCopy, FaListUl, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import style from "./todo.module.css"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const initialState: { tid: any, title: any, author: any, private: boolean, lists: Array<any> } = {
  tid: "",
  title: "",
  author: "",
  private: false,
  lists: []
}

export default function Page({ params }: { params: { tid: string } }) {

  const { tid } = params;
  const [todoState, setTodoState] = useState(initialState);
  const [todoProgress, setTodoProgress] = useState("0%");

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
  
  useEffect(()=>{


    const getTodo = ()=>{
      axios.post("/api/getSingleTodo",{tid:tid}).then((res)=>{
        console.log(res.data());
      }).catch(err => console.log(err))
    }

    getTodo();

  },[tid]);





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
        author: user?.uid,
        private: todoState.private,
        title: todoState.title,
        lists: todoState.lists,
      }

      // Update todo here


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
              <label htmlFor="tgBtn">Private: </label>
              <label htmlFor='tgBtn' className={`${style.tBtn} ${style.b2} ${style.buttonTog}`}>
                <input type="checkbox" className={style.checkbox} id='tgBtn' onChange={() => {
                  setTodoState({ ...todoState, private: !todoState.private })
                }} hidden />
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
            todoState.lists.length > 0 ? <><button onClick={saveTodo}> <FaSave />&nbsp;Save</button> <button> <FaCopy />&nbsp;Duplicate</button> </> : ""
          }
          <div className={style.progress}>
            <div className={style.bar} style={{ width: `${todoProgress}` }}></div>
          </div>
        </ul>
      </div>

    </>
  )
}
