import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import PlaceBox from './PlaceBox';

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
