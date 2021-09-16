import { useEffect } from 'react'
import './Teller6.css'
import { Link } from 'react-router-dom'

function Teller6() {

  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header')
    header.style.backgroundColor = '#1C1C1C'
  }, [])
  // header 검은색으로 변경

  return (
    <div className="teller6">
      <div className="teller_6">
        <div className="teller_question_6">
          <h2>향수를 사용하는 사람은 누구인가요?</h2>
        </div>
        <div className="teller_answer_6">
        <Link to="/teller_result">
          <p>남성</p>
        </Link>
        <Link to="/telle_result">
          <p>여성</p>
        </Link>
        <Link to="/teller-result">
          <p>남녀겸용</p>
        </Link> 
        </div>
      </div>
    </div>
  )
}

export default Teller6