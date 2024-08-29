import React, { useState } from 'react';
import * as S from './Agreement.style';
import Agreement_Arrow from '../../assets/agreement_arrow.svg';
import Agreement_Check from '../../assets/agree_check.svg';
import { useNavigate } from 'react-router-dom';

function Agreement() {

  const navigate = useNavigate();

  const [isAllClicked, setIsAllClicked] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  const allCheckBtnClick = () => {

    if(isAllClicked === false){
      setIsAllClicked(!isAllClicked);
      
      if(isClicked1 === false){
        setIsClicked1(!isClicked1);
      }

      if(isClicked2 === false){
        setIsClicked2(!isClicked2);
      }

      if(isClicked3 === false){
        setIsClicked3(!isClicked3);
      }
    }

    else{
      setIsAllClicked(!isAllClicked);
      
      if(isClicked1 === true){
        setIsClicked1(!isClicked1);
      }

      if(isClicked2 === true){
        setIsClicked2(!isClicked2);
      }

      if(isClicked3 === true){
        setIsClicked3(!isClicked3);
      }
    }
  };

  const isCheckBtnClick1 = () => {
    setIsClicked1(!isClicked1);

    if(isClicked2 === true && isClicked3 === true){
      setIsAllClicked(!isAllClicked);
    }
  };

  const isCheckBtnClick2 = () => {
    setIsClicked2(!isClicked2);

    if(isClicked1 === true && isClicked3 === true){
      setIsAllClicked(!isAllClicked);
    }
  };

  const isCheckBtnClick3 = () => {
    setIsClicked3(!isClicked3);

    if(isClicked1 === true && isClicked2 === true){
      setIsAllClicked(!isAllClicked);
    }
  };

  // 회원가입 버튼 클릭 시
  const REST_API_KEY = '1c0e13d2c1d6cf63767d0a06515d1d6e';
  const REDIRECT_URI = 'https://localhost:3000/auth';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const onClickSignUpBtn = () => {
    // 다 동의했을 경우
    if(isAllClicked === true){
      window.location.href = link;
    }
    // 다 동의하지 않았을 경우
    else{
      alert('전체 약관 동의를 해주세요');
    }
  }

  return (
    <S.Agree_container>
      <S.Agreement_title>약관을 동의해주세요</S.Agreement_title>
      <S.Agree_box>
        <S.Agreement_wrap>
          <S.Agree_btn className={`${isAllClicked ? 'clicked' : ''}`} onClick={allCheckBtnClick}>
            <S.Agree_check src={Agreement_Check} className={`${isAllClicked ? 'clicked' : ''}`}></S.Agree_check>
          </S.Agree_btn>
          <S.Agree_text className={`agree_text ${isAllClicked ? 'clicked' : ''}`}>약관 전체 동의</S.Agree_text>
        </S.Agreement_wrap>

        <S.Agree_line/>
        <div>
          <S.Agreement_wrap>
            <S.Agree_btn className={`${isClicked1 ? 'clicked' : ''}`} onClick={isCheckBtnClick1}>
              <S.Agree_check src={Agreement_Check} className={`${isClicked1 ? 'clicked' : ''}`}></S.Agree_check>
            </S.Agree_btn>
            <S.Agree_text className={`${isClicked1 ? 'clicked' : ''}`}>이용약관 동의 (필수)</S.Agree_text>
            <S.Agree_arrow src={Agreement_Arrow} className='agree_arrow'/>
          </S.Agreement_wrap>

          <S.Agreement_wrap>
            <S.Agree_btn className={`${isClicked2 ? 'clicked' : ''}`} onClick={isCheckBtnClick2}>
              <S.Agree_check src={Agreement_Check} className={`${isClicked2 ? 'clicked' : ''}`}></S.Agree_check>
            </S.Agree_btn>
            <S.Agree_text className={`${isClicked2 ? 'clicked' : ''}`}>개인정보 수집 및 이용동의 (필수)</S.Agree_text>
            <S.Agree_arrow src={Agreement_Arrow}/>
          </S.Agreement_wrap>

          <S.Agreement_wrap>
            <S.Agree_btn className={`${isClicked3 ? 'clicked' : ''}`} onClick={isCheckBtnClick3}>
              <S.Agree_check src={Agreement_Check} className={`${isClicked3 ? 'clicked' : ''}`}></S.Agree_check>
            </S.Agree_btn>
            <S.Agree_text className={`${isClicked3 ? 'clicked' : ''}`}>만 14세 이상입니다 (필수)</S.Agree_text>
            <S.Agree_arrow src={Agreement_Arrow}/>
          </S.Agreement_wrap>
        </div>

        <S.SignUp_btn onClick={onClickSignUpBtn}>
          <S.SignUp_btn_text>회원가입 완료하기</S.SignUp_btn_text>
        </S.SignUp_btn>
      </S.Agree_box>
    </S.Agree_container>
  );
}

export default Agreement;
