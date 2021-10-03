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
import { getMyPerfume } from '../components/MypageComponents/myPageSlice';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    top: '10%',
    flexGrow: 1,
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
      <Grid className={classes.root} container spacing={2}>
        <Grid item xs={4}>
          <PerfumeCard />
        </Grid>
        <Grid item xs={4}>
          <PerfumeCard />
        </Grid>
        <Grid item xs={4}>
          <PerfumeCard />
        </Grid>
      </Grid>
      <button className="logout_button" onClick={() => kakaoLogout()}>
        logoutwdwd
      </button>
    </div>
  );
}

export default Mypage;
