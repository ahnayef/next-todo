import style from './page.module.css'

export default function Home() {
  return (
    <div className={style.home}>
      <div className={style.left}>
          <button>Log in</button>
          <button>Sign up</button>
      </div>
      <div className={style.right}>
        <div className={style.todoBox}>
          <h1>Todo</h1>
          <p>Small steps, big impact.</p>
          <button>Create your first todo</button>
        </div>
      </div>
    </div>
  )
}
