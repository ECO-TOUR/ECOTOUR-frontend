import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import * as S from './Searches.style';
import { ReactComponent as ClockIcon } from "../../../assets/search_clock.svg";

function RecentSearches({ onClickRecentWord }) {
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("user_id"); // 사용자 id

  // useQuery로 API로부터 최근 검색어 목록 가져오기
  const { data: recentSearches, isLoading, isError, error } = useQuery(
    ['recentSearches', userId],
    async () => {
      const response = await axios.get(`/place/log/${userId}`);
      return response.data.search_history;
    },
    {
      staleTime: 300000, // 데이터를 캐시에 유지하는 시간(5분)
      retry: 2, // 요청이 실패하면 최대 2번까지 재시도
    }
  );

  // 중복 검색어 제거
  const filteredSearches = recentSearches
    ? Array.from(new Set(recentSearches.map(search => search.search_text)))
      .map(searchText => recentSearches.find(search => search.search_text === searchText))
    : [];

  // 삭제 기능
  const mutation = useMutation(

    async (logId) => {
      await axios.delete(`/place/log/${userId}/${logId}/delete`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['recentSearches', userId]);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  // 삭제 버튼 클릭 시
  const onClickDelete = (logId) => {
    mutation.mutate(logId);
  };

  return (
    <div>
      {filteredSearches && filteredSearches.length > 0 ? (
        filteredSearches.map((search, index) => (
          <S.Search_div key={index} onClick={() => onClickRecentWord(search.search_text)}>
            <ClockIcon />
              <S.Word_text>{search.search_text}</S.Word_text>
            <S.Word_del 
              onClick={(e) => {
                e.stopPropagation();
                onClickDelete(search.log_id);
              }}>X
            </S.Word_del>
          </S.Search_div>
        ))
      ) : (
        <S.Search_div>
          <S.NoneText>최근 검색어가 없습니다.</S.NoneText>
        </S.Search_div>
      )}
    </div>
  );
}

export default RecentSearches;
