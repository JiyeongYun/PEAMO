import { Link } from 'react-router-dom';

function Teller21() {
  return (
    <div className="teller_2">
      <div className="teller_question_2">
        <h2>좋아하는 향기에 더 가까운 이미지는 무엇인가요?</h2>
      </div>
      <div className="teller_image_2">
        <div className="image">
          <Link to="/teller-3">
            <img
              src="/images/perfumeteller/teller2-1-1.jpg"
              alt="teller2-1-1"
            ></img>
          </Link>
          <Link to="/teller-3">
            <p>톡톡 튀는 상쾌함</p>
          </Link>
        </div>
        <div className="image">
          <Link to="/teller-3">
            <img
              src="/images/perfumeteller/teller2-1-2.jpg"
              alt="teller2-1-2"
            ></img>
          </Link>
          <Link to="/teller-3">
            <p>부담스럽지 않은 달콤함</p>
          </Link>
        </div>
        <div className="image">
          <Link to="/teller-3">
            <img
              src="/images/perfumeteller/teller2-1-3.jpg"
              alt="teller2-1-3"
            ></img>
          </Link>
          <Link to="/teller-3">
            <p>시원한 음료의 달콤함</p>
          </Link>
        </div>
        <div className="image">
          <Link to="/teller-3">
            <img
              src="/images/perfumeteller/teller2-1-4.jpg"
              alt="teller2-1-4"
            ></img>
          </Link>
          <Link to="/teller-3">
            <p>바닐라, 꿀과 같은 진득한 달콤함</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Teller21;
