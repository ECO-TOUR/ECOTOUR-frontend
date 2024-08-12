import React from 'react';
import * as S from "./MapSearch.style";
import { useNavigate } from 'react-router-dom';
// 컴포넌트
import RecentSearches from '../../../component/map/search/RecentSearches'; // 최근 검색어
import RealTimeSearches from '../../../component/map/search/RealTimeSearch'; // 최근 검색어
import Navbar from '../../../component/main/Navbar';

function MapSearch() {

  const navigate = useNavigate();
  function onClickBackBtn(){
    navigate('/map-main');
  }
  return (
    <S.Search_main_container>
      <S.Header_container>
        <S.BackBtn onClick={onClickBackBtn}>X</S.BackBtn>
        검색
      </S.Header_container>

      <S.Search_container placeholder="지역이나 생태관광지를 검색해보세요"></S.Search_container>
      
      {/* 최근 검색어 */}
      <S.Recent_container>
        <S.Recent_header>
          <S.Recent_title>최근 검색어</S.Recent_title>
          <S.Delete_btn>전체 삭제</S.Delete_btn>
        </S.Recent_header>
        {/* 최근 검색어 리스트 컴포넌트 */}
        <RecentSearches/>
      </S.Recent_container>

      {/* 실시간 검색어 */}
      <S.Recent_container>
        <S.Recent_header>
          <S.Recent_title>실시간 검색 순위</S.Recent_title>
        </S.Recent_header>
        {/* 실시간 검색어 리스트 컴포넌트 */}
        <RealTimeSearches/>
      </S.Recent_container>
      <Navbar/>
    </S.Search_main_container>
  )
}

export default MapSearch;