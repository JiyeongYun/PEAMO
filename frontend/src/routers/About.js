import './About.css'
// import AboutIntroduce from '../components/AboutComponents/AboutIntroduce'
import PerfumeKind from '../components/AboutComponents/PerfumeKind'
import SelectGuide from '../components/AboutComponents/SelectGuide'
import PerfumeNote from '../components/AboutComponents/PerfumeNote'
import $ from 'jquery';
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

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
    if (dis2 < 700) {
      scrollList2.forEach(e => {
        e.classList.add('show')
        window.scrollTo(0, 0)
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

  const scrollMove = () => {
    var offset = $("#perfume_kind").offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
  }

  return (
    <div className="about">
      <div className="aboutintro">
        <div className="intro_img">
          <img src={'/images/logo_black.png'} alt={'logo'} />
        </div>
        <div className="intro_content">
          <p>PE' AMO STORY</p>
          <br></br>
          <p>-</p>
          <br></br>
          <p>오늘 당신은 어떤 향기를 입고 있나요</p>
          <br></br>
          <p>당신의 일부가 되는 최적의 향수를 찾는 일,</p>
          <p>그것이 PE' AMO가 존재하는 이유입니다.</p>
        </div>
        <div className="intro_bottom">
          <div className="intro_btn">
              <p onclick={scrollMove}>더 알아보기</p>
          </div>
        </div>
      </div>
      <div className="perfume_kind" id="perfume_kind">
        <img src={'/images/about.jpg'} alt={'about'} />
        <div className="kind_name">
          향수의 종류
        </div>
        <div className="kind_table">
          <div className="grey_canvas_2"></div>
          <PerfumeKind></PerfumeKind>
        </div>
        <a href="#perfume_select">
          <FontAwesomeIcon className="down_icon" icon={faAngleDoubleDown} size="3x" />
        </a>
      </div>
      <div className="perfume_select" id="perfume_select">
        <SelectGuide></SelectGuide>
        <a href="#perfume_note">
          <FontAwesomeIcon className="down_icon black_icon" icon={faAngleDoubleDown} size="3x" />
        </a>
      </div>
      <div className="perfume_note" id="perfume_note">
        <PerfumeNote></PerfumeNote>
      </div>
    </div>
  )
}

export default About