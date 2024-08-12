import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

function Home() {
  return (
    <>
    <Header></Header>
    <div className="container">
      Main페이지
      <br/>
      <Link to="/mypage">Go To Mypage</Link>
    </div>
    <Navbar></Navbar>
    </>
  );
}

export default Home;
