import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setIsError } from '../components/Common/commonSlice';
import './Error.css';

function Error() {
  const history = useHistory();
  const dispatch = useDispatch();
  const goHome = () => {
    dispatch(setIsError(false));
    history.push('/');
  };
  useEffect(() => {
    dispatch(setIsError(true));
  }, [dispatch]);
  return (
    <div className="error_container">
      <div className="error_content">
        <img src={'/images/logo_black.png'} alt="logo" className="error_logo" />
        <div>에러가 발생하였습니다</div>
        <div className="button_container">
          <div className="button">
            <p onClick={() => goHome()}>메인화면으로 가기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
