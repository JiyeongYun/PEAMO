import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPerfumeDetail } from '../components/Common/commonSlice';
import { Link } from 'react-router-dom';
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
      {
        myPerfume.length === 0 ?
        <div className="no_perfume">
          <p>🤍를 누른 향수가 없습니다</p>
          <div className="link_box">
            <Link to="/teller-1">
              <p>나만의 향수 추천</p>
            </Link>
          </div>
          <p>혹은</p>
          <div className="link_box">
            <Link to="/search">
              <p>향수 검색</p>
            </Link>
          </div>
        </div>
          :
          <Grid className={classes.root} container spacing={2}>
            {myPerfume.map((perfume) => (
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
      }
    </div>
  );
}

export default Mypage;
