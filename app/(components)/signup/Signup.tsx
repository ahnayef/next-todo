"use client"

import style from "./signin.module.css"
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from "react-icons/fa"
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { track } from "@vercel/analytics";
import axios from "axios";

const initialState: { name: string, email: string, bio: string, password: string, confirmPassword: string, created: any } = {
  name: "",
  email: "",
  bio: "",
  password: "",
  confirmPassword: "",
  created: ""
}


export default function Signup() {

  const [formState, setFormState] = useState(initialState);

  const [myUser, loading, error] = useAuthState(auth);


  useEffect(() => {
    if (loading) {
      return;
    }
    else if (myUser) {
      location.href = '/';
    }
    else if (error) {
      console.log(error)
    }
  }, []);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }


  useEffect(() => {
    const getBio = () => {
      axios.get("https://api.quotable.io/quotes/random?maxLength=50&tag=rumi").then((res) => {
        // let tmpBio= res.data;
        formState.bio=`${res.data[0].content} - ${res.data[0].author}`;
      }).catch(err => console.error(err.response));
    }
    getBio();
  }, []);

  const handleSubmit = (e: any) => {

    e.preventDefault();


    const name = formState.name;
    const email = formState.email;
    const password = formState.password;
    const confirmPassword = formState.confirmPassword;

    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        // console.log(email + " " + password);
        createUserWithEmailAndPassword(auth, email, password).then(async (myUser) => {
          track('signup', {
            email: `${email}`
          });
          console.log("Account created");
          try {
            console.log("Adding data to database...")
            await setDoc(doc(db, "users", myUser.user.uid), {
              name: name,
              email: myUser.user.email,
              id: myUser.user.uid,
              bio: formState.bio,
              created: serverTimestamp()
            }).then(() => {
              toast.success("Created account successfully!");
              console.log("Data added to database");
              location.href = "/login";
            });
          } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Error adding document");
          }

        }).catch((error) => {
          const errorMessage = error.message;
          let errMsg = error.code.replace(/auth/g, '').replace(/[^a-zA-Z0-9]|\s\s+/g, ' ').substring(1);
          let newMsg = errMsg[0].toUpperCase() + errMsg.substring(1);
          toast.error(newMsg);
          console.log(errorMessage);
        });

      } else {
        toast.error("Password dosen't match");
      }
    } else {
      toast.error("Fill out the form");
    }


  }


  return (
    <>
      <ToastContainer theme="dark" />
      <div className={style.signupMain}>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>


          <div className={style.inputElem}>
            <i><FaUser /></i>
            <input type="text" maxLength={20} placeholder='Name' name="name" onChange={handleChange} required />
          </div>

          <div className={style.inputElem}>
            <i><MdEmail /> </i>
            <input type="email" placeholder='Email' name="email" onChange={handleChange} required />
          </div>

          <div className={style.inputElem}>
            <i> <RiLockPasswordFill /> </i>
            <input type="password" placeholder='Password' name="password" onChange={handleChange} required />
          </div>

          <div className={style.inputElem}>
            <i> <RiLockPasswordFill /> </i>
            <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={handleChange} required />
          </div>
          <button className={style.btn} type="submit">Sign Up</button>
          <p>Already have account? <Link href="/login">Login</Link></p>
        </form>
      </div>
    </>
  )
}
