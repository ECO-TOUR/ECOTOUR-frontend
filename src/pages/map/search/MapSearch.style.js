import styled from "styled-components";

export const Search_main_container = styled.div`
    background-color: white;
    height: 100%;
    padding-bottom: 100px;
`;

/* 헤더 */
export const Header_container = styled.div`
    width: 358px;
    border-bottom: 1px solid #E7DDD9;
    padding: 20px 0px;
    font-weight: 800;
    text-align: center;
    color: #333;
    font-size: 17px;
    margin: 0px auto;
`;

// 뒤로가기 버튼
export const BackBtn = styled.div`
    position: absolute;
    color: #D9D9D9;
    cursor: pointer;
`;

/* 검색 컴포넌트 */
export const Search_container = styled.input`
    width: 320px;
    border-radius: 10px;
    background: #F5F5F5;
    color: #676767;
    font-size: 13px;
    padding: 14px 20px 15px 20px;
    display: flex;
    align-items: center;
    margin: 20px auto;
    border: none;
    font-weight: 600;
`;

// 최근 검색어 컴포넌트
export const Recent_container = styled.div`
    margin-top: 36px;
`;

// 최근 검색어 헤더
export const Recent_header = styled.div`
    display: flex;
    padding: 0px 30px;
    align-items: center;
    margin-bottom: 30px;
`;

// 최근 검색어 제목
export const Recent_title = styled.div`
    font-size: 18px;
    font-weight: 800;
`;

// 전체 삭제 버튼
export const Delete_btn = styled.div`
    color: #676767;
    font-size: 12px;
    margin: 0px 0px 0px auto;
    cursor: pointer;
`;

export const Navbar = styled.div`
  flex-shrink: 0;  /* 고정 */
  position: sticky;
  bottom: 0;
`;