import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Teller4.css';

function Teller4() {
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
  }, []);
  // header 검은색으로 변경

  return (
    <div className="teller4">
      <div className="teller_4">
        <div className="teller_question_4">
          <h2>싫어하는 향이 있나요?</h2>
        </div>
        <div className="teller_image_41">
          <div className="image">
            <Link to="/teller-5">
              <img
                src="/images/perfumeteller/teller4-1.jpg"
                alt="teller4-1"
              ></img>
            </Link>
            <Link to="/teller-5">
              <span>Vanilla</span>
            </Link>
          </div>
          <div className="image">
            <Link to="/teller-5">
              <img
                src="/images/perfumeteller/teller4-2.jpg"
                alt="teller4-2"
              ></img>
            </Link>
            <Link to="/teller-5">
              <span>Woody</span>
            </Link>
          </div>
          <div className="image">
            <Link to="/teller-5">
              <img
                src="/images/perfumeteller/teller4-3.jpg"
                alt="teller4-3"
              ></img>
            </Link>
            <Link to="/teller-5">
              <span>Spices</span>
            </Link>
          </div>
        </div>
        <div className="teller_image_42">
          <div className="image">
            <Link to="/teller-5">
              <img
                src="/images/perfumeteller/teller4-4.jpg"
                alt="teller4-4"
              ></img>
            </Link>
            <Link to="/teller-5">
              <span>Musk</span>
            </Link>
          </div>
          <div className="image">
            <Link to="/teller-5">
              <img
                src="/images/perfumeteller/teller4-5.jpg"
                alt="teller4-5"
              ></img>
            </Link>
            <Link to="/teller-5">
              <span>Fruits</span>
            </Link>
          </div>
          <div className="image">
            <Link to="/teller-5">
              <img
                src="/images/perfumeteller/teller4-6.jpg"
                alt="teller4-6"
              ></img>
            </Link>
            <Link to="/teller-5">
              <span>Nothing</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teller4;
