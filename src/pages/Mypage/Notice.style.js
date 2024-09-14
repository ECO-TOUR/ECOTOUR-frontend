import styled from 'styled-components';

export const MainContainer = styled.div`
    background-color: white;
    padding: 10px 0px;
    height: 100vh;
`;

/* 헤더 */
export const Header_container = styled.div`
    border-bottom: 1px solid #E7DDD9;
    padding: 20px 0px;
    font-weight: 800;
    text-align: center;
    color: #333;
    font-size: 19px;
    margin: 0px auto;
    background-color: white;
`;

// 뒤로가기 버튼
export const BackBtn = styled.div`
    position: absolute;
    color: #D9D9D9;
    cursor: pointer;
    top: 20px;
    left: 20px;
`;

export const NoticeBox = styled.div`
    border-bottom: 1px solid #D9D9D9;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 22px 30px;
    cursor: pointer;

    &:hover{
        background-color: #F5F5F5;
    }
`;

export const NoticeTitle = styled.div`
    font-weight: 500;
    font-size: 15px;
`;

export const NoticeDate = styled.div`
    margin: auto 0px auto auto;
    color: #676767;
    font-size: 12px;
`;