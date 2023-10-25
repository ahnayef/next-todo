"use client"

import style from "./navbar.module.css"
import "@/app/assets/icon/style.css"
import Link from "next/link"
import { FaEnvelope, FaInfoCircle } from "react-icons/fa"
import { AiFillHome } from "react-icons/ai"
import { IoIosCheckbox } from "react-icons/io"
import { usePathname } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { signOut } from "firebase/auth"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export default function Navbar() {

    const path = usePathname();

    const [user] = useAuthState(auth);


    const logOut = () => {
        signOut(auth).then(() => {
            toast.success("Logged out");
        }).catch((error) => {
            toast.error("Something went wrong");
            console.log(error)
        });
    }


    return (
        <>
            <ToastContainer theme="dark" />
            <nav className={style.navMain}>
                <div className={style.logo}>
                    <Link href="/"> <i className="icon-check"></i> Todo</Link>
                </div>

                <div className={style.navIcons}>
                    <ul>
                        <li><Link href="/" className={path === "/" ? "active" : ""}> <i><AiFillHome /></i> Home </Link></li>
                        <li><Link href="/todos" className={path === "/todos" ? "active" : ""}> <i><IoIosCheckbox /></i> Todos </Link></li>
                        <li><Link href="/about" className={path === "/about" ? "active" : ""}> <i><FaInfoCircle /></i> About </Link></li>
                        <li><Link href="/contact" className={path === "/contact" ? "active" : ""}> <i><FaEnvelope /></i> Contact</Link></li>
                    </ul>
                </div>
                <div className={style.navProfile}>
                    <div className={style.navProfileMenu}>
                        <Link href="/profile">Profile</Link>
                        {
                            user ?
                                <div className={`${style.btn} ${style.red}`} onClick={logOut}>Logout</div> : ""
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
