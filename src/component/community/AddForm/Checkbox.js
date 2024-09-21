import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';  // 검색 API 요청에 사용할 라이브러리
import SearchBar from './PlaceSearchBar';
import PlaceBox from './PlaceBox';

//체크박스 스타일
const CheckboxInput = styled.input`
  position: absolute;
  visibility: hidden;
`;

const CheckboxLabel = styled.label`
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding: 6px 0;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s ease;
  display: inline-block;
  height: 37px;
  
  span {
    float: left;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }

  span:first-child {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    transform: scale(1);
    border: 1px solid #cccfdb;
    transition: all 0.2s ease;
    box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
  }

  span:first-child svg {
    position: absolute;
    top: 6px;
    left: 5px;
    fill: none;
    stroke: ${(props) => (props.selectedPlace ? '#fff' : 'transparent')};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: ${(props) => (props.selectedPlace ? '0' : '16px')};
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }

  span:last-child {
    display: flex; 
    align-items: center;
    padding-left: 8px;
    line-height: 18px;
    height: 24px;
  }

  &:hover span:first-child {
    border-color: #07f;
  }
`;

const InlineSvg = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
`;

const CheckboxSvg = styled.svg`
  position: absolute;
  top: 3px;
  left: 3px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
`;

const waveAnimation = `
  @keyframes wave-4 {
    50% {
      transform: scale(0.9);
    }
  }
`;

const CheckboxWrapperStyled = styled.div`
  ${CheckboxLabel}:hover span:first-child {
    border-color: #91EB86;
  }

  ${CheckboxLabel} span:first-child {
    background: ${(props) => (props.selectedPlace ? '#91EB86' : 'transparent')};
    border-color: ${(props) => (props.selectedPlace ? '#91EB86' : '#cccfdb')};
    animation: ${(props) => (props.selectedPlace ? 'wave-4 0.4s ease' : 'none')};
  }

  ${CheckboxInput}:checked + ${CheckboxLabel} span:first-child ${CheckboxSvg} {
    stroke-dashoffset: 0;
  }

  ${waveAnimation}
`;

// 팝업 스타일
const PopupContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  z-index: 1001;
  position: fixed;  /* 화면에 고정 */
  top: 50%;         /* 화면 상단에서 50% */
  left: 50%;        /* 화면 왼쪽에서 50% */
  transform: translate(-50%, -50%);  /* 팝업을 정확히 중앙으로 */
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 90%;
  height: 50%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const ResultArea = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  overflow-y: scroll;
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 팝업 닫기 버튼
const CloseButton = styled.button`
  background-color: #333;
  color: white;
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  transition: background-color 0.3s;

  &:hover{
      background-color: #555;
  }
`;

const Checkbox = ({ onChange, initalValue }) => {
  const [isChecked, setIsChecked] = useState(false);  // 체크박스 상태 관리
  const [searchTerm, setSearchTerm] = useState(null);   // 검색어 상태 관리
  const [searchResult, setSearchResult] = useState([]); // 검색 결과 상태
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const userId = localStorage.getItem('user_id');
  const access_token = localStorage.getItem('access_token');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // 체크박스 클릭 시 팝업 열기/닫기
  };

  const handleSearch = async (value) => {
    setSearchTerm(value); //검색어 업데이트 
    setIsSearchComplete(false); 
  };

  const handleClose = () => {
    setIsChecked(false); // 팝업 닫기
  };

  const handleSelectPlace = (place) => {
    if(place!=null){
      setSelectedPlace(place.tour_name); // 선택한 장소 정보 업데이트
      onChange(place.tour_id);
    }
    else{
      setSelectedPlace(null);
      onChange(null);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/place?search=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${access_token}` // 헤더에 access_token 추가
            }
          });
          setSearchResult(response.data);  // 검색 결과를 상태로 저장
          setIsSearchComplete(true);
          console.log('search result:', response.data);
        } catch (error) {
          console.error('검색 중 오류 발생:', error);
        }
      };
      fetchData();
    }
  }, [searchTerm]);
  
  useEffect(() => {
    if(initalValue){ 
      axios.get(`/place/detail/${initalValue}/${userId}/`)
      .then(response=> {
        console.log('초기값', response.data);
        setSelectedPlace(response.data.place_detail.tour_name);
      })
      .catch(error => {
        console.error('초기설정에러',error);
      })
    }
  }, []);

  return (
    <>
      <CheckboxWrapperStyled selectedPlace={selectedPlace !== null}>
        <CheckboxInput
          className="inp-cbx"
          id="morning"
          type="checkbox"
          onChange={handleCheckboxChange}
        />
        <CheckboxLabel className="cbx" htmlFor="morning" selectedPlace={selectedPlace !== null}>
          <span>
            <CheckboxSvg width="12px" height="10px">
              <use xlinkHref="#check-4" />
            </CheckboxSvg>
          </span>
          <span height='18px'>{selectedPlace || '관광지 선택하기'}</span>
        </CheckboxLabel>
        <InlineSvg className="inline-svg">
          <symbol id="check-4" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </symbol>
        </InlineSvg>
      </CheckboxWrapperStyled>

      {/* 팝업 창 */}
      <PopupContainer id='popup-area' show={isChecked} >
        <PopupContent>
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm}/>
          <ResultArea id='search-area'>
            {isSearchComplete && <PlaceBox contents={searchResult} onSelectPlace={handleSelectPlace} />}
          </ResultArea>
          <ButtonArea>
            <CloseButton onClick={() => handleClose()}>닫기</CloseButton>
          </ButtonArea>
        </PopupContent>
      </PopupContainer>
    </>
  );
};

export default Checkbox;
