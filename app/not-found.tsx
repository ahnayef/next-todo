"use client"

import Link from "next/link"
import style from "./not-found.module.css"


export default function Err() {
    return (
        <>
            <div className={style.errMain}>

                <div className={style.quoteContainer}>
                    <i className={style.pin}></i>
                    <blockquote className={style.note}>
                        <div className={style.glitch} data-glitch="Erro 404">Erro 404</div>
                        <h4>Page not found</h4>
                        <br />
                        <p>No plan, no work, no progression...</p>
                        <p>Get back to work my dude</p>
                        <Link className={style.goHome} href="/">Take me home</Link>
                        <cite className={style.author}>@AHNayef</cite>
                    </blockquote>


                </div>
            </div>
        </>
    )
}
