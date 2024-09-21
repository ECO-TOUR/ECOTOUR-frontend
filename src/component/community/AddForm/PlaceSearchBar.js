import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'

const SearchBarArea = styled.div`
  display: flex;
  align-items: center;
`

// 검색 input box
const StyledSearchBar = styled.input`
    width: 100%;
    min-width: calc(var(--mim-width) - 32px);
    height: 40px;
    align-self: center;
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    padding-left: 17px;
    padding-right: 15px;
    color: #333333;
    font-weight: 500;
    font-size: 13px;
    box-sizing: border-box;
`;

// 검색 버튼
const SearchButton = styled.div`
  position: relative;
  right: 35px;
  height: 20px;
  width: 0px;
  cursor: pointer;
  svg{
    width: 22px;
    height: 22px;
  }
  &:hover {
    transform: scale(1.05); /* 호버 시 살짝 확대 */
  }
  &:active {
    transform: scale(0.95); /* 클릭 시 살짝 축소 */
  }
`;

// 자동 완성 박스
const AutocompleteList = styled.div`
  position: absolute;  /* 위치를 절대값으로 설정 */
  left: 50%;  /* 부모의 가로 너비 기준으로 50% 이동 */
  transform: translateX(-50%);  /* 자신의 너비 기준으로 가운데로 이동 */
  width: 348px;
  max-height: 300px;  /* 높이를 고정 */
  overflow-y: auto;  /* 내용이 넘칠 경우 세로 스크롤 사용 */
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  margin-top: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 (선택 사항) */
`;

// 자동완성 content
const AutocompleteItem = styled.div`
  cursor: pointer;
  border-radius: 10px;
  padding: 17px 20px;
  font-size: 13px;
  &:hover {
    background-color: #F5F5F5;
  }
`;

// 닫기 버튼
const CloseButton = styled.button`
  position: sticky; /* 스크롤 시에도 고정 */
  bottom: 0; /* 하단에 고정 */
  background: white;
  border: none;
  width: 100%;  /* 닫기 버튼을 전체 너비로 확장 */
  padding: 12px 20px;
  font-size: 14px;
  text-align: right;
  font-size: 12px;
  cursor: pointer;
  color: #676767;
  border-top: 1px solid #f5f5f5;
`;

const PlaceSearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]); // 자동완성 저장 배열

  // 엔터 클릭 시
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
      setSearchResults([]);
    }
  };

  // 돋보기 icon 클릭 시
  const handleButtonClick = () => {
    onSearch(searchValue);
  };

  // 자동 완성 함수
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value) {
      // 입력된 값이 있을 때만 자동 완성 API 호출
      axios
        .get(`/autocomplete/?query=${e.target.value}`)
        .then((response) => {
          setSearchResults(response.data.autocompleteResults || []);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSearchResults([]); // 입력값이 없으면 리스트 초기화
    }
  };

  // 자동 완성 단어 클릭 시
  const handleAutocompleteClick = (result) => {
    setSearchValue(result); // 클릭한 값을 입력란에 설정
    setSearchResults([]); // 자동완성 목록 닫기
    onSearch(result); // 선택한 값으로 검색 실행
  };

  // 자동 완성 닫기 버튼 클릭 시
  const handleCloseAutocomplete = () => {
    setSearchResults([]);
  };

  // input 클릭 시 값 초기화
  const handleInputFocus = () => {
    setSearchValue('');
    setSearchResults([]);
  };

  return (
    <>
      <SearchBarArea>
        <StyledSearchBar 
          type="text" 
          placeholder="검색"         
          value={searchValue} // 입력된 값을 보여주기 위해 value 바인딩
          onFocus={handleInputFocus} // 포커스 시 값 초기화
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}>
        </StyledSearchBar>
        <SearchButton onClick={handleButtonClick}>
          <SearchIcon />
        </SearchButton>
      </SearchBarArea>

      {/* 자동 검색어 */}
      {searchResults.length > 0 && (
        <AutocompleteList>
          {searchResults.map((result, index) => (
            <AutocompleteItem
              key={index}
              onClick={() => handleAutocompleteClick(result)}
            >
              {result}
            </AutocompleteItem>
          ))}
          <CloseButton onClick={handleCloseAutocomplete}>닫기</CloseButton>
        </AutocompleteList>
      )}
    </>
  )
}

export default PlaceSearchBar;
