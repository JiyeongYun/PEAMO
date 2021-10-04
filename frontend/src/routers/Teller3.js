import { useEffect } from 'react';
import './Teller3.css';
import { Link } from 'react-router-dom';

function Teller3() {
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
  }, []);
  // header 검은색으로 변경

  // 사진 혹은 text 클릭 시 localStrage에 저장
  const onClick = (cat) => {
    localStorage.setItem('subCategory', cat)
  }

  return (
    <div className="teller3">
      <div className="teller_3">
        <div className="teller_question_3">
          <h2>좋아하는 분위기의 단어는 무엇인가요?</h2>
        </div>
        <div className="teller_answer_3">
          <span><Link to="/teller-4" onClick={() => onClick(1)}>싱그러운</Link></span>
          <br></br>
          <span><Link to="/teller-4" onClick={() => onClick(3)}>부드러운</Link></span>
          <br></br>
          <span><Link to="/teller-4" onClick={() => onClick(2)}>사랑스러운</Link></span>
          <br></br>
          <span><Link to="/teller-4" onClick={() => onClick(8)}>도시적인</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Teller3;
