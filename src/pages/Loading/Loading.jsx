import React from 'react';
import styled, { keyframes } from 'styled-components';

// 이모지 애니메이션 정의
const emojiAnimation = keyframes`
    0% { opacity: 0; transform: scale(0.5); }
    20% { opacity: 1; transform: scale(1); }
    80% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.5); }
`;

// 이모지 스타일 정의
const Emoji = styled.div`
    font-size: 2rem;
    position: absolute;
    animation: ${emojiAnimation} 5s ease-in-out infinite;
    opacity: 0;
    
    // 애니메이션 지연을 통해 이모지가 순서대로 등장하도록 설정
    &:nth-child(1) {
        animation-delay: 0s;
    }
    &:nth-child(2) {
        animation-delay: 1s;
    }
    &:nth-child(3) {
        animation-delay: 2s;
    }
    &:nth-child(4) {
        animation-delay: 3s;
    }
    &:nth-child(5) {
        animation-delay: 4s;
    }
`;

// 로딩페이지 스타일 정의
const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: white;
    position: relative;
`;

function LoadingPage() {
  return (
    <LoaderContainer>

    </LoaderContainer>
  );
}

export default LoadingPage;
