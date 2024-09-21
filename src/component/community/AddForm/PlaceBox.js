import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 관광지 검색 결과 컴포넌트
const Container = styled.div`
    padding: 10px 0px 0px 0px;
`;

// 검색 결과 items
const ContentBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 10px;

    &:hover {
        background-color: #F5F5F5;
    }
`;

const ContentInfo = styled.div`
    margin-left: 10px;

`;

const ContentName = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

const ContentRegion = styled.div`
    font-size: 11px;
    font-weight: 400;
    color: #676767;
    margin-top: 5px;
`;

// 검색 결과가 없는 경우
const NoResultsMessage = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #676767;
  text-align: center;
`;

// PlaceBox 컴포넌트
function PlaceBox({ contents, onSelectPlace }) {
    const [selectedIndex, setSelectedIndex] = useState(null); // 클릭된 박스의 인덱스 추적
  
    const handleClick = (index, content) => {
      if (selectedIndex === index) {
        setSelectedIndex(null); // 선택 해제
        onSelectPlace(null); // 부모에게 null 값을 전달
      } else {
        setSelectedIndex(index); // 클릭된 박스의 인덱스를 설정
        onSelectPlace(content); // 클릭된 정보를 부모에게 전달
      }
    };
  
    useEffect(() => {
      setSelectedIndex(null); // 컴포넌트가 리렌더링될 때마다 선택 초기화
    }, [contents]);
  
    return (
      <Container>
        {contents.search_results.length > 0 ? (
          contents.search_results.map((content, index) => (
            <ContentBox
              id="content-box"
              key={index}
              onClick={() => handleClick(index, content)} // 클릭 이벤트 처리
            >
              <ContentInfo id="content-info">
                <ContentName>{content.tour_name}</ContentName>
                <ContentRegion>{content.tour_location}</ContentRegion>
              </ContentInfo>
            </ContentBox>
          ))
        ) : (
          <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
        )}
      </Container>
    );
  }
  

export default PlaceBox;
