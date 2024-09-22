import React from 'react'
import styled from 'styled-components';

// styled-components로 스타일 정의
const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1000;
  background-color: white;

  &:after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 0;
    height: 0.5px;
    background-color: #D9D9D9;
  }
`;

const HeaderArea = styled.div`
  width: 100%;
  min-width: 320px;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.div`
  margin: 0 auto;
  padding: 20px 0px;
  font-weight: 800;
  text-align: center;
  font-size: 17px;
  color: ${(props) => props.color || '#333'};
`;

const Header = (props) => {

  return (
    <HeaderContainer id='header-container'>
      <HeaderArea>
        <HeaderTitle>
          {props.pageName ? props.pageName : 'Header'}
        </HeaderTitle>
      </HeaderArea>
    </HeaderContainer>
  );
}

export default Header;
