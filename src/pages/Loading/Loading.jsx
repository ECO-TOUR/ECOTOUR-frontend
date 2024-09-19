import React from 'react';
import styled, { keyframes } from 'styled-components';
import leaf_src from '../../assets/Leaf.svg';

// 로딩페이지 스타일 정의
const LoaderContainer = styled.div`
    height: 100vh;
    background-color: white;
    padding: 100px 0px;
`;

/* 문구*/
export const Loading_txt = styled.div`
    padding: 10px 0px 0px 0px;
    color: #333333;
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    line-height: 1.5;
`;

// 위아래로 움직이는 애니메이션 정의
const floatAnimation = keyframes`
  0% {
    transform: translateY(0);  /* 초기 위치 */
  }
  50% {
    transform: translateY(-10px);  /* 위로 10px 이동 */
  }
  100% {
    transform: translateY(0);  /* 다시 초기 위치로 */
  }
`;

// 나뭇잎 svg
export const Leaf = styled.div`
    display: flex;
    justify-content: center;
    margin-top: -30px;
    animation: ${floatAnimation} 1.5s ease-in-out infinite; /* 애니메이션 적용 */
`;

function LoadingPage({ text }) {
  return (
    <LoaderContainer>
        <Loading_txt>{text}</Loading_txt>
        <Loading_txt>잠시만 기다려 주세요.</Loading_txt>
        <Leaf><img src={leaf_src}/></Leaf>
    </LoaderContainer>
  );
}

export default LoadingPage;
