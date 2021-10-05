import { useEffect, useState } from 'react';
import './TellerResult.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Result() {
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
  }, []);
  // header 검은색으로 변경

  // state 값
  const [perfumeList, setPerfumeList] = useState([]);
  // axios 요청 보내서 향수 데이터 가져오기
  if (!perfumeList.length) {
    const mainCategory = localStorage.getItem('mainCategory');
    const subCategory = localStorage.getItem('subCategory');
    const dislikeCategory = localStorage.getItem('dislikeCategory');
    const season = localStorage.getItem('season');
    const gender = localStorage.getItem('gender');
  
    const data = {
      mainCategory,
      subCategory,
      dislikeCategory,
      season,
      gender
    };
  
    axios.post(
      'http://j5a403.p.ssafy.io:8000/perfume/recommend', data
    )
      .then(res => {
        if (res.status === 200) {
          setPerfumeList(res.data)
        };
      })
      .catch(err => console.log(err))
  }
  // axios 요청 보내서 향수 데이터 가져오기 끝

  return (
    perfumeList.length !== 0 &&
      <div className="tellerresult">
        <div className="teller_result">
          <div className="result_question">
            <h2>당신에게 맞는 향수를 골라봤어요!</h2>
          </div>
          <div className="result_image">
            <div className="image2">
              <Link to="/teller-result">
                <img src={perfumeList[1].imgurl} alt={perfumeList[1].name}></img>
              </Link>
              <Link to="/teller-result">
                <p>{perfumeList[1].brand}</p>
                <p>{perfumeList[1].name}</p>
              </Link>
            </div>
            <div className="image1">
              <Link to="/teller-result">
                <img src={perfumeList[0].imgurl} alt={perfumeList[0].name}></img>
              </Link>
              <Link to="/teller-result">
                <p>{perfumeList[0].brand}</p>
                <p>{perfumeList[0].name}</p>
              </Link>
            </div>
            <div className="image3">
              <Link to="/teller-result">
                <img src={perfumeList[2].imgurl} alt={perfumeList[2].name}></img>
              </Link>
              <Link to="/teller-result">
                <p>{perfumeList[2].brand}</p>
                <p>{perfumeList[2].name}</p>
              </Link>
            </div>
          </div>
          <div className="result_123">
            <img src="/images/result_123.png" alt="result_123"></img>
          </div>
        </div>
      </div>
  );
}

export default Result;
