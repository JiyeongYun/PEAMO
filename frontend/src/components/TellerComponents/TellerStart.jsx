import { Link } from 'react-router-dom';

function TellerStart() {
  return (
    <div className="tellerstart">
      <div className="startimg">
        <img src="/images/logo_half.png" alt="logo_half"></img>
      </div>
      <div className="tellerstart_bottom">
        <div className="teller_btn">
          <Link to={{ pathname: '/teller-1' }}>
            <p>당신의 취'향'을 탐색합니다</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TellerStart;
