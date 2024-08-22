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

// 정렬 버튼(별점순, 조회순)
export const StateBtn = styled.div`
    border-radius: 15px;
    background: #333;
    color: white;
    font-size: 12px;
    padding: 7px 12px;
    margin: 0px 4px;
    cursor: pointer;
`;

// 리스트가 없을 때
export const None = styled.div`
    text-align: center;
    margin-top: ${(props) => (props.closeState ? "35px" : "250px")};
    font-size: 18px;
    font-weight: 600;
`;