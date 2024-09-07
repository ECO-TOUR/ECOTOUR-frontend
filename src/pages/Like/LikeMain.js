import React from 'react'
import styled from 'styled-components'
import Header from '../../component/main/Header'
import Navbar from '../../component/main/Navbar'
import Content from '../../component/like/Content/Content'

const LikeContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 70px;
  margin: 0;
  height: 100vh;
  width: 100%;
  background-color: white;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  max-width: 430px;
  min-width: 320px;
`;

const LikeMain = () => {
  return (
    <>
    <Header pageName="찜목록"/>
    <LikeContainer id="like-container">
      <Content></Content>
    </LikeContainer>
    <Navbar/>
    </>
  )
}

export default LikeMain