import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// style
import './Home.css';

// library
import axios from 'axios';

// action
import { login } from '../components/AuthComponents/authSlice';
import { getPerfumeDetail } from '../components/Common/commonSlice';

// component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import PerfumeDetail from '../components/Common/PerfumeDetail';

function Home({ page_num, setIsLoggedIn }) {
  // state
  const [monthlyPerfumeList, setMonthlyPerfumeList] = useState([]);
  // 향수 디테일 모달 state
  const [showPerfumeDetail, setShowPerfumeDetail] = useState(false);
  // state 끝
  // useDispatch
  const dispatch = useDispatch();
  // scroll animation 관련
  window.scrollTo(0, 0);
  const scroll_animation = () => {
    const monthlyPerfume = document.querySelector('.this_month_perfume');
    const scrollList = document.querySelectorAll('.scroll');
    const dis = monthlyPerfume.getBoundingClientRect().top;
    const header = document.querySelector('header');
    if (dis < 400) {
      header.style.backgroundColor = '#1C1C1C';
      scrollList.forEach((e) => {
        e.classList.add('show');
      });
    } else {
      header.style.backgroundColor = 'inherit';
      window.scrollTo(0, 0);
      scrollList.forEach((e) => {
        e.classList.remove('show');
      });
    }
  };
  useEffect(() => {
    scroll_animation();
    document
      .querySelector('.home')
      .addEventListener('scroll', scroll_animation);
  }, []);
  // scroll animation 관련 끝

  //kakao api 인증 토큰 가져오기
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      dispatch(login(code))
        .unwrap()
        .then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
            alert('로그인 성공');
          }
        })
        .catch(() => {
          alert('로그인 실패');
        });
    }
  }, [dispatch, setIsLoggedIn]);

  // 이달의 향수 가져오기

  if (!monthlyPerfumeList.length) {
    axios
      .get('http://j5a403.p.ssafy.io:8000/perfume/thismonth')
      .then((res) => {
        if (res.status === 200) {
          setMonthlyPerfumeList(res.data.PerfumeSimpleInfoList);
        }
      })
      .catch((err) => console.log(err));
  }
  // 이달의 향수 가져오기 끝

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
    <div className="home">
      {showPerfumeDetail && (
        <PerfumeDetail togglePerfumeDetail={togglePerfumeDetail} />
      )}
      <div className="white_canvas">
        <div className="grey_canvas"></div>
        <img src={`/images/main_${page_num}.jpg`} alt={`main_${page_num}`} />
        <div className="home_bottom">
          <h1>Personal Perfume</h1>
          <h3>당신에게 어울리는 향수를 찾아보세요</h3>
          <div className="home_btn">
            <Link to="/teller">
              <p>나만의 향수 추천</p>
            </Link>
          </div>
        </div>
        <a href="#this_month_perfume">
          <FontAwesomeIcon
            className="down_icon"
            icon={faAngleDoubleDown}
            size="3x"
          />
        </a>
      </div>
      <div className="this_month_perfume" id="this_month_perfume">
        <div className="center_pos">
          <div className="title scroll">이달의 향수</div>
          <div className="perfumes scroll">
            {monthlyPerfumeList.length !== 0 &&
              monthlyPerfumeList.map((perfume) => {
                return (
                  <div
                    key={perfume.id}
                    className="perfume"
                    onClick={() => togglePerfumeDetail(perfume.id)}
                  >
                    <img
                      src={
                        perfume.imgurl ===
                          'http://www.basenotes.net/photos/300noimage.png' ||
                        perfume.imgurl === undefined
                          ? '/images/no_image.png'
                          : perfume.imgurl
                      }
                      alt={perfume.name}
                    />
                    <div className="perfume_info">
                      <p>{perfume.brand}</p>
                      <p>{perfume.name}</p>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
