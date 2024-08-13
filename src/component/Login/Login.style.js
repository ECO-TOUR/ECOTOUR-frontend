import styled from 'styled-components';

/* 전체 화면 */
export const Container = styled.div`
    text-align: center;
    background-color: white;
    height: 100vh;
`;

/* 로고 위 문구(자연과 함께하는 여행) */
export const Login_txt = styled.div`
    padding: 87px 0px 0px 33px;
    color: #333333;
    font-weight: 800;
    font-size: 28px;
    text-align: left;
`;

//로고(ECO TOUR)
export const Logo = styled.div`
    padding: 3px 0px 0px 33px;
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
    position: relative;
    width: 335px;
    z-index: 1;
    margin: 370px auto 0px auto;
    cursor: pointer;
`;
