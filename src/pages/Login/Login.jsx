import React from 'react';
import * as S from './Login.style';
import Leaf from '../../assets/Leaf.svg';
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
      <S.Login_txt>자연으로<br/>떠나는 여행</S.Login_txt>
      <S.Logo>ECO TOUR</S.Logo>
      <S.Leaf><img src={Leaf}/></S.Leaf>
      <S.Login_btn src={KakaoLoginBtn} onClick={onclickLoginBtn}/>
    </S.Login_container>
  );
}

export default Login;
