import React from 'react'
import './Intro.css';
import Ellipse41 from '../../assets/Ellipse 41.svg';
import Ellipse43 from '../../assets/Ellipse 43.svg';
import Ellipse44 from '../../assets/Ellipse 44.svg';
import { useNavigate } from 'react-router-dom';

function Intro() {

    // 다음 버튼 클릭 시
    const navigate = useNavigate();

    const onClickStartBtn = () => {
        navigate("/main");
    }
    
  return (
    <div id="intro_container">
        <img src={Ellipse43} alt="Ellipse 43" className='e43'/>
        <img src={Ellipse44} alt="Ellipse 44" className='e44'/>
        <img src={Ellipse41} alt="Ellipse 41" className='e41'/>
        <div class="intro_text">
            ECO TOUR에 오신 것을 환영해요!<br/>
            지금 바로 여러분만의<br/>
            맞춤형 생태관광 여행을 계획해보세요!
        </div>
        <div id="start_btn" onClick={onClickStartBtn}>시작하기</div>
    </div>
  )
}

export default Intro