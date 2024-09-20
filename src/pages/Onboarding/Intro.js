import React from 'react'
import './Intro.css';
import MockUpImage from '../../assets/MockUpImage.png';
import { useNavigate } from 'react-router-dom';

function Intro() {

    // 다음 버튼 클릭 시
    const navigate = useNavigate();

    const onClickStartBtn = () => {
        navigate("/main");
    }
    
  return (
    <div id="intro_container">
        <div class="intro_text">
            <text style={{ color: "#91EB86", fontWeight: "700" }}>ECO TOUR</text> 에 오신 것을 환영해요!<br/>
            지금 바로 여러분만의<br/>
            맞춤형 생태관광 여행을 계획해보세요!
        </div>
        <div class="mockup"><img src={MockUpImage}/></div>
        <div id="start_btn" onClick={onClickStartBtn}>시작하기</div>
    </div>
  )
}

export default Intro