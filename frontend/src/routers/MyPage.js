import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// css
import './MyPage.css';
import { makeStyles } from '@material-ui/core/styles';
// components
import { logout } from '../components/AuthComponents/authSlice';
import PerfumeCard from '../components/MypageComponents/PerfumeCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function Mypage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const kakaoLogout = () => {
    dispatch(logout());
  };

  // header 검은색으로 변경
  useEffect(() => {
    const header = document.querySelector('header');
    header.style.backgroundColor = '#1C1C1C';
  }, []);
  // header 검은색으로 변경

  return (
    <div className="mypage">
      <button className="logout_button" onClick={() => kakaoLogout()}>
        logout
      </button>
      <Grid className={classes.root} container spacing={2}>
        <Grid item xs={3}>
          <PerfumeCard />
        </Grid>
        <Grid item xs={3}>
          <PerfumeCard />
        </Grid>
        <Grid item xs={3}>
          <PerfumeCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default Mypage;
