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
    font-size: 19px;
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
    width: 358px;
    border-radius: 10px;
    background: #F5F5F5;
    color: #676767;
    font-size: 13px;
    font-weight: 500;
    padding: 12px 20px 13px 20px;
    display: flex;
    align-items: center;
    margin: 20px auto;
    position: relative;
    z-index: 0;
    cursor: pointer;
    border: none;
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

// 검색어 자동완성 박스
export const SearchWordBox = styled.div`
    position: absolute;
    width: 380px;
    z-index: 1;
    background-color: white;
    left: 50%;
    transform: translateX(-50%); /* 가로 중앙 정렬 */
    border-radius: 10px;
    margin-top: -10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 (선택 사항) */
`;

// 검색어 자동완성 div
export const SearchWordItem = styled.div`
    padding: 17px 20px;
    font-size: 13px;
    cursor: pointer;
    border-radius: 10px;
    display: flex;

    &:hover{
        background-color: #F5F5F5;
    }
`;

export const SearchText = styled.div`
    margin-left: 10px;
`;