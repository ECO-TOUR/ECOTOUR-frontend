import React from 'react';
import './Login.css';
import Ellipse41 from '../../assets/Ellipse 41.svg';


function Login() {
  return (
    <div className="container">
      <div className="login_txt">자연과<br/>함께하는 여행</div>
      <div className="logo">ECO TOUR</div>
      <img src={Ellipse41} alt="Ellipse 41" className='e41'/>
    </div>
  );
}

export default Login;
