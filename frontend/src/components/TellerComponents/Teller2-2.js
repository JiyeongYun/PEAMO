import { Link } from 'react-router-dom'

function Teller22 ({onClick}) {
  return (
    <div className="teller_2">
      <div className="teller_question_2">
        <h2>좋아하는 향기에 더 가까운 이미지는 무엇인가요?</h2>
      </div>
      <div className="teller_image_2">
        <div className="image">
        <Link to="/teller-3" onClick={() => onClick(3)}>  
          <img src="/images/perfumeteller/teller2-2-1.jpg" alt="teller2-2-1"></img>
        </Link>  
        <Link to="/teller-3" onClick={() => onClick(3)}>
          <span>살랑바람을 타고 날아드는 꽃내음</span>
        </Link>  
        </div>
        <div className="image">
        <Link to="/teller-3" onClick={() => onClick(4)}>
          <img src="/images/perfumeteller/teller2-2-2.jpg" alt="teller2-2-2"></img>
        </Link>  
        <Link to="/teller-3" onClick={() => onClick(4)}>
          <span>고혹적인 매력을 뽐내는 꽃다발</span>
        </Link>  
        </div>
      </div>
    </div>
  )
}

export default Teller22