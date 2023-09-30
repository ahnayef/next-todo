import style from "./signin.module.css"
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from "react-icons/fa"
import Link from "next/link";
import { Metadata } from "next";


export const metadata :Metadata = {
    title: 'Todogram',
    description: 'Sign up on todogram',
    authors:[{name:"AHNayef",url:"https://ahnayef.t.me"}],
    keywords:["todo", "workflow", "management", "routine", "progress"],
    metadataBase: new URL('https://todogram.vercel.app'),
    viewport:{
        width:"device-width",
        initialScale:1,
        userScalable:false
    },

    openGraph: {
      url: 'https://www.todogram.vercel.app',
      siteName: 'Todogram',
      images: [
        {
          url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/signup.png',
          width: 1280,
          height: 640,
          alt: 'Meta Image',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter:{
        creator:"_AHNayef_",
        images: [
            {
              url: 'https://raw.githubusercontent.com/ahnayef/next-todo/main/app/assets/img/meta/contact.png',
              width: 1280,
              height: 640,
              alt: 'Meta Image',
            },
          ],
    }
  }

export default function page() {
    return (
        <div className={style.signupMain}>
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
                <p>Already Have account? <Link href="/signup">signup</Link> </p>
            </form>
        </div>
    )
}
