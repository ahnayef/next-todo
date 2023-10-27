import { FaLink } from "react-icons/fa"
import style from "./profile.module.css"


export default function Page({ params }: { params: { pid: string } }) {
    return (
        <div className={style.profileMain}>
            <div className={style.profileBox}>
                <div className={style.profilePic}>
                    <img src="https://via.placeholder.com/150x150" alt="" />
                </div>
                <h2>AHN</h2>
                <p>This is my bio</p>
                <p>Joined: 01/01/2023</p>
                <button className="btn"><FaLink/> Copy profile link</button>
            </div>
            <div className={style.todoBoxArea}>
                <h1>Todos</h1>
                <h2>Public:</h2>
                <hr />
                <div className={style.tBoxHoler}>
                    
                </div>
                <h2>Private:</h2>
                <hr />
                <div className={style.tBoxHoler}>

                </div>
            </div>
        </div>
    )
}
