import { Route, Link } from 'react-router-dom'


function Teller1 () {
  return (
    <div className="teller1">
      <div className="teller_question_1">
        <h2>떠올리는 것만으로도 행복해지는 향기는 무엇인가요?</h2>
      </div>
      <div className="teller_image_1">
        <div className="image">
          <img src="/images/perfumeteller/teller1-1.jpg" alt="teller1-1"></img>
          <p>생기가 넘쳐보이는 달콤한 향</p>
        </div>
        <div className="image">
          <img src="/images/perfumeteller/teller1-2.jpg" alt="teller1-2"></img>
          <p>사랑스러움이 돋보이는 꽃 향</p>
        </div>
        <div className="image">
          <img src="/images/perfumeteller/teller1-3.jpg" alt="teller1-3"></img>
          <p>지적이고 차분한 나무, 숲 향</p>
        </div>
        <div className="image">
          <img src="/images/perfumeteller/teller1-4.jpg" alt="teller1-4"></img>
          <p>상대를 매혹하는 본능적인 향</p>
        </div>
      </div>
    </div>
  )
}

export default Teller1