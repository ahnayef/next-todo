import Link from "next/link";
import style from "./contact.module.css"
import { MdEmail } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';

export default function page() {
    return (
        <div className={style.contactMain}>
            <form>
                <h1>Contact Us</h1>

                <div className={style.inputElem}>
                    <i><FaUserEdit /> </i>
                    <input id='uEmail' type="text" minLength={3} maxLength={20} placeholder='Name' required />
                </div>

                <div className={style.inputElem}>
                    <i><MdEmail /> </i>
                    <input id='uEmail' type="email" placeholder='Email' required />
                </div>

                <div className={style.inputElem}>
                    <i><MdEmail /> </i>
                    <textarea id='uEmail' placeholder='Message' required />
                </div>


                <button className={style.btn} type="submit">Submit</button>
            </form>
        </div>
    )
}
