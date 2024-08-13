import styled from 'styled-components';

export const Login_container = styled.div`
    height: 100vh;
    background-color: white;
`;

/* 로고 위 문구(자연과 함께하는 여행) */
export const Login_txt = styled.div`
    padding: 130px 0px 0px 40px;
    color: #333333;
    font-weight: 800;
    font-size: 28px;
    text-align: left;
    line-height: 1.5;
`;

//로고(ECO TOUR)
export const Logo = styled.div`
    padding: 5px 0px 0px 40px;
    text-align: left;
    font-weight: 800;
    color: #91EB86;
    font-size: 50px;

`;

export const E41 = styled.img`
    position: absolute;
    bottom: 0;
    z-index: 0;
    right: 0;
`;

export const E42 = styled.img`
    position: absolute;
    bottom: 0;
    z-index: 0;
    left: 0;
`;

export const Login_btn = styled.img`
    position: fixed;
    bottom: 60px;
    width: 335px;
    z-index: 1;
    cursor: pointer;
    left: 50%; /* 화면 중앙에 수평 위치 조정 */
    transform: translateX(-50%); /* 중앙 정렬을 위해 위치 조정 */
`;
