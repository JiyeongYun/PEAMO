import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// css
import './MyPage.css';
import { makeStyles } from '@material-ui/core/styles';
// components
import PerfumeCard from '../components/MyPageComponents/PerfumeCard';
import Grid from '@material-ui/core/Grid';
import PerfumeDetail from '../components/SearchComponents/PerfumeDetail';
// redux reducer
import { getMyPerfume } from '../components/MyPageComponents/myPageSlice';

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
  const [showPerfumeDetail, setShowPerfumeDetail] = useState(false);

  const togglePerfumeDetail = () => {
    setShowPerfumeDetail(!showPerfumeDetail);
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
            <Grid item xs={12} sm={6} md={3}>
              <PerfumeCard
                key={`${perfume.id}_${perfume.name}`}
                perfume={perfume}
                togglePerfumeDetail={togglePerfumeDetail}
              />
            </Grid>
          ))}
      </Grid>
      <button className="logout_button">logout</button>
    </div>
  );
}

export default Mypage;
