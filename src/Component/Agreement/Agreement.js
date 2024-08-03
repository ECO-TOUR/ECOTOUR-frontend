import React, { useState } from 'react';
import './Agreement.css';
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
  const onClickSignUpBtn = () => {
    if(isAllClicked === true){
      navigate('/key-word');
    }

    else{
      alert('전체 약관 동의를 해주세요');
    }
  }

  return (
    <div className="container">
      <div class="agreement_title">약관을 동의해주세요</div>
      <div class="agree_box">
        <div class="agreement_wrap">
          <div className={`agree_btn ${isAllClicked ? 'clicked' : ''}`} onClick={allCheckBtnClick}>
            <img src={Agreement_Check} className={`agree_check ${isAllClicked ? 'clicked' : ''}`}></img>
          </div>
          <div className={`agree_text ${isAllClicked ? 'clicked' : ''}`}>약관 전체 동의</div>
        </div>
        <div class="agree_line"></div>
        <div>
          <div class="agreement_wrap">
            <div className={`agree_btn ${isClicked1 ? 'clicked' : ''}`} onClick={isCheckBtnClick1}>
              <img src={Agreement_Check} className={`agree_check ${isClicked1 ? 'clicked' : ''}`}></img>
            </div>
            <div className={`agree_text ${isClicked1 ? 'clicked' : ''}`}>이용약관 동의 (필수)</div>
            <img src={Agreement_Arrow} className='agree_arrow'/>
          </div>
          <div class="agreement_wrap">
            <div className={`agree_btn ${isClicked2 ? 'clicked' : ''}`} onClick={isCheckBtnClick2}>
              <img src={Agreement_Check} className={`agree_check ${isClicked2 ? 'clicked' : ''}`}></img>
            </div>
            <div className={`agree_text ${isClicked2 ? 'clicked' : ''}`}>개인정보 수집 및 이용동의 (필수)</div>
            <img src={Agreement_Arrow} className='agree_arrow'/>
          </div>
          <div class="agreement_wrap">
            <div className={`agree_btn ${isClicked3 ? 'clicked' : ''}`} onClick={isCheckBtnClick3}>
              <img src={Agreement_Check} className={`agree_check ${isClicked3 ? 'clicked' : ''}`}></img>
            </div>
            <div className={`agree_text ${isClicked3 ? 'clicked' : ''}`}>만 14세 이상입니다 (필수)</div>
            <img src={Agreement_Arrow} className='agree_arrow'/>
          </div>
        </div>
        <div id="signUp_btn" onClick={onClickSignUpBtn}><div id="signUp_btn_text">회원가입 완료하기</div></div>
      </div>
    </div>
  );
}

export default Agreement;
