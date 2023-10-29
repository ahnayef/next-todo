"use client"

import style from "./navbar.module.css"
import "@/app/assets/icon/style.css"
import Link from "next/link"
import { FaBars, FaEnvelope, FaInfoCircle, FaTimes } from "react-icons/fa"
import { AiFillHome } from "react-icons/ai"
import { IoIosCheckbox } from "react-icons/io"
import { usePathname } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { signOut } from "firebase/auth"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect, useRef, useState } from "react"
import { track } from "@vercel/analytics"

export default function Navbar() {

    const path = usePathname();

    const [user] = useAuthState(auth);
    const [check, setCheke] = useState(false);

    const [navheight, setNavHeight] = useState(0);
    const getHeight = useRef(null);

    useEffect(() => {
        if (getHeight.current) {
            setNavHeight((getHeight.current as HTMLDivElement).clientHeight);
        }
    }, []);


    const triggerNav = () => {
        let check = document.getElementsByClassName("triggerNav")[0] as HTMLInputElement;
        check.checked == true ? check.checked = false : check.checked = true;
        setCheke(check.checked);
    }

    const logOut = () => {
        track('logout from nav', {
            email: `${user?.email}`,
            uid: `${user?.uid}`
        });
        signOut(auth)
            .then(() => {
                triggerNav();
                toast.success("Logged out");
            })
            .catch((error) => {
                toast.error("Something went wrong");
                console.log(error);
            });
    };


    return (
        <>
            <ToastContainer theme="dark" />
            <nav className={style.navMain} ref={getHeight}>
                <input type="checkbox" className='triggerNav' id={style.navTg} hidden />
                <div className={style.logo}>
                    <Link href="/"> <i className="icon-check"></i> Todo</Link>
                </div>

                <div className={style.navIcons}>
                    <ul>
                        <li onClick={triggerNav}><Link href="/" className={path === "/" ? "active" : ""}> <i><AiFillHome /></i> Home </Link></li>
                        <li onClick={triggerNav}><Link href="/todos" className={path === "/todos" ? "active" : ""}> <i><IoIosCheckbox /></i> Todos </Link></li>
                        <li onClick={triggerNav}><Link href="/about" className={path === "/about" ? "active" : ""}> <i><FaInfoCircle /></i> About </Link></li>
                        <li onClick={triggerNav}><Link href="/contact" className={path === "/contact" ? "active" : ""}> <i><FaEnvelope /></i> Contact</Link></li>
                    </ul>

                    <div className={style.navProfile2}>
                        <div className={style.navProfileMenu2}>
                            <Link href={`/profile/${user?.uid}`} className="btn" onClick={triggerNav}>Profile</Link>
                            {
                                user ?
                                    <div className="btn del" onClick={logOut}>Logout</div> : ""
                            }
                        </div>
                        <button className="btn  del" onClick={triggerNav}><FaTimes /></button>
                    </div>

                </div>

                <div className={style.navProfile}>
                    <div className={style.navProfileMenu} >
                        <Link href={`/profile/${user?.uid}`} onClick={triggerNav}>Profile</Link>
                        {
                            user ?
                                <div className={`${style.btn} ${style.red}`} onClick={logOut}>Logout</div> : ""
                        }
                    </div>
                </div>
                <i className={style.navTg} onClick={triggerNav}>
                    {check ? <FaTimes  style={{ color: "red" }} /> : <FaBars/>}
                </i>
            </nav>
            <div style={{ height: navheight + 20 }} ></div>
        </>
    )
}
