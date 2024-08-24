import React from 'react'
import styled from 'styled-components'

const StyledSearchBar = styled.input`
    width: 100%;
    min-width: calc(var(--mim-width) - 32px);
    height: 40px;
    align-self: center;
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    color: #333333;
    font-weight: 400;
    font-size: 13px;
    box-sizing: border-box;
`;
const SearchBar = () => {
  return (
    <StyledSearchBar id='community-search' type="text" placeholder="검색" ></StyledSearchBar>
  )
}

export default SearchBar