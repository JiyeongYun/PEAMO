import "./SignIn.css";
import CloseIcon from "@mui/icons-material/Close";

function SignIn({ toggleSignin }) {
  return (
    <div className='signin_container'>
      <div className='signin_box'>
        <div className='icon'>
          <div onClick={toggleSignin}>
            <CloseIcon />
          </div>
        </div>
        <h3>PE' AMO</h3>
        <h4>
          당신의 취<span>향</span>을 찾아드립니다.
        </h4>
        <img
          src='/images/kakao_login_medium_narrow.png'
          alt='kakao_login.png'
        />
      </div>
    </div>
  );
}

export default SignIn;
