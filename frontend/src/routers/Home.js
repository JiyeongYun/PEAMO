import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home({page_num}) {
  // scroll animation 관련
  window.scrollTo(0, 0)
  const scroll_animation = () => {
    const monthlyPerfume = document.querySelector(".this_month_perfume")
    const scrollList = document.querySelectorAll(".scroll")
      const dis = monthlyPerfume.getBoundingClientRect().top
      const header = document.querySelector('header')
      if (dis < 400) {
        header.style.backgroundColor = '#1C1C1C'
        scrollList.forEach(e => {
          e.classList.add('show')
        })
      } else {
        header.style.backgroundColor = 'inherit'
        window.scrollTo(0, 0)
        scrollList.forEach(e => {
          e.classList.remove('show')
        })
      }
  }
  useEffect(() => {
    scroll_animation()
    document.querySelector('.home').addEventListener('scroll', scroll_animation)
  }, [])
  // scroll animation 관련 끝


  return (
    <div className="home">
      <div className="white_canvas">
        <div className="grey_canvas"></div>
        <img src={`/images/main_${page_num}.jpg`} alt={`main_${page_num}`} />
        <div className="home_bottom">
          <div className="home_btn">
            <Link to="/teller">나만의 향수 추천</Link>
          </div>
        </div>
      </div>
      <div className="this_month_perfume">
        <div className="center_pos">
          <div className="title scroll">이달의 향수</div>
          <div className="perfumes scroll">
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div className="notes">#Lavender #Mandarin Orange #Jasmine #Musk</div>
            </div>
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div className="notes">#Lavender #Mandarin Orange #Jasmine #Musk</div>
            </div>
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div className="notes">#Lavender #Mandarin Orange #Jasmine #Musk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home