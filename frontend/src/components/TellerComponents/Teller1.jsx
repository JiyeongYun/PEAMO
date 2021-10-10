import { Link } from 'react-router-dom';
// import Teller from './routers/Teller'
// import Teller2 from '../../routers/Teller2'

function Teller1() {
  return (
    <div className="teller1">
      <div className="teller_question_1">
        <h2>떠올리는 것만으로도 행복해지는 향기는 무엇인가요?</h2>
      </div>
      <div className="teller_image_1">
        <div className="image">
          <Link to={{ pathname: '/teller-2', state: { question: 1 } }}>
            <img
              src="/images/perfumeteller/teller1-1.jpg"
              alt="teller1-1"
            ></img>
          </Link>
          <Link to={{ pathname: '/teller-2', state: { question: 1 } }}>
            <span>생기가 넘쳐보이는 달콤한 향</span>
          </Link>
        </div>
        <div className="image">
          <Link to={{ pathname: '/teller-2', state: { question: 2 } }}>
            <img
              src="/images/perfumeteller/teller1-2.jpg"
              alt="teller1-2"
            ></img>
          </Link>
          <Link to={{ pathname: '/teller-2', state: { question: 2 } }}>
            <span>사랑스러움이 돋보이는 꽃 향</span>
          </Link>
        </div>
        <div className="image">
          <Link to={{ pathname: '/teller-2', state: { question: 3 } }}>
            <img
              src="/images/perfumeteller/teller1-3.jpg"
              alt="teller1-3"
            ></img>
          </Link>
          <Link to={{ pathname: '/teller-2', state: { question: 3 } }}>
            <span>지적이고 차분한 나무, 숲 향</span>
          </Link>
        </div>
        <div className="image">
          <Link to={{ pathname: '/teller-2', state: { question: 4 } }}>
            <img
              src="/images/perfumeteller/teller1-4.jpg"
              alt="teller1-4"
            ></img>
          </Link>
          <Link to={{ pathname: '/teller-2', state: { question: 4 } }}>
            <span>상대를 매혹하는 본능적인 향</span>
          </Link>
        </div>
      </div>
      {/* <div className="tellercon">
        <Route path="/teller-2" exact={true} component={Teller2}/>
      </div> */}
    </div>
  );
}

export default Teller1;
