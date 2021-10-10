import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPerfumeDetail } from '../components/Common/commonSlice';
import { Link } from 'react-router-dom';
// css
import './MyPage.css';
import { makeStyles } from '@material-ui/core/styles';
// components
import PerfumeCard from '../components/MypageComponents/PerfumeCard';
import Grid from '@material-ui/core/Grid';
import PerfumeDetail from '../components/Common/PerfumeDetail';
// action
import { getMyPerfume } from '../components/MypageComponents/mypageSlice';

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
  // const [myPerfume, setMyperfume] = useState([]);
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
        <PerfumeDetail
          togglePerfumeDetail={togglePerfumeDetail}
          extra="mypage"
        />
      )}
      <p className="mypage_title">나의 향수함</p>
      {myPerfume.length === 0 ? (
        <div className="no_perfume">
          <p>향수함이 비었습니다</p>
          <div className="flex_box">
            <Link to="/teller">
              <p>향수 추천받기</p>
            </Link>
            <p>|</p>
            <Link to="/search">
              <p>향수 둘러보기</p>
            </Link>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Mypage;
