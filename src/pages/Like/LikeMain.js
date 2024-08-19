import React from 'react'
import styled from 'styled-components'
import Header from '../../component/Main/Header'
import Navbar from '../../component/Main/Navbar'

const LikeArea = styled.div`
    height: 690px;
    background-color: white;
    padding: 0;
`;
const SubTitle = styled.div`
    padding: 10px;
    font-size: medium;
    font-weight: bold;
`;
const LikeMain = () => {
  return (
    <>
    <Header/>
    <LikeArea>
        <SubTitle>
            관광지
        </SubTitle>
    </LikeArea>
    <Navbar/>
    </>
  )
}

export default LikeMain