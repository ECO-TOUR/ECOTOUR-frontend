import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const ContentBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 8px 0px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* 부드러운 색상 전환을 위한 트랜지션 추가 */
    border-radius: 10px;

    &:hover {
        background-color: rgba(128, 128, 128, 0.1);
    }
`;

// 관광지 사진
export const ContentImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-left: 10px;
`;

// 순위
export const ContentNum = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 2px solid #91EB86;
    color: #91EB86;
    font-weight: 700;
    font-size: 17px;
    margin-left: 20px;
    padding: 5px 0px;
`;

// 이름, 지역 컨테이너
export const ContentInfo = styled.div`
    margin-left: 25px;
`;

export const ContentName = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

export const ContentRegion = styled.div`
    font-size: 11px;
    font-weight: 400;
    color: #676767;
    margin-top: 5px;
`;

// 오른쪽 화살표
export const Arrow = styled.img`
    margin-left: auto;
    margin-right: 15px;
    cursor: pointer;
`;
