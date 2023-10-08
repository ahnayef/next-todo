import style from "./about.module.css";

export default function About() {
  return (

    <div className={style.aboutMain}>

      <div className={style.notepad}>
        <div className={style.top}><h2>About</h2></div>

        <div className={style.paper}>

          <p>
            Everyone works, right? But who really wins in the end? It's not about having a messy approach to work or feeling tired all the time. The true winner plans smartly. Turns out, planning is like doing half the work. Without it, things get tricky. Back when I was younger, I didn't plan anything. My work was all over the place, and the results? Not great.</p>
          <br />
          <p>Even when I started web developing, my work was a bit chaotic. Tasks took longer than I expected. That's when I figured out planning—breaking tasks into smaller parts. It speeds things up, and the results are way better. Since then, I've been breaking down tasks regularly and getting results I didn't expect.</p>
          <br />
          <p>  In varsity, as a not-so-great student, my results were expected to be pretty bad. But guess what? Planning changed the game. Results were not just better; they were way better than expected. Before exams, I'd split my study plan into smaller parts. People noticed, and they wanted my study breakdowns. So, I used Microsoft Todo to share them through links. No worries about losing plans, easy sharing.</p>
          <br />
          <p> But, here's the thing—it was my personal study plan, not to be copied. That's why I made a simple personalized todo app. Now, everyone can make private and public todos listed on their profile. Anyone can copy and use them. No more trouble sharing my work; it's open for everyone. Welcome to an app where sharing is easy, and planning is the key to success.</p>
          <br />
          <p>@AHNayef</p>
        </div>
      </div>
    </div>


  )
}
