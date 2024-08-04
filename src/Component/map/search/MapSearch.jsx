import React from 'react';
import * as S from "./MapSearch.style";
import { useNavigate } from 'react-router-dom';

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

      </S.Recent_container>
    </S.Search_main_container>
  )
}

export default MapSearch;