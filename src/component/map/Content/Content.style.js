import styled from "styled-components";

// 헤더
export const Header = styled.div`
    display: flex;
    align-items: center;
    margin-top: ${(props) => (props.closeState ? "0px" : "80px")};
    padding: 0px 20px;
`;

// 개수
export const CountNum = styled.div`
    color: #333;
    font-size: 15px;
    font-weight: 700;
    margin-left: 5px;
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
    margin-top: ${(props) => (props.closeState ? "35px" : "250px")};
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
`;

// 정보 박스
export const InfoBox = styled.div`
    padding: 15px 10px 0px 10px;
    margin-left: 10px;
`;

// 관광지 이름
export const Name = styled.div`
    font-size: 17px;
    font-weight: 700;
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
    width: 205px;
    padding: 0px 2px;
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