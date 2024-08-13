import React from 'react';
import * as S from './Login.style';
import Ellipse41 from '../../assets/Ellipse 41.svg';
import Ellipse42 from '../../assets/Ellipse 42.svg';
import KakaoLoginBtn from '../../assets/kakao_login_medium_wide.svg';
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate();

    const onclickLoginBtn = () => {
      //window.location.href = kakaoURL;
      navigate('/agreement');
    };

  return (
    <S.Container>
      <S.Login_txt>자연과<br/>함께하는 여행</S.Login_txt>
      <S.Logo>ECO TOUR</S.Logo>
      <S.Login_btn src={KakaoLoginBtn} onClick={onclickLoginBtn}/>
      {/* <S.E41 src={Ellipse41}/>
      <S.E42 src={Ellipse42}/> */}
    </S.Container>
  );
}

export default Login;
