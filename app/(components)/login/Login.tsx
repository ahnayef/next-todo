"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import style from "./login.module.css"
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';

const initialState: { email: string, password: string } = {
    email: "",
    password: ""
}


export default function Login() {

    const [formState, setFormState] = useState(initialState);
    const [user, loading, error] = useAuthState(auth);
    const analytics = getAnalytics();

    useEffect(() => {
        if (loading) {
            return;
        }
        else if (user) {
            location.href = '/';
        }
        else if (error) {
            console.log(error)
        }
    }, [user, loading, error]);



    
    const handlechange = (e: any) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    }

    const hanldeSubmit = (e: any) => {
        e.preventDefault();

        const email = formState.email;
        const password = formState.password;

        if (email && password) {

            signInWithEmailAndPassword(auth, email, password).then((user) => {
                logEvent(analytics, 'login', {
                    uid: user.user?.uid,
                    email: user.user?.email
                });
                toast.success("Login successsfully");

            }).catch((error => {
                const errorMessage = error.message;
                let errMsg = error.code.replace(/auth/g, '').replace(/[^a-zA-Z0-9]|\s\s+/g, ' ').substring(1);
                let newMsg = errMsg[0].toUpperCase() + errMsg.substring(1);
                toast.error(newMsg);
                console.log(errorMessage);
            }))


        } else {
            toast.error("Please fill up the form properly");
        }

    }

    const handleReset = () => {
        const email = formState.email;
        console.log(email);
        if (email && /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
            sendPasswordResetEmail(auth, email).then(() => {
                logEvent(analytics, 'password_reset', {
                    email: email
                });
                toast.success("Email sent successfully");
            }).catch((error) => {
                const errorMessage = error.message;
                let errMsg = error.code.replace(/auth/g, '').replace(/[^a-zA-Z0-9]|\s\s+/g, ' ').substring(1);
                let newMsg = errMsg[0].toUpperCase() + errMsg.substring(1);
                toast.error(newMsg);
                console.log(errorMessage);
            }
            )
        } else {
            toast.error("Please enter a valid email");
            const emailBox = document.querySelector('input[name*="email"]') as HTMLInputElement;
            emailBox?.focus();
        }
    };


    return (
        <>
            <ToastContainer theme='dark' />
            <div className={style.loginMain}>
                <form onSubmit={hanldeSubmit}>
                    <h1>Log in</h1>
                    <div className={style.inputElem}>
                        <i><MdEmail /> </i>
                        <input type="email" placeholder='Email' name="email" onChange={handlechange} required />
                    </div>

                    <div className={style.inputElem}>
                        <i> <RiLockPasswordFill /> </i>
                        <input type="password" placeholder='Password' name="password" onChange={handlechange} required />
                    </div>
                    <button className={style.btn} type="submit">Login</button>
                    <p className={style.red} onClick={handleReset}>Forget password?</p><br/>
                    <p>Don&#39;t have an account? <Link href="/signup">Signup</Link></p>
                </form>
            </div>
        </>
    )
}
