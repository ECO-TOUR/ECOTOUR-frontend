import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'

const StyledSearchBar = styled.input`
    width: 358px;
    min-width: calc(var(--mim-width) - 32px);
    align-self: center;
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    margin: 12px auto;
    padding: 10px 20px 12px 20px;
    color: #333333;
    font-weight: 500;
    font-size: 13px;
    box-sizing: border-box;
`;
const SearchButton = styled.div`
  position: relative;
  right: 52px;
  top: 1px;
  width: 0px;
  cursor: pointer;
  svg{
    width: 20px;
    height: 20px;
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
const SearchBar = ({ onSearch, reset}) => {
  const [searchValue, setSearchValue] = useState('');

  //검색어 부모로 보냄
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      onSearch(e.target.value);
    }
  }
  const handleButtonClick = (e) =>{  
    onSearch(searchValue)
  }
  
  // 입력값을 상태로 저장
  const handleInputChange = (e) => {
    setSearchValue(e.target.value); 
  };

  useEffect(() => {
    if(reset){
      setSearchValue('');
    }
  }, [reset])

  return (
    <>
    <SearchBarArea>
      <StyledSearchBar 
        type="text" 
        placeholder="검색"         
        value={searchValue}
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

export default SearchBar
