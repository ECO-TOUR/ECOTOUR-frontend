import React, { useState } from 'react';
import * as S from "./MapSearch.style";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
// 컴포넌트
import RecentSearches from '../../../component/map/Search/RecentSearches'; // 최근 검색어
import RealTimeSearches from '../../../component/map/Search/RealTimeSearch'; // 최근 검색어
import Navbar from '../../../component/main/Navbar';
// img
import { ReactComponent as BackBtn } from '../../../assets/back_btn.svg';
import { ReactComponent as SearchIcon } from '../../../assets/search_icon.svg';
// recoil
import { useRecoilState } from 'recoil';
import { recentSearchesState } from '../../../recoil/SearchesAtoms';
import { likedState } from '../../../recoil/SearchesAtoms';

function MapSearch() {

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const access_token = localStorage.getItem("access_token");
  const [, setLiked] = useRecoilState(likedState); // 좋아요 상태 관리 변수
  const [, setSearchResult] = useRecoilState(recentSearchesState); // 검색 결과 저장 변수
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState('');
  const [autoResults, setAutoResults] = useState([]); // 자동 검색어 결과 상태

  // 자동 입력 입력 상태 없데이트
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);  // 입력된 값으로 상태 업데이트
    // 입력값이 비어있지 않을 때만 자동완성API 호출
    axios.get(`/autocomplete/?query=${event.target.value}`)
      .then(response => {
        //console.log(response.data);
        setAutoResults(response.data.autocompleteResults || []); // 응답 데이터가 없을 경우 빈 배열로 설정
      })
      .catch(error => {
        console.error(error);
        setAutoResults([]); // 에러 발생 시 빈 배열로 설정
      });
  };

  // 자동완성된 단어 클릭 시
  const onClickWord = (result) => {
    setSearchValue(result);
    searchMutation.mutate(result);
  }

  // 최근 검색어 단어 클릭 시
  const onClickRecentWord = (result) => {
    searchMutation.mutate(result);
  }

  // 검색 기능 및 결과 조회
  const searchMutation = useMutation(
    async (searchValue) => {
      const response = await axios.get('/place', {
        params: { search: searchValue },
        headers: {
          'Authorization': `Bearer ${access_token}`, // Bearer 토큰 방식으로 추가
        },
      });
      setSearchResult(response.data.search_results); //검색 결과 저장

      const initialLikedState = response.data.search_results.map(content => content.tourspot_liked === "liked");
      setLiked(initialLikedState);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['recentSearches']); // 변수 새로고침
        setSearchValue('');
        navigate('/map-main');
      },
      onError: (error) => {
        console.error('Search failed:', error);
      },
    }
  );

  // 엔터 클릭 시
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 Enter 동작 방지
      searchMutation.mutate(searchValue);
    }
  };

  const onClickBackBtn = () => {
    navigate('/map-main');
  };

  // 전체 삭제 기능
  const searchDeleteMutation = useMutation(
    async () => {
      const response = await axios.delete(`/place/log/${userId}/delete_all/`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['recentSearches']);
      },
      onError: (error) => {
        console.error('Search failed:', error);
      },
    }
  );

  // 최근 검색어 전체 삭제
  async function deleteAllSearchLogs() {
    searchDeleteMutation.mutate();
  }

  return (
    <S.Search_main_container>
      <S.Header_container>
        <S.BackBtn onClick={onClickBackBtn}>
          <BackBtn />
        </S.BackBtn>
        검색
      </S.Header_container>

      <S.Search_container 
        placeholder="지역이나 생태관광지를 검색해보세요" 
        onKeyPress={handleKeyDown} 
        onChange={handleInputChange}
        value={searchValue}>
      </S.Search_container>
      
      {/* 검색어 자동완성 */}
      {searchValue.length === 0 ? <></>:<>
      <S.SearchWordBox>
        {Array.isArray(autoResults) && autoResults.length > 0 ? (
          autoResults.map((result, index) => (
            <S.SearchWordItem key={index} onClick={() => onClickWord(result)}>
              <SearchIcon/>
              <S.SearchText>{result}</S.SearchText>
            </S.SearchWordItem>
          ))
        ) : (
          <S.SearchWordItem/>// 검색 결과가 없거나 배열이 아닐 때 표시할 내용
        )}
      </S.SearchWordBox></>
      }
      {/* 최근 검색어 */}
      <S.Recent_container>
        <S.Recent_header>
          <S.Recent_title>최근 검색어</S.Recent_title>
          <S.Delete_btn onClick={deleteAllSearchLogs}>전체 삭제</S.Delete_btn>
        </S.Recent_header>
        {/* 최근 검색어 리스트 컴포넌트 */}
        <RecentSearches onClickRecentWord={onClickRecentWord}/>
      </S.Recent_container>

      {/* 실시간 검색어 */}
      <S.Recent_container>
        <S.Recent_header>
          <S.Recent_title>실시간 검색 순위</S.Recent_title>
        </S.Recent_header>
        {/* 실시간 검색어 리스트 컴포넌트 */}
        <RealTimeSearches />
      </S.Recent_container>
      
      <Navbar />
    </S.Search_main_container>
  );
}

export default MapSearch;
