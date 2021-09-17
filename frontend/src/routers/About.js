import './About.css'
import PerfumeKind from '../components/AboutComponents/PerfumeKind'
import SelectGuide from '../components/AboutComponents/SelectGuide'
import PerfumeNote from '../components/AboutComponents/PerfumeNote'
import { useEffect } from 'react'

function About() {
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header')
    header.style.backgroundColor = '#1C1C1C'
  }, [])
  // header 검은색으로 변경

  // scroll animation 관련
  window.scrollTo(0, 0)
  const scroll_animation = () => {
    const perfumeSelect = document.querySelector(".perfume_select")
    const perfumeNote = document.querySelector(".perfume_note")
    const dis1 = perfumeSelect.getBoundingClientRect().top
    const dis2 = perfumeNote.getBoundingClientRect().top
    const scrollList1 = perfumeSelect.querySelectorAll(".scroll")
    const scrollList2 = perfumeNote.querySelectorAll(".scroll")
    if (0 <= dis1 && dis1 < 400) {
      scrollList1.forEach(e => {
        e.classList.add('show')
      })
    } else {
      scrollList1.forEach(e => {
        e.classList.remove('show')
      })
    }
    if (dis2 < 0) {
      window.scrollTo(0, 0)
    } else if (dis2 < 700) {
      scrollList2.forEach(e => {
        e.classList.add('show')
      })
    } else {
      scrollList2.forEach(e => {
        e.classList.remove('show')
      })
    }
  }
  useEffect(() => {
    scroll_animation()
    document.querySelector('.about').addEventListener('scroll', scroll_animation)
  }, [])
  // scroll animation 관련 끝

  return (
    <div className="about">
      <div className="perfume_kind">
        <img src={'/images/about.jpg'} alt={'about'} />
        <div className="kind_name">
          향수의 종류
        </div>
        <div className="kind_table">
          <div className="grey_canvas_2"></div>
          <PerfumeKind></PerfumeKind>
        </div>
      </div>
      <div className="perfume_select">
        <SelectGuide></SelectGuide>
      </div>
      <div className="perfume_note">
        <PerfumeNote></PerfumeNote>
      </div>
    </div>
  )
}

export default About