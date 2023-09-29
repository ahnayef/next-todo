import Link from "next/link";
import style from "./login.module.css"
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

export default function page() {
    return (
        <div className={style.loginMain}>
            <form>
                <h1>Log in</h1>
                <div className={style.inputElem}>
                    <i><MdEmail /> </i>
                    <input id='uEmail' type="email" placeholder='Email' required />
                </div>

                <div className={style.inputElem}>
                    <i> <RiLockPasswordFill /> </i>
                    <input id='uPassword' type="password" placeholder='Password' required />
                </div>
                <button className={style.btn} type="submit">Login</button>
                <p>Not Have an account? <Link href="/signup">Signup</Link> </p>
            </form>
        </div>
    )
}
