import React from 'react'
import * as S from './Searches.style';
import { ReactComponent as ClockIcon } from "../../../assets/search_clock.svg";

function RecentSearches() {

  const recentSearches = ["검색어1", "검색어2"];
  
  return (
    <div>
      {recentSearches.map((search, index) => (
        <S.Search_div key={index}>
          <ClockIcon />
          <S.Word_text>{search}</S.Word_text>
          <S.Word_del>X</S.Word_del>
        </S.Search_div>
      ))}
    </div>
  )
}

export default RecentSearches;