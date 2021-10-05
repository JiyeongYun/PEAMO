import { useEffect } from 'react';
import './TellerIntro.css';
import TellerStart from '../components/TellerComponents/TellerStart';

function TellerIntro() {
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
  }, []);
  // header 검은색으로 변경

  return (
    <div className="teller">
      <TellerStart></TellerStart>
    </div>
  );
}

export default TellerIntro;