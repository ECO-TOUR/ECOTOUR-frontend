import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import PlaceBox from './PlaceBox';
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

const PlaceSearchBar = ({ onValueChange }) => {
  const [searchValue, setSearchValue] = useState(''); // input 입력값
  const [searchResults, setSearchResults] = useState([]); // 자동완성 저장 배열

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
          onChange={handleInputChange}>
        </StyledSearchBar>
      </SearchBarArea>
      {/* 자동완성 결과 컴포넌트 */}
      <PlaceBox contents={searchResults}  onValueChange={onValueChange}/>
    </>
  )
}

export default PlaceSearchBar;
