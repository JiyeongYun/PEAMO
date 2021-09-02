import './App.css';
import { Route, Link } from 'react-router-dom'
// Components
import Home from './routers/Home'
import About from './routers/About'
import Recommendation from './routers/Recommendation'
import Teller from './routers/Teller'
import SignIn from './routers/SignIn'

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <div className="header__left">
            <Link to="/teller">pe' amo Teller</Link>
            <Link to="/recommendation">Recommendation</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="header__mid">
            <Link to="/">PE' AMO</Link>
          </div>
          <div className="header__right">
            <Link to="/signin"><p>Sign in</p></Link>
            <p>Search</p>
          </div>
        </div>
      </header>

      <div className="container">
        <Route path="/" exact={true} component={Home}/>
        <Route path="/about" exact={true} component={About}/>
        <Route path="/recommendation" exact={true} component={Recommendation}/>
        <Route path="/teller" exact={true} component={Teller}/>
        <Route path="/signin" exact={true} component={SignIn}/>
      </div>

      <footer>
        <div className="icons">g</div>
        <p className="slogan">Find Your Color, PE' AMO</p>
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
