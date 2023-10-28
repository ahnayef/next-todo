"use client"

import style from "./contact.module.css"
import { MdEmail } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
import { getAnalytics, logEvent } from "firebase/analytics";

const initialState:{name:string,email:string,message:string}={
    name:"",
    email:"",
    message:""
};

export default function Contact() {

    const[formState,setFormState]=useState(initialState);
    const [loading, setLoading] = useState(false);

    const analytics = getAnalytics();

    useEffect(()=>{
        logEvent(analytics,"Contact page visited");
    },[]);


    const handleChange = (e:any)=>{
        const {name,value} =e.target;
        setFormState({...formState,[name]:value});
    }


    const handleSubmit =(e:any)=>{
        e.preventDefault();
        setLoading(true);
        
        axios.post('/api/sendTgMsg', formState).then(res => {
            setLoading(false);
            toast.success(res.data.message);
            setFormState(initialState);
            e.target.reset();
            toast.success("Form submitted successfully!");
            logEvent(analytics,"Contact form submitted",{name:formState.name,email:formState.email});
            toast.warning("Page will reload in 2 seconds");
            setTimeout(() => {
                location.reload();
            }, 2000)

        }
        ).catch(err => {
            if (err.response.data.message) {
                toast.error(err.response.data.message);
                logEvent(analytics,"Contact form submission failed",{name:formState.name,email:formState.email});
                toast.warning("Page will reload in 2 seconds");
            } else {
                toast.error("Something went wrong");
                toast.warning("Page will reload in 2 seconds");

            }
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
        )

    }


    return (
        <>
         <ToastContainer theme="dark"/>

        <div className={style.contactMain}>
            <form onSubmit={handleSubmit}>
                <h1>Contact Us</h1>

                <div className={style.inputElem}>
                    <i><FaUserEdit /> </i>
                    <input  type="text" minLength={3} maxLength={20} placeholder='Name' name="name" onChange={handleChange} required />
                </div>

                <div className={style.inputElem}>
                    <i><MdEmail /> </i>
                    <input  type="email" placeholder='Email' onChange={handleChange} name="email" required />
                </div>

                <div className={style.inputElem}>
                    <i><MdEmail /> </i>
                    <textarea  placeholder='Message' onChange={handleChange} name="message" required />
                </div>

                {
                    loading ? <button className={`${style.btn} ${style.btnActive}`} type="submit">Submitting...</button> : <button className={style.btn} type="submit">Submit</button>
                }
            </form>
        </div>
        </>
    )
}
