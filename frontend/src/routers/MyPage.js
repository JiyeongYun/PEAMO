import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPerfumeDetail } from '../components/Common/commonSlice';
// css
import './MyPage.css';
import { makeStyles } from '@material-ui/core/styles';
// components
// import { logout } from '../components/AuthComponents/authSlice';
import PerfumeCard from '../components/MypageComponents/PerfumeCard';
import Grid from '@material-ui/core/Grid';
import PerfumeDetail from '../components/Common/PerfumeDetail';
// redux reducer
import { getMyPerfume } from '../components/MypageComponents/myPageSlice';
import { logout } from '../components/AuthComponents/authSlice';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
    flexGrow: 1,
    width: '80vw',
  },
}));

function Mypage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { myPerfume } = useSelector((state) => state.mypage);
  // 향수 디테일 모달 state
  const [showPerfumeDetail, setShowPerfumeDetail] = useState(false);

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

  // 카카오 로그아웃
  const kakaoLogout = () => {
    dispatch(logout())
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          alert('로그아웃 성공');
        }
      })
      .catch(() => {
        alert('로그아웃 실패');
      });
  };

  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
    dispatch(getMyPerfume());
  }, [dispatch]);
  // header 검은색으로 변경

  return (
    <div className="mypage">
      {showPerfumeDetail && (
        <PerfumeDetail togglePerfumeDetail={togglePerfumeDetail} />
      )}
      <p className="mypage_title">나의 향수함</p>
      <Grid className={classes.root} container spacing={2}>
        {myPerfume &&
          myPerfume.map((perfume) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              onClick={() => togglePerfumeDetail(perfume.id)}
            >
              <PerfumeCard
                key={`${perfume.id}_${perfume.name}`}
                perfume={perfume}
              />
            </Grid>
          ))}
      </Grid>
      <button className="logout_button" onClick={() => kakaoLogout()}>
        logout
      </button>
    </div>
  );
}

export default Mypage;
