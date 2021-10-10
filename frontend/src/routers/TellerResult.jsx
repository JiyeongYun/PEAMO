import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TellerResult.css';

// component
import PerfumeDetail from '../components/Common/PerfumeDetail';
import Loading from '../components/Loading';

// action
import { getPerfumeDetail } from '../components/Common/commonSlice';

function Result() {
  // state 값
  const [perfumeList, setPerfumeList] = useState([]);
  // 향수 디테일 모달 state
  const [showPerfumeDetail, setShowPerfumeDetail] = useState(false);
  // useDispatch
  const dispatch = useDispatch();
  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
  }, []);
  // header 검은색으로 변경

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
      gender,
    };

    axios
      .post('http://j5a403.p.ssafy.io:8000/perfume/recommend', data)
      .then((res) => {
        if (res.status === 200) {
          setPerfumeList(res.data);
        }
      })
      .catch(() => {});
  }
  // axios 요청 보내서 향수 데이터 가져오기 끝

  // 향수 디테일 모달 열고 닫는 함수
  const togglePerfumeDetail = (perfumeId) => {
    if (!showPerfumeDetail) {
      // 향수 디테일 api 통신
      dispatch(getPerfumeDetail(perfumeId))
        .unwrap()
        .then(() => {
          setShowPerfumeDetail(!showPerfumeDetail);
        });
    } else {
      setShowPerfumeDetail(!showPerfumeDetail);
    }
  };

  return (
    <>
      {showPerfumeDetail && (
        <PerfumeDetail togglePerfumeDetail={togglePerfumeDetail} />
      )}
      {perfumeList.length !== 0 ? (
        <div className="tellerresult">
          <img src="/images/result_back.png" alt="back_ground" />
          <div className="teller_result">
            <div className="result_question">
              <h2>당신에게 맞는 향수를 골라봤어요!</h2>
            </div>
            <div className="result_images">
              {perfumeList.map((perfume) => {
                return (
                  <div
                    className="result_image"
                    key={perfume.id}
                    onClick={() => togglePerfumeDetail(perfume.id)}
                  >
                    <div className="round">
                      <Link to="/teller-result">
                        <img
                          src={
                            perfume.imgurl ===
                              'http://www.basenotes.net/photos/300noimage.png' ||
                            perfume.imgurl === undefined
                              ? '/images/no_image.png'
                              : perfume.imgurl
                          }
                          alt={perfume.name}
                        ></img>
                      </Link>
                    </div>
                    <Link to="/teller-result">
                      <p>{perfume.brand}</p>
                      <p>{perfume.name}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Result;
