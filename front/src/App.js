import './App.css';
import { Route, Link } from 'react-router-dom'
// Routers
import Home from './routers/Home'
import About from './routers/About'
import Teller from './routers/Teller'
// Components
import SignIn from './components/SignIn'

function App() {

  // 로그인 창을 보여주는 함수
  const showSignIn = (e) => {
    e.preventDefault()
  }
  
  // 검색 창을 보여주는 함수
  const showSearch = (e) => {
    e.preventDefault()
  }
  
  return (
    <div className="App">
      <header>
        <div>
          <div className="header__left">
            <Link to="/teller">PÉ AMO Teller</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="header__mid">
            <Link to="/">PÉ AMO</Link>
          </div>
          <div className="header__right">
            <Link onClick={showSignIn}>Sign in</Link>
            <Link onClick={showSearch}>Search</Link>
          </div>
        </div>
      </header>

      <div className="container">
        <Route path="/" exact={true} component={Home}/>
        <Route path="/about" exact={true} component={About}/>
        <Route path="/teller" exact={true} component={Teller}/>
      </div>

      <footer>
        <div className="icons">g</div>
        <p className="slogan">Find Your Color, PÉ AMO</p>
        <div className="team">
          <p>Team OSDS</p>
          <p>Name: 오순도순 | FE: 권오우, 서예리 | BE: 윤지영, 장현웅</p>
        </div>
        <div className="company">
          <div className="left">
            <p>이용약관</p>
            <p>개인정보처리방침</p>
          </div>
          <div className="right">
            Copyright OSDS Team. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
