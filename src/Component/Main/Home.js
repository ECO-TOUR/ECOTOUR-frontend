import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

function Home() {
  return (
    <>
    <Header name="ECO TOUR" color="#91EB86"></Header>
    <div className="container">
      Main페이지
      <br/>
    </div>
    <Navbar></Navbar>
    </>
  );
}

export default Home;
