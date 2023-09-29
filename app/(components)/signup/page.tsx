import style from "./signin.module.css"
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from "react-icons/fa"

export default function page() {
    return (
        <div className={style.loginMain}>
            <form>
                <h1>Sign Up</h1>


                <div className={style.inputElem}>
                    <i><FaUser /></i>
                    <input id='uName' type="text" maxLength={20} placeholder='Name' required />
                </div>

                <div className={style.inputElem}>
                    <i><MdEmail /> </i>
                    <input id='uEmail' type="email" placeholder='Email' required />
                </div>

                <div className={style.inputElem}>
                    <i> <RiLockPasswordFill /> </i>
                    <input id='uPassword' type="password" placeholder='Password' required />
                </div>

                <div className={style.inputElem}>
                    <i> <RiLockPasswordFill /> </i>
                    <input id='uConfirmPassword' type="password" placeholder='Confirm Password' required />
                </div>
                <button className={style.btn} type="submit">Sign Up</button>
            </form>
        </div>
    )
}
