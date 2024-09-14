import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';  // 검색 API 요청에 사용할 라이브러리
import SearchBar from './PlaceSearchBar';

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
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
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

  ${CheckboxInput}:checked + ${CheckboxLabel} span:first-child {
    background: #91EB86;
    border-color: #91EB86;
    animation: wave-4 0.4s ease;
  }

  ${CheckboxInput}:checked + ${CheckboxLabel} span:first-child ${CheckboxSvg} {
    stroke-dashoffset: 0;
  }

  ${waveAnimation}
`;

// 팝업 스타일
const PopupContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
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

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
`;

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);  // 체크박스 상태 관리
  const [searchTerm, setSearchTerm] = useState('');   // 검색어 상태 관리
  const [searchResult, setSearchResult] = useState([]); // 검색 결과 상태

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // 체크박스 클릭 시 팝업 열기/닫기
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.example.com/search?q=${searchTerm}`);
      setSearchResult(response.data);  // 검색 결과를 상태로 저장
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 입력 상태 업데이트
  };

  return (
    <>
      <CheckboxWrapperStyled>
        <CheckboxInput
          className="inp-cbx"
          id="morning"
          type="checkbox"
          onChange={handleCheckboxChange}
          // checked={isChecked}
        />
        <CheckboxLabel className="cbx" htmlFor="morning">
          <span>
            <CheckboxSvg width="12px" height="10px">
              <use xlinkHref="#check-4" />
            </CheckboxSvg>
          </span>
          <span height='18px'>내 위치 공유하기</span>
        </CheckboxLabel>
        <InlineSvg className="inline-svg">
          <symbol id="check-4" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </symbol>
        </InlineSvg>
      </CheckboxWrapperStyled>

      {/* 팝업 창 */}
      <PopupContainer show={isChecked}>
        <PopupContent>
          <CloseButton onClick={() => setIsChecked(false)}>닫기</CloseButton>
          <SearchBar/>

          {/* 검색 결과 표시 */}
          <div>
            {searchResult.length > 0 ? (
              <ul>
                {searchResult.map((result, index) => (
                  <li key={index}>{result.name}</li>
                ))}
              </ul>
            ) : (
              <div>검색 결과가 없습니다.</div>
            )}
          </div>
        </PopupContent>
      </PopupContainer>
    </>
  );
};

export default Checkbox;
