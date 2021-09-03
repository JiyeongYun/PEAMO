import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    // KOW - main 사진 번호 랜덤 생성 시작
    let page_num = Math.floor(Math.random() * 8 + 1)
    if ( page_num === 9) {
        page_num = 8
    }
    // KOW - main 사진 번호 랜덤 생성 끝

    return (
        <div className="home">
            <img src={`/images/main_${page_num}.jpg`} alt={`main_${page_num}`} />
            <div className="home_bottom">
                <div className="home_btn">
                    <Link to="/teller">나만의 향수 추천</Link>
                </div>
            </div>
        </div>
    )
}

export default Home