import styled from 'styled-components';

export const Login_container = styled.div`
    height: 100vh;
    background-color: white;
    overflow: hidden;
`;

/* 로고 위 문구(자연과 함께하는 여행) */
export const Login_txt = styled.div`
    padding: 75px 0px 0px 37px;
    color: #333333;
    font-weight: 700;
    font-size: 28px;
    text-align: left;
    line-height: 1.5;
    position: relative;
    z-index: 1;
`;

//로고(ECO TOUR)
export const Logo = styled.div`
    padding: 10px 0px 0px 37px;
    text-align: left;
    font-weight: 900;
    background: linear-gradient(91deg, #A0F096 20.45%, #84D47A 44.85%, #B0FFA7 65.22%, #91EB86 82.2%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 50px;
    position: relative;
    z-index: 1;
`;

export const Service_text = styled.div`
    padding-top: 10px;
    padding-left: 37px;
    color: #676767;
    font-size: 15px;
    line-height: 1.5;
    font-weight: 300;
    position: relative;
    z-index: 1;
`;

export const MockUp = styled.div`
    display: flex;
    justify-content: right;
    top: 15%;
    position: fixed;
    z-index: 0;
    width: 100%;
`;

export const Login_btn = styled.img`
    position: fixed;
    bottom: 60px;
    width: 370px;
    cursor: pointer;
    left: 50%; /* 화면 중앙에 수평 위치 조정 */
    transform: translateX(-50%); /* 중앙 정렬을 위해 위치 조정 */
`;
