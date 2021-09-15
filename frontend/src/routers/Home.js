import { Link } from 'react-router-dom'
import './Home.css'

function Home({page_num}) {

  return (
    <div className="home">
      <div className="white_canvas"></div>
      <div className="grey_canvas"></div>
      <img src={`/images/main_${page_num}.jpg`} alt={`main_${page_num}`} />
      <div className="home_bottom">
        <div className="home_btn">
          <Link to="/teller">나만의 향수 추천</Link>
        </div>
      </div>
      <div className="this_month_perfume">
        <div className="center_pos">
          <div className="title">이달의 향수</div>
          <div className="perfumes">
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div>#Lavender #Mandarin Orange #Jasmine #Musk</div>
            </div>
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div>#Lavender #Mandarin Orange #Jasmine #Musk</div>
            </div>
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div>#Lavender #Mandarin Orange #Jasmine #Musk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home