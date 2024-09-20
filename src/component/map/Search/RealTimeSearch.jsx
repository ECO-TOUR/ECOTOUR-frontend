import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            console.error(error);
        }
    };

    fetchData();
  }, []);

  // 검색 Div 클릭 시
  const navigate = useNavigate();
  const onClickSearch = (tour_id) => {
    navigate(`/detail/${tour_id}`);
  }

  return (
    <div>
      {realTimeSearches.map((search, index) => (
        <S.Search_div key={index} onClick={() => onClickSearch(search.tour_id)}>
          <S.Word_index>{index+1}</S.Word_index>
          <S.Word_text>{search.tour_name}</S.Word_text>
        </S.Search_div>
      ))}
    </div>
  )
}

export default RealTimeSearch
