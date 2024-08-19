import styled from 'styled-components';
import React from 'react';
import Post from './Post.js';
import Header from '../../component/Main/Header.js';
import Navbar from '../../component/Main/Navbar.js';

const CommunityContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: white;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  max-width: 430px;
  min-width: 320px;
  margin: 0 auto;
`;

const CommunityArea = styled.div`
  margin: 6px 16px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  width: calc(100% - 32px);
`;

const SearchBar = styled.input`
  width: 100%;
  min-width: 320px;
  height: 40px;
  align-self: center;
  background-color: #f5f5f5;
  border: none;
  border-radius: 10px;
  padding-left: 15px;
  color: #333333;
  font-weight: 400;
  font-size: 13px;
  box-sizing: border-box;
`;

const PostArea = styled.div`
  margin-top: 16px;
`;

const PostTitle = styled.div`
  margin-bottom: 10px;
`;

const StyledPost = styled.div`
  margin-top: 16px;
  width: 100%;
  max-width: 370px;
  height: 484px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const PhotoArea = styled.div`
  align-self: center;
  margin-top: 16px;
  width: 348px;
  height: 348px;
  background-color: #333333;
`;

const FirstLine = styled.div`
  margin: 5px 10px 0 10px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const SecondLine = styled.div`
  height: 60px;
  margin: 5px 10px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`;

const ThirdLine = styled.div`
  margin: 5px 10px;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const AddPostButtonContainer = styled.div`
  position: fixed;
  bottom: 15rem;
  right: 32rem;
`;

const AddPostButton = styled.button`
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 50px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 30px;
  font-weight: 600;
  line-height: 20px;
  padding: 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  width: 4rem;
  height: 4rem;

  &:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }

  &:hover {
    background-color: #2c974b;
  }

  &:focus {
    box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
    outline: none;
  }

  &:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, 0.1);
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }

  &:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
`;

const Community = () => {
  return (
    <>
      <Header pageName="게시판" />
      <CommunityContainer>
        <CommunityArea>
          <SearchBar type="text" placeholder="검색" />
          <PostArea>
            <PostTitle>전체 게시글</PostTitle>
            <StyledPost>
              <PhotoArea />
              <FirstLine>First Line</FirstLine>
              <SecondLine>Second Line</SecondLine>
              <ThirdLine>Third Line</ThirdLine>
            </StyledPost>
            <StyledPost>
              <PhotoArea />
              <FirstLine>First Line</FirstLine>
              <SecondLine>Second Line</SecondLine>
              <ThirdLine>Third Line</ThirdLine>
            </StyledPost>
          </PostArea>
        </CommunityArea>
        <AddPostButtonContainer>
          <AddPostButton role="button">+</AddPostButton>
        </AddPostButtonContainer>
      </CommunityContainer>
      <Navbar />
    </>
  );
};

export default Community;
