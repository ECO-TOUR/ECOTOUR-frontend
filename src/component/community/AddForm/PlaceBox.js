import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 관광지 검색 결과 컴포넌트
const Container = styled.div`
    padding: 10px 0px 0px 0px;
    overflow-y: scroll;
    height: calc(100% - 70px);
`;

// 검색 결과 items
const ContentBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 12px 5px;
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
    font-size: 14px;
    font-weight: 500;
`;

// 검색 결과가 없는 경우
const NoResultsMessage = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #676767;
  text-align: center;
`;

// PlaceBox 컴포넌트
function PlaceBox({ contents, onValueChange }) {

    // 자동완성된 content 클릭 시
    const handleClick = (content) => {
      //console.log(content);
      onValueChange(content);
    };
  
    return (
      <Container>
        {Array.isArray(contents) && contents.length > 0 ? (
          contents.map((content, index) => ( // search_results를 직접 사용하지 않음
              <ContentBox
                key={index}
                onClick={() => handleClick(content)} // 클릭 이벤트 처리
              >
              <ContentInfo>
                <ContentName>{content}</ContentName>
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
