import React from 'react';
import * as S from './Login.style';
import Ellipse41 from '../../assets/Ellipse 41.svg';
import Ellipse42 from '../../assets/Ellipse 42.svg';
import KakaoLoginBtn from '../../assets/kakao_login_medium_wide.svg';

function Login() {

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onclickLoginBtn = () => {
    window.location.href = link;
  };

  return (
    <S.Login_container>
      <S.Login_txt>자연과<br/>함께하는 여행</S.Login_txt>
      <S.Logo>ECO TOUR</S.Logo>
      <S.Login_btn src={KakaoLoginBtn} onClick={onclickLoginBtn}/>
      <S.E41 src={Ellipse41}/>
      <S.E42 src={Ellipse42}/>
    </S.Login_container>
  );
}

export default Login;
