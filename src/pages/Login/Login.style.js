import styled, { keyframes } from 'styled-components';

export const Login_container = styled.div`
    height: 100vh;
    background: linear-gradient(180deg, #FFF 8%, #ECFFE9 53%, #91EB86 100%);
`;

/* 로고 위 문구(자연과 함께하는 여행) */
export const Login_txt = styled.div`
    padding: 75px 0px 0px 0px;
    color: #333333;
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    line-height: 1.5;
`;

//로고(ECO TOUR)
export const Logo = styled.div`
    padding: 20px 0px 0px 0px;
    text-align: center;
    font-weight: 900;
    background: linear-gradient(91deg, #A0F096 20.45%, #84D47A 44.85%, #B0FFA7 65.22%, #91EB86 82.2%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 50px;

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

export const Leaf = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
    animation: ${floatAnimation} 1.5s ease-in-out infinite; /* 애니메이션 적용 */
`;

export const Login_btn = styled.img`
    position: fixed;
    bottom: 60px;
    width: 370px;
    cursor: pointer;
    left: 50%; /* 화면 중앙에 수평 위치 조정 */
    transform: translateX(-50%); /* 중앙 정렬을 위해 위치 조정 */
`;
