import { useEffect } from 'react'
import './TellerResult.css'
import { Link } from 'react-router-dom'

function Result() {

  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header')
    header.style.backgroundColor = '#1C1C1C'
  }, [])
  // header 검은색으로 변경

  return (
    <div className="tellerresult">
      <div className="teller_result">
        <div className="result_question">
          <h2>당신에게 맞는 향수를 골라봤어요!</h2>
        </div>
        <div className="result_image">
          <div className="image2">
            <Link to="/teller-result">
            <img src="/images/perfume_byredo.jpeg" alt="byredo"></img>
            </Link>
            <Link to="/teller-result">
            <p>Bal d'Afrique</p>
            <p>Byredo</p>
            </Link>
          </div>
          <div className="image1">
            <Link to="/teller-result">
            <img src="/images/perfume_jomalone.jpeg" alt="chloe"></img>
            </Link>
            <Link to="/teller-result">
            <p>Chloe(new)</p>
            <p>Chloe</p>
            </Link>
          </div>
          <div className="image3">
            <Link to="/teller-result">
            <img src="/images/perfume_hermes.jpeg" alt="giorgio"></img>
            </Link>
            <Link to="/teller-result">
            <p>Un Jardin en Mediterranee</p>
            <p>Hermes</p>
            </Link>
          </div>      
        </div>
        <div className="result_123">
          <img src="/images/result_123.png" alt="result_123"></img>
        </div>
      </div>
    </div>
  )
}

export default Result