import styled from "styled-components";

// 최근 검색어 div
export const Search_div = styled.div`
    border-bottom: 1px solid #D9D9D9;
    display: flex;
    align-items: center;
    padding: 5px 5px 15px 5px;
    margin: 10px 25px;
    cursor: pointer;
`;

// 검색어 text
export const Word_text = styled.div`
    margin-left: 10px;
    color: #333;
    font-size: 15px;
`;

// 검색어 삭제 btn
export const Word_del = styled.div`
    color: #676767;
    font-size: 13px;
    margin: 0px 10px 0px auto;
`;

// 실시간 검색어 index
export const Word_index = styled.div`
    color: #91EB86;
    font-weight: 800;
    font-size: 15px;
    width: 20px;
    margin: 0px 3px 0px 5px;
`;