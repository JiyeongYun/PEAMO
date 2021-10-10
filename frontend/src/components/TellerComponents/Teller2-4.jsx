import { Link } from 'react-router-dom';

function Teller24({ onClick }) {
  return (
    <div className="teller_2">
      <div className="teller_question_2">
        <h2>좋아하는 향기에 더 가까운 이미지는 무엇인가요?</h2>
      </div>
      <div className="teller_image_2">
        <div className="image">
          <Link to="/teller-3" onClick={() => onClick(10)}>
            <img
              src="/images/perfumeteller/teller2-4-1.jpg"
              alt="teller2-4-1"
            ></img>
          </Link>
          <Link to="/teller-3" onClick={() => onClick(10)}>
            <span>자상하게 안아주는 듯한 살 내음</span>
          </Link>
        </div>
        <div className="image">
          <Link to="/teller-3" onClick={() => onClick(6)}>
            <img
              src="/images/perfumeteller/teller2-4-2.png"
              alt="teller2-4-2"
            ></img>
          </Link>
          <Link to="/teller-3" onClick={() => onClick(6)}>
            <span>자극적이고 관능적인 인상을 주는 향</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Teller24;
