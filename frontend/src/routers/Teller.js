import { useEffect } from "react";
import "./Teller.css";
import Teller1 from "../components/TellerComponents/Teller1";

function Teller() {
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector("header");
    header.style.backgroundColor = "#1C1C1C";
  }, []);
  // header 검은색으로 변경

  return (
    <div className='teller'>
      {/* <div class="navbar"></div> */}
      <Teller1></Teller1>
    </div>
  );
}

export default Teller;
