import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './Searches.style';

function RealTimeSearch() {

  const [realTimeSearches, setRealTimeSearches] = useState([]);

  // 실시간 검색 순위 조회 API 연결
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/place/log/rank');
            setRealTimeSearches(response.data.top_search_terms);
            //console.log(response.data.top_search_terms);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    };

    fetchData();
  }, []);

  return (
    <div>
      {realTimeSearches.map((search, index) => (
        <S.Search_div key={index}>
          <S.Word_index>{index+1}</S.Word_index>
          <S.Word_text>{search.tour_name}</S.Word_text>
        </S.Search_div>
      ))}
    </div>
  )
}

export default RealTimeSearch