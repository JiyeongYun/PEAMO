import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// css
import './MyPage.css';
import { makeStyles } from '@material-ui/core/styles';
// components
// import { logout } from '../components/AuthComponents/authSlice';
import PerfumeCard from '../components/MypageComponents/PerfumeCard';
import Grid from '@material-ui/core/Grid';
// redux reducer
import { getMyPerfume } from '../components/MypageComponents/MyPageSlice';

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

  const kakaoLogout = () => {
    console.log(myPerfume);
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
      <p className="mypage_title">나의 향수함</p>
      <Grid className={classes.root} container spacing={2}>
        {myPerfume &&
          myPerfume.map((perfume) => (
            <Grid item xs={12} sm={6} md={3} spacing={3}>
              <PerfumeCard
                key={`${perfume.id}_${perfume.name}`}
                perfume={perfume}
              />
            </Grid>
          ))}
      </Grid>
      <button className="logout_button" onClick={() => kakaoLogout()}>
        로그아웃
      </button>
    </div>
  );
}

export default Mypage;
