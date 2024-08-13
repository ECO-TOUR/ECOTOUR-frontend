import styled from 'styled-components';

/* 전체 화면 */
export const Agree_container = styled.div`
    background-color: white;
    height: 100vh;
`;

// 약관을 동의해주세요
export const Agreement_title = styled.div`
    font-weight: 800;
    font-size: 25px;
    padding-top: 20%;
    padding-left: 40px;
    text-align: left;
`;

/* 동의 체크 전체 BOX*/
export const Agree_box = styled.div`
    padding-top: 49px;
`;

/* 동의 체크 개별 BOX*/
export const Agreement_wrap = styled.div`
    display: flex;
    margin-top: 23px;
    padding: 10px 40px;
`;

/* 체크 버튼 */
export const Agree_btn = styled.div`
    background-color: #D9D9D9;
    width: 28px;
    height: 28px;
    border-radius: 20px;
    cursor: pointer;
    margin: 6px;

    &.clicked{
        background-color: #91EB86;
    }
`;

/* 버튼 체크 아이콘*/
export const Agree_check = styled.img`
    display: none;
    width: 16px;
    height: 16px;

    &.clicked{
        display: flex;
        margin: 6px;
    }
`;

/* 약관 동의 텍스트 */
export const Agree_text = styled.div`
    margin: auto 13px;
    font-size: 17px;
    color: #676767;
    font-weight: 600;

    &.clicked{
        color: black;
    }
`;

/* 구분선 */
export const Agree_line = styled.div`
    background-color: #D9D9D9;
    width: 343px;
    height: 1px;
    margin: 20px auto;
`;

// 오른쪽 화살표
export const Agree_arrow = styled.img`
    margin-left: auto;
    margin-right: 10px;
    cursor: pointer;
`;

/* 회원가입 버튼 */
export const SignUp_btn = styled.div`
    position: fixed;
    bottom: 70px;
    left: 50%; /* 화면 중앙에 수평 위치 조정 */
    transform: translateX(-50%); /* 중앙 정렬을 위해 위치 조정 */
    width: 343px;
    height: 50px;
    border-radius: 10px;
    background: #333;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #555; /* 마우스를 올렸을 때 연한 배경색 */
    }
`;

/* 회원가입 버튼 text */
export const SignUp_btn_text = styled.div`
    color: #FFF;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    padding: 16px;
`;