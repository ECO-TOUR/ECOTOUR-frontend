import styled from 'styled-components';

export const Component = styled.div`
    padding-top: 28px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

// content 박스
export const ContentBox = styled.div`
    margin: 0px 6px 20px 6px;
    cursor: pointer;
    position: relative;
    transition: filter 0.3s ease; /* 부드러운 전환을 위한 속성 */
    &:hover{
        filter: brightness(0.9); /* 마우스 오버 시 더 어둡게 */
    }
`;

// content 이미지
export const ContentImage = styled.img`
    border-radius: 10px;
    width: 180px;
    height: 210px;
    filter: brightness(0.7);
`;

export const ContentDiv = styled.div`
    position: absolute; /* 이미지 위에 제목 위치 */
    bottom: 30%; /* 이미지의 하단에 제목을 위치시킴 */
    left: 0;
    right: 0;
`;

// 제목
export const ContentTitle = styled.div`
    font-weight: 200;
    font-size: 14px;
    padding: 0px 12px;
    color: white;
    display: -webkit-box; /* Flexbox와 유사한 CSS box layout */
    -webkit-line-clamp: 2; /* 표시할 최대 줄 수 */
    -webkit-box-orient: vertical; /* 상자 방향을 수직으로 설정 */
    overflow: hidden; /* 넘치는 텍스트를 숨김 */
    text-overflow: ellipsis; /* 넘치는 텍스트에 '...' 추가 */
    line-height: 1.2; /* 줄 간격 설정 */
`;

export const ContentInfo = styled.div`
    display: flex;
    width: 60px;
    margin-top: 10px;
    margin-left: 14px;
`;

export const InfoText = styled.div`
    display: flex;
    color: white;
    font-size: 12px;
    font-weight: 200;
    margin: 0px 10px 0px 5px;
`;