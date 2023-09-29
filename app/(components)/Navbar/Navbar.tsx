"use client"

import style from "./navbar.module.css"
import "@/app/assets/icon/style.css"
import Link from "next/link"
import { FaEnvelope, FaInfoCircle, FaUserCircle } from "react-icons/fa"
import { AiFillHome } from "react-icons/ai"
import { IoIosCheckbox } from "react-icons/io"
import { usePathname } from "next/navigation"

export default function Navbar() {

    const path = usePathname();

    return (
        <nav className={style.navMain}>
            <div className={style.logo}>
                <Link href="/"> <i className="icon-check"></i> Todo</Link>
            </div>

            <div className={style.navIcons}>
                <ul>
                    <li><Link href="/" className={path === "/" ? "active" : ""}> <i><AiFillHome /></i> Home </Link></li>
                    <li><Link href="/todo" className={path === "/todo" ? "active" : ""}> <i><IoIosCheckbox /></i> Todo </Link></li>
                    <li><Link href="/about" className={path === "/about" ? "active" : ""}> <i><FaInfoCircle /></i> About </Link></li>
                    <li><Link href="/contact" className={path === "/contact" ? "active" : ""}> <i><FaEnvelope /></i> Contact</Link></li>
                </ul>
            </div>
            <div className={style.navIcons}>
                <i><FaUserCircle /></i>
            </div>
        </nav>
    )
}
