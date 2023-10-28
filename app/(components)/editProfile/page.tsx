"use client"

import { useAuthState } from "react-firebase-hooks/auth";
import style from "./editProfile.module.css"
import { auth, db } from "@/app/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaUserEdit } from "react-icons/fa";


const initialState: { name: string, bio: string } = {
    name: "",
    bio: ""
}

export default function Page() {

    const [user, loading, error] = useAuthState(auth);
    const [profileState, setProfileState] = useState(initialState);
    const [sLoading, setSLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }
        else if (!user) {
            location.href = '/login';
        } else if (user) {
            const loadData = async () => {
                let data = [];
                const docRef = doc(db, "users", `${user.uid}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    data.push(docSnap.data());
                    setProfileState({
                        name: data[0].name,
                        bio: data[0].bio
                    })
                } else {
                    toast.error("Couldn't find user name");
                }
            }
            loadData();
        }
        else if (error) {
            console.log(error)
        }
    }, [user, loading, error]);


    const handleChange = (e: any) => {
        setProfileState({
            ...profileState,
            [e.target.name]: e.target.value
        })
    }

    const updateProfile = async (e: any) => {
        e.preventDefault();
        if (profileState.name.length >= 3 && profileState.bio.length >= 5) {
            setSLoading(true);

            let newProfile = {
                name: profileState.name,
                bio: profileState.bio
            }

            updateDoc(doc(db, "users", `${user?.uid}`), newProfile).then(() => {
                toast.success("Profile updated successfully");
                setSLoading(false);
                setTimeout(() => {
                    location.href = `/profile/${user?.uid}`;
                }, 1000);
            }).catch(err => toast.error(err.message));

        } else {
            toast.warning("Name and bio must be atleast 3 characters long");
            return;
        }
    }
    return (
        <>
            <ToastContainer theme="dark" />
            <div className={style.editProfileMain}>
                <form onSubmit={updateProfile}>
                    <h1>Edit Profile</h1>

                    <div className={style.inputElem}>
                        <i><FaUser /> </i>
                        <input type="text" minLength={3} maxLength={20} placeholder='Name' name="name" value={profileState.name} onChange={handleChange} required />
                    </div>

                    <div className={style.inputElem}>
                        <i><FaUserEdit /> </i>
                        <textarea placeholder='bio'  name="bio" value={profileState.bio} onChange={handleChange} required />
                    </div>

                    {
                        sLoading ? <button className={`${style.btn} ${style.btnActive}`} type="submit">Updating...</button> : <button className={style.btn} type="submit">Update</button>
                    }
                </form>
            </div>
        </>
    )
}
