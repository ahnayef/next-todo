import Link from 'next/link'
import style from './page.module.css'
import "@/app/assets/icon/style.css"
export default function Home() {
  return (
    <div className={style.home}>
      <div className={style.left}>
          <Link href="/login" className={style.btn}>Log in</Link>
          <Link href="/signup" className={style.btn}>Sign up</Link>
      </div>
      <div className={style.right}>
        <div className={style.todoBox}>
          <h1>Todo</h1>
          <p>Small steps, big impact.</p>
          <Link href="/todo" className={style.btn}>Create your first todo</Link>
          {/* <i className="icon-check"></i> */}
        </div>
      </div>
    </div>
  )
}
