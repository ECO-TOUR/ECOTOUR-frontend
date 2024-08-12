import React from 'react'
import * as S from './Searches.style';

function RealTimeSearch() {

  const realTimeSearches = [
    "검색어1", "검색어2", "검색어3", "검색어4", "검색어5",
    "검색어6", "검색어7", "검색어8", "검색어9", "검색어10"
  ];

  return (
    <div>
      {realTimeSearches.map((search, index) => (
        <S.Search_div key={index}>
          <S.Word_index>{index+1}</S.Word_index>
          <S.Word_text>{search}</S.Word_text>
        </S.Search_div>
      ))}
    </div>
  )
}

export default RealTimeSearch