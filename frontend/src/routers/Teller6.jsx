import { useEffect } from 'react';
import './Teller6.css';
import { Link } from 'react-router-dom';

function Teller6() {
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
  }, []);
  // header 검은색으로 변경

  // 사진 혹은 text 클릭 시 localStrage에 저장
  const onClick = (cat) => {
    localStorage.setItem('gender', cat);
  };

  return (
    <div className="teller6">
      <div className="teller_6">
        <div className="teller_question_6">
          <h2>향수를 사용하는 사람은 누구인가요?</h2>
        </div>
        <div className="teller_answer_6">
          <span>
            <Link to="/teller-result" onClick={() => onClick(1)}>
              남성
            </Link>
          </span>
          <br></br>
          <span>
            <Link to="/teller-result" onClick={() => onClick(2)}>
              여성
            </Link>
          </span>
          <br></br>
          <span>
            <Link to="/teller-result" onClick={() => onClick(0)}>
              남녀겸용
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Teller6;
