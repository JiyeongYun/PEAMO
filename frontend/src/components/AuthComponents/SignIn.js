import './SignIn.css';
import CloseIcon from '@mui/icons-material/Close';

function SignIn({ toggleSignin }) {
<<<<<<< HEAD
  // const REST_API_KEY = "112b52a3500fcf54baac18976074af45";
  // const REDIRECT_URI = "http://localhost:8080/callback/kakao";
  // const callKakaoLoginHandler = async () => {
  //   const response = await axios.get(
  //     `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  //   );
  //   console.log(response);
  //   return response;
  // };
  const { Kakao } = window;
  // 카카오 서버에서 제공하는 인증 토큰을 요청하는 방법
  const kakaoLogin = () => {
    if (!Kakao.Auth.getAccessToken()) {
      Kakao.Auth.login({
        success: (response) => {
          const kakaoAccessToken = response.access_token;
          axios
            .get("http://localhost:8080/user/oauth2/authorization/kakao", {
              headers: {
                Authorization: kakaoAccessToken,
              },
            })
            .then((res) => {
              console.log(res);
            });
          return kakaoAccessToken;
        },
        fail: function (err) {
          console.log(err);
        },
      });
    }
  };
=======
  const REST_API_KEY = '112b52a3500fcf54baac18976074af45';
  const REDIRECT_URI = 'http://localhost:3000/callback/kakao';
  const LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
>>>>>>> 2ebb8cbbf1975ad705205b0b23eb6f2d27e58875

  const kakaoLogin = () => {
    window.location.href = LOGIN_URL;
  };

<<<<<<< HEAD
  //
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init("e6b1ad5e639cb9eab47e6eba02f71c60"); //112b52a3500fcf54baac18976074af45
    }
  });

=======
>>>>>>> 2ebb8cbbf1975ad705205b0b23eb6f2d27e58875
  return (
    <div className="signin_container">
      <div className="signin_box">
        <div className="icon">
          <div onClick={toggleSignin}>
            <CloseIcon />
          </div>
        </div>
        <h3>PE' AMO</h3>
        <h4>
          당신의 취<span>향</span>을 찾아드립니다.
        </h4>
        <img
          src="/images/kakao_login_medium_narrow.png"
          alt="kakao_login.png"
          onClick={() => kakaoLogin()}
        />
      </div>
    </div>
  );
}

export default SignIn;
