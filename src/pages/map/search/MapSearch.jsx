import React, { useState } from 'react';
import * as S from "./MapSearch.style";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// 컴포넌트
import RecentSearches from '../../../component/map/Search/RecentSearches'; // 최근 검색어
import RealTimeSearches from '../../../component/map/Search/RealTimeSearch'; // 최근 검색어
import Navbar from '../../../component/main/Navbar';
// img
import { ReactComponent as BackBtn } from '../../../assets/back_btn.svg';

function MapSearch() {

  // 뒤로가기 버튼 클릭 시
  const navigate = useNavigate();
  function onClickBackBtn(){
    navigate('/map-main');
  }

  // 엔터 클릭 시 검색
  const [searchValue, setSearchValue] = useState('');
  // 검색어 입력 시 상태 업데이트
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);  // 입력된 값으로 상태 업데이트
  };
  const handleKeyDown = async(event) => {
      if (event.key === 'Enter') {
          event.preventDefault(); // 기본 Enter 동작 방지

          try {
            // 검색어를 포함한 API 호출
            const response = await axios.get(`/place`, {
              params: { search: searchValue },
            });
            console.log(response.data);

          } catch (error) {
            console.error(error);
          }
      }
  };

  return (
    <S.Search_main_container>
      <S.Header_container>
        <S.BackBtn onClick={onClickBackBtn}>
          <BackBtn/>
        </S.BackBtn>
        검색
      </S.Header_container>

      <S.Search_container 
        placeholder="지역이나 생태관광지를 검색해보세요" 
        onKeyDown={handleKeyDown} 
        onChange={handleInputChange}
        value={searchValue}>
      </S.Search_container>
      
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