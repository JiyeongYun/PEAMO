import { Link } from 'react-router-dom'
import './Home.css'

function Home({page_num}) {

    return (
        <div className="home">
            <div className="grey_canvas"></div>
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