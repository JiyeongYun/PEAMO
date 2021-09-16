import { Link } from 'react-router-dom'

function Teller22 () {
  return (
    <div className="teller_2">
      <div className="teller_question_2">
        <h2>좋아하는 향기에 더 가까운 이미지는 무엇인가요?</h2>
      </div>
      <div className="teller_image_2">
        <div className="image">
        <Link to="/teller-3">  
          <img src="/images/perfumeteller/teller2-2-1.jpg" alt="teller2-2-1"></img>
        </Link>  
        <Link to="/teller-3">
          <p>살랑바람을 타고 날아드는 꽃내음</p>
        </Link>  
        </div>
        <div className="image">
        <Link to="/teller-3">
          <img src="/images/perfumeteller/teller2-2-2.jpg" alt="teller2-2-2"></img>
        </Link>  
        <Link to="/teller-3">
          <p>고혹적인 매력을 뽐내는 꽃다발</p>
        </Link>  
        </div>
      </div>
    </div>
  )
}

export default Teller22