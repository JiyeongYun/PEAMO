import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useDispatch } from 'react-redux';
import { login } from '../components/AuthComponents/authSlice';

function Home({ page_num }) {
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
        .then(({ payload }) => {
          if (payload.status === 200) {
            alert('로그인 성공');
          }
        })
        .catch(() => {
          alert('로그인 실패');
        });
    }
  }, [dispatch]);

  return (
    <div className="home">
      <div className="white_canvas">
        <div className="grey_canvas"></div>
        <img src={`/images/main_${page_num}.jpg`} alt={`main_${page_num}`} />
        <div className="home_bottom">
          <div className="home_btn">
            <Link to="/teller-1">
              <p>나만의 향수 추천</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="this_month_perfume">
        <div className="center_pos">
          <div className="title scroll">이달의 향수</div>
          <div className="perfumes scroll">
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div className="notes">
                #Lavender #Mandarin Orange #Jasmine #Musk
              </div>
            </div>
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div className="notes">
                #Lavender #Mandarin Orange #Jasmine #Musk
              </div>
            </div>
            <div className="perfume">
              <img src="/images/lovely.png" alt="perfume" />
              <div className="perfume_info">
                <p>Libre</p>
                <p>Yves Saint Laurent</p>
              </div>
              <div className="notes">
                #Lavender #Mandarin Orange #Jasmine #Musk
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
