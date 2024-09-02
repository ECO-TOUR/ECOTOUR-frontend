import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as S from './Searches.style';
import { ReactComponent as ClockIcon } from "../../../assets/search_clock.svg";

function RecentSearches() {

  const [recentSearches, setRecentSearches] = useState([]);
  // 최근 검색어 가져오기
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`/place/log/5`);
            //console.log(response.data.search_history);
            setRecentSearches(response.data.search_history);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      {recentSearches && recentSearches.length > 0 ? (
        recentSearches.map((search, index) => (
          <S.Search_div key={index}>
            <ClockIcon />
            <S.Word_text>{search.search_text}</S.Word_text>
            <S.Word_del>X</S.Word_del>
          </S.Search_div>
        ))
      ) : (
        <S.Search_div>
          <S.NoneText>최근 검색어가 없습니다.</S.NoneText>
        </S.Search_div>
      )}
    </div>
  )
}

export default RecentSearches;