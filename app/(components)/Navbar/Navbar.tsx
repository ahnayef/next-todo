"use client"

import style from "./navbar.module.css"
import "@/app/assets/icon/style.css"
import Link from "next/link"
import { FaUserCircle } from "react-icons/fa"

export default function Navbar() {


    return (
        <nav className={style.navMain}>
            <div className={style.logo}>
               <Link href="/"> <i className="icon-check"></i> Todo</Link> 
            </div>

            <div className={style.navIcons}>
                Navicons
            </div>
            <div className={style.navIcons}>
                <i><FaUserCircle /></i>
            </div>
        </nav>
    )
}
