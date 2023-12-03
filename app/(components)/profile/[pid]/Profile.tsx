"use client"

import { FaLink } from "react-icons/fa"
import style from "./profile.module.css"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase";
import PtodoBox from "../PtodoBox";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { getAnalytics, logEvent } from "firebase/analytics";
import { track } from "@vercel/analytics";

const initialuserData: { name: string, bio: string, created: any } = {
    name: "",
    bio: "",
    created: "",
}


export default function Profile({ params }: { params: { pid: string } }) {

    const { pid } = params;

    const [publicTodos, setPublicTodos] = useState([]);
    const [privateTodos, setPrivateTodos] = useState([]);
    const [isOwner, setISOwner] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState(initialuserData);

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


    useEffect(() => {

        if (user?.uid === pid) {
            setISOwner(true);
            track('view_own_profile', {
                uid: pid,
                email: `${user?.email}`
            });
        }


        const getUserData = async () => {
            const docRef = doc(db, "users", pid);
            const docSnap = await getDoc(docRef);
            const data = [];
            if (docSnap.exists()) {

                data.push(docSnap.data());
                const date = new Date(
                    (data[0]?.created).seconds * 1000 + (data[0]?.created).nanoseconds / 1000000,
                ).toLocaleDateString('en-UK');

                setUserData({
                    name: data[0]?.name,
                    bio: data[0]?.bio,
                    created: date
                });

                track('view_profile', {
                    name: data[0]?.name,
                    uid: pid,
                    email: `${user?.email}`
                });


            } else {
                toast.error("Couldn't find user name");
            }
        }

        const getTodos = () => {

            axios.post("/api/getMultipleTodos", {
                aplicant: user?.uid,
                author: pid
            }).then((res) => {

                const todos = res.data;

                if (user?.uid === pid) {

                    setPublicTodos(todos.publicTodos);
                    setPrivateTodos(todos.privateTodos);

                } else {

                    setPublicTodos(todos.publicTodos);
                }


            }).catch(err => console.error(err.response));
        }

        getTodos();
        getUserData();
    }, [pid, user]);

    return (
        <>
            <ToastContainer theme="dark" />
            <div className={style.profileMain}>

                <div className={style.profileBox}>

                    <div className={style.profilePicArea}>
                        <div className={style.profilePic}>
                            {/* <img src={`https://images.placeholders.dev/?width=150&height=150&text=${userData?.name.split(" ")[0]}&bgColor=%23F6E444&textColor=%23252A34`} width="150px" height="150px" alt="" /> */}
                            {userData?.name.split(" ")[0]}
                        </div>
                    </div>


                    <h2>{userData?.name}</h2>
                    <p className={style.bio}>{userData?.bio}</p>
                    <p>Member since: <i>{userData?.created}</i></p>
                    <Link href={`/editProfile`} className="btn">Edit profile</Link>
                    <button className="btn" onClick={() => {
                        navigator.clipboard.writeText(`${location.href}`);
                        track('copy_profile_link', {
                            uid: pid,
                            email: `${user?.email}`
                        });
                        navigator.vibrate(200);
                        toast.success("Link copied to clipboard");
                    }}><FaLink /> Copy profile link</button>
                </div>


                <div className={style.todoBoxArea}>
                    <h1>Todos</h1>
                    <h2>Public:</h2>
                    <hr />
                    {publicTodos.length === 0 ? <p style={{ color: "var(--red)" }}>No public todos</p> : null}
                    <div className={style.tBoxHoler}>
                        {publicTodos.map((todo: any) => {
                            const progress = ((todo.lists.filter((list: any) => list.done).length / todo.lists.length) * 100).toString();
                            return (
                                <PtodoBox tdTitle={todo.title} progress={progress} tid={todo.tid} author={todo.author} key={todo.tid} isOwner={isOwner} />
                            )
                        })}
                    </div>
                    {isOwner ?
                        <>
                            <h2>Private:</h2>
                            <hr />
                            {privateTodos.length === 0 ? <p style={{ color: "var(--red)" }}>No private todos</p> : null}
                            <div className={style.tBoxHoler}>
                                {privateTodos.map((todo: any) => {
                                    const progress = ((todo.lists.filter((list: any) => list.done).length / todo.lists.length) * 100).toString();
                                    return (
                                        <PtodoBox tdTitle={todo.title} progress={progress} tid={todo.tid} author={todo.author} key={todo.tid} isOwner={isOwner} />
                                    )
                                })}
                            </div>
                        </> : null}


                </div>
            </div>
        </>
    )
}
