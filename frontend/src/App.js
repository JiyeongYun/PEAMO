import "./App.css";
import { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGitlab,
  faJira,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
// Routers
import Home from "./routers/Home";
import About from "./routers/About";
import Search from "./routers/Search";
import Teller from "./routers/Teller";
// Components
import SignIn from "./components/AuthComponents/SignIn";
import Teller2 from "./routers/Teller2";
import Teller3 from "./routers/Teller3";
import Teller4 from "./routers/Teller4";
import Teller5 from "./routers/Teller5";
import Teller6 from "./routers/Teller6";
import TellerResult from "./routers/TellerResult";

function App() {
  // useState
  const [main, setMain] = useState(true);
  const [showSignin, setShowSignin] = useState(false);
  const [page_num, setPageNum] = useState(null);

  // KOW - main 사진 번호 랜덤 생성 시작
  useEffect(() => {
    let num = Math.floor(Math.random() * 7 + 1);
    if (num === 8) {
      num = 7;
    }
    setPageNum(num);
  }, [main]);
  // KOW - main 사진 번호 랜덤 생성 끝

  // 로그인 창을 보여주는 함수
  const toggleSignin = (e) => {
    e.preventDefault();
    setShowSignin(!showSignin);
  };

  return (
    <div className='App'>
      {showSignin ? <SignIn toggleSignin={toggleSignin} /> : null}
      <header>
        <div>
          <div className='header__left'>
            <Link to='/teller-1'>PE' AMO Teller</Link>
            <Link to='/about'>About</Link>
          </div>
          <div className='header__mid'>
            <Link to='/' onClick={() => setMain(!main)}>
              PE' AMO
            </Link>
          </div>
          <div className='header__right'>
            <Link onClick={toggleSignin} to='/about'>
              Sign in
            </Link>
            <Link to='/search'>Search</Link>
          </div>
        </div>
      </header>

      <div className='container'>
        <Route
          path='/'
          exact={true}
          render={() => <Home page_num={page_num} />}
        />
        <Route path='/about' exact={true} component={About} />
        <Route path='/search' exact={true} component={Search} />
        <Route path='/teller-1' exact={true} component={Teller} />
        <Route path='/teller-2' exact={true} component={Teller2} />
        <Route path='/teller-3' exact={true} component={Teller3} />
        <Route path='/teller-4' exact={true} component={Teller4} />
        <Route path='/teller-5' exact={true} component={Teller5} />
        <Route path='/teller-6' exact={true} component={Teller6} />
        <Route path='/teller-result' exact={true} component={TellerResult} />
      </div>

      <footer>
        <div className='icons'>
          <FontAwesomeIcon icon={faGitlab} />
          <FontAwesomeIcon icon={faJira} />
          <FontAwesomeIcon icon={faYoutube} />
        </div>
        <p className='slogan'>Find Your Color, PE' AMO</p>
        <div className='team'>
          <p>Team OSDS</p>
          <p>Name: 오순도순 | FE: 권오우, 서예리 | BE: 윤지영, 장현웅</p>
        </div>
        <div className='company'>
          <div className='left'>
            <p>이용약관</p>
            <p>개인정보처리방침</p>
          </div>
          <div className='right'>Copyright OSDS Team. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
