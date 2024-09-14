import styled from 'styled-components';

export const Component = styled.div`
    padding: 28px 15px;
    display: flex;
    overflow-x: auto; /* 좌우 스크롤 가능하게 설정 */
`;

// content 박스
export const ContentBox = styled.div`
    border-radius: 10px;
    border: 1px solid #D9D9D9;
    width: 174px;
    height: 164px;
    flex-shrink: 0;
    margin: 0 5px;
    cursor: pointer;
`;

// content 이미지
export const ContentImage = styled.img`
    border-radius: 9px 9px 0px 0px;
    width: 172.5px;
    height: 100px;
`;

// 관광지 이름
export const ContentName = styled.div`
    font-weight: 600;
    font-size: 15px;
    padding: 7px 9px 4px 9px;
    white-space: nowrap;         /* 줄바꿈을 방지합니다 */
    overflow: hidden;            /* 넘치는 내용 숨기기 */
    text-overflow: ellipsis;     /* 넘치는 내용을 '...'으로 표시 */
    max-width: 15ch;             /* 최대 너비를 10자의 폭으로 제한합니다 */
`;

// 관광지 지역
export const ContentRegion = styled.div`
    color: #676767;
    font-size: 12px;
    font-weight: 400;
    padding: 0px 9px;
`;

// 평점 컨테이너
export const ScoreContainer = styled.div`
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    gap: 5px;
    margin-left: 108px;
`;

export const ScoreIcon = styled.div`
    width: 7px;
    height: 7px;
    background-color: #91EB86;
    border-radius: 30px;
`;

export const ScoreText = styled.div`
    color: #676767;
    font-size: 11px;
`;