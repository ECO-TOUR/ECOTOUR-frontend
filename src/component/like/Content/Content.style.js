import styled from "styled-components";

// 헤더
export const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 20px;
`;

export const SubHeader = styled.div`
    display: flex;
    padding: 22px 20px 19px 14px;
    align-items: center;
    position: fixed;  /* 화면에 고정 */
    top: 7%;           /* 상단에 고정 */
    left: 50%;         /* 왼쪽부터 50% 위치 */
    transform: translateX(-50%); /* 정확히 중앙으로 이동 */
    width: 100%;      /* 너비를 전체로 설정 */
    background-color: white;  /* 배경색을 지정하여 겹치는 요소와 구분 */
    z-index: 100;     /* 다른 요소 위에 나타나도록 설정 */
    border-bottom: 1px solid #D9D9D9;
`;

// 개수
export const CountNum = styled.div`
    color: #333;
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
`;

// 버튼 컴포넌트
export const StateBtnComponent = styled.div`
    margin-left: auto;
    margin-right: 0px;
    display: flex;
`;

// 별점순 버튼
export const StateBtn1 = styled.div`
    border-radius: 15px;
    background: ${(props) => (props.btnState1 ? "#91EB86;" : "#333")};
    color: ${(props) => (props.btnState1 ? "#333" : "white")};
    font-size: 12px;
    padding: 7px 12px;
    margin: 0px 4px;
    cursor: pointer;
    font-weight: 500;
`;

// 조회순 버튼
export const StateBtn2 = styled.div`
    border-radius: 15px;
    background: ${(props) => (props.btnState2 ? "#91EB86;" : "#333")};
    color: ${(props) => (props.btnState2 ? "#333" : "white")};
    font-size: 12px;
    padding: 7px 12px;
    margin: 0px 4px;
    cursor: pointer;
    font-weight: 500;
`;

// 리스트가 없을 때
export const None = styled.div`
    text-align: center;
    margin-top: 65%;
    font-size: 18px;
    font-weight: 600;
`;

// 리스트가 있을 때 리스트 컴포넌트
export const ContentComponent = styled.div`
    padding: 20px 20px 50px 20px;
    overflow-y: auto;
    margin-top: 15px;
    border-top: 1px solid #D9D9D9;
    max-height: ${(props) => (props.closeState ? "" : "100%")};
`;

// content 박스
export const ContentBox = styled.div`
    border-radius: 15px;
    border: 1px solid #D9D9D9;
    margin-bottom: 18px;
    padding: 10px;
    display: flex;
    cursor: pointer;
`;

// 사진
export const Img = styled.img`
    border-radius: 10px;
    width: 140px;
    height: 98px;
    object-fit: cover; /* 이미지 비율을 유지하면서 크기를 맞춤 */
    min-width: 140px; /* 최소 너비를 140px로 고정 */
    min-height: 98px; /* 최소 높이를 98px로 고정 */
`;

// 정보 박스
export const InfoBox = styled.div`
    padding: 15px 5px 0px 10px;
    margin-left: 10px;
    width: 100%;
`;

// 관광지 이름
export const Name = styled.div`
    font-size: 17px;
    font-weight: 700;
    white-space: nowrap;         /* 줄바꿈을 방지합니다 */
    overflow: hidden;            /* 넘치는 내용 숨기기 */
    text-overflow: ellipsis;     /* 넘치는 내용을 '...'으로 표시 */
    max-width: 15ch;             /* 최대 너비를 10자의 폭으로 제한합니다 */
`;

// 지역
export const Region = styled.div`
    color: #676767;
    font-size: 13px;
    font-weight: 400;
    margin-top: 5px;
`;

export const ContentWrap = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 0px 2px;
    width: 100%; // 부모 요소의 너비를 기준으로 100%
`;

export const ScoreBox = styled.div`
    color:  #676767;
    display: flex;
    align-items: center;
    font-size: 12px;
`;

export const ScoreIcon = styled.div`
    width: 7px;
    height: 7px;
    background-color: #91EB86;
    border-radius: 20px;
    margin-right: 5px;
`;

// 좋아요 버튼(이미지)
export const LikeBtn = styled.div`
    cursor: pointer;
    margin-left: auto;
    margin-right: 0px;
    display: flex;
    align-items: center;
`;
