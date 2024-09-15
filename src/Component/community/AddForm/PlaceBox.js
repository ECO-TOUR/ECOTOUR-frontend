import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트
const Container = styled.div`
    padding: 10px 0px 0px 0px;
`;

const ContentBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 8px 0px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 10px;
    background-color: ${(props) => (props.isSelected ? '#D9D9D9' : 'transparent')}; /* 클릭된 박스는 배경색 변경 */

    &:hover {
        background-color: ${(props) => (props.isSelected ? '#D9D9D9' : '#f0f0f0')}; /* 마우스 오버 시 */
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

const NoResultsMessage = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #676767;
  text-align: center;
`;

// PlaceBox 컴포넌트
function PlaceBox({contents, onSelectPlace}) {
   
    const [selectedIndex, setSelectedIndex] = useState(null); // 클릭된 박스의 인덱스 추적

    const handleClick = (index, content) => {
        if (selectedIndex === index) {
            // 이미 선택된 박스를 다시 클릭하면 하이라이트 해제
            setSelectedIndex(null); // 선택 해제
            onSelectPlace(null); // 부모에게 null 값을 전달
        } else {
            setSelectedIndex(index); // 클릭된 박스의 인덱스를 설정
            onSelectPlace(content); // 클릭된 정보를 부모에게 전달
        }
    };
    return (
        <Container>
            {contents.search_results.length>0 ? (
                contents.search_results.map((content, index) => (
                    <ContentBox 
                        id='content-box' 
                        key={index}
                        isSelected={selectedIndex === index} // 클릭된 박스인지 확인
                        onClick={() => handleClick(index, content)} // 클릭 이벤트 처리
                        >
                        <ContentInfo id='content-info'>
                            <ContentName>{content.tour_name}</ContentName>
                            <ContentRegion>{content.tour_location}</ContentRegion>
                        </ContentInfo>
                    </ContentBox>
                ))
            ):(
                <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
            )}
        </Container>
    );
}

export default PlaceBox;
