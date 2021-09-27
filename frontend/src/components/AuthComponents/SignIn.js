import "./SignIn.css";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import axios from "axios";

function SignIn({ toggleSignin }) {
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
            .get("/oauth2/authorization/kakao", {
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

  // 카카오 로그아웃
  const kakaoLogout = () => {
    if (Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout();
      console.log("로그아웃");
    }
  };

  //
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init("e6b1ad5e639cb9eab47e6eba02f71c60");
    }
  });

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
          onClick={() => kakaoLogin()}
        />
        <button onClick={() => kakaoLogout()}>로그아웃</button>
      </div>
    </div>
  );
}

export default SignIn;
