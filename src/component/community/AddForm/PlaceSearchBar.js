import React, { useState } from 'react';
import styled from 'styled-components'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'

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
`
const SearchBarArea = styled.div`
  display: flex;
  align-items: center;
`

const PlaceSearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      onSearch(e.target.value);
    }
  }
  const handleButtonClick = () =>{  
    onSearch(searchValue)
  }
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <SearchBarArea id='searchBarArea'>
        <StyledSearchBar 
          type="text" 
          placeholder="검색"         
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}>
        </StyledSearchBar>
        <SearchButton onClick={handleButtonClick}>
          <SearchIcon />
        </SearchButton>
      </SearchBarArea>
    </>
  )
}

export default PlaceSearchBar
