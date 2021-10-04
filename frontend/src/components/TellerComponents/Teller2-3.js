import { Link } from 'react-router-dom'

function Teller23 ({onClick}) {
  return (
    <div className="teller_2">
      <div className="teller_question_2">
        <h2>좋아하는 향기에 더 가까운 이미지는 무엇인가요?</h2>
      </div>
      <div className="teller_image_2">
        <div className="image">
        <Link to="/teller-3" onClick={() => onClick(8)}>  
          <img src="/images/perfumeteller/teller2-3-1.jpg" alt="teller2-3-1"></img>
        </Link>
        <Link to="/teller-3" onClick={() => onClick(8)}>    
          <span>무성한 나무 사이 흙길</span>
        </Link>  
        </div>
        <div className="image">
        <Link to="/teller-3" onClick={() => onClick(5)}>  
          <img src="/images/perfumeteller/teller2-3-2.jpg" alt="teller2-3-2"></img>
        </Link>
        <Link to="/teller-3" onClick={() => onClick(5)}>    
          <span>바람에 흔들리는 들판의 싱그러움</span>
        </Link>
        </div>
      </div>
    </div>
  )
}
  
export default Teller23