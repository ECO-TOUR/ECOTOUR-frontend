import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './Searches.style';
import { ReactComponent as ClockIcon } from "../../../assets/search_clock.svg";

function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 데이터 가져오기
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = parseInt(localStorage.getItem("user_id"), 10);
      const response = await axios.get(`/place/log/${userId}`);
      setRecentSearches(response.data.search_history);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch recent searches.');
    } finally {
      setLoading(false);
    }
  };

  // 최근 검색어 삭제
  const onClickDelete = async (logId) => {
    setLoading(true);
    setError(null);
    try {
      const userId = parseInt(localStorage.getItem("user_id"), 10);
      const logIdInt = parseInt(logId, 10);
      
      await axios.delete(`/place/log/${userId}/${logIdInt}/delete`, {
      });
      
      console.log('Delete successful');
      
      // 삭제 후 데이터를 다시 가져오기
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete the search.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {recentSearches && recentSearches.length > 0 ? (
        recentSearches.map((search, index) => (
          <S.Search_div key={index}>
            <ClockIcon />
            <S.Word_text>{search.search_text}</S.Word_text>
            <S.Word_del onClick={() => onClickDelete(search.log_id)}>X</S.Word_del>
          </S.Search_div>
        ))
      ) : (
        !loading && (
          <S.Search_div>
            <S.NoneText>최근 검색어가 없습니다.</S.NoneText>
          </S.Search_div>
        )
      )}
    </div>
  );
}

export default RecentSearches;
