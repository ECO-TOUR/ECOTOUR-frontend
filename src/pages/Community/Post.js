import React from 'react'
import styled from 'styled-components'
import Header from '../../component/main/Header.js';
import Navbar from '../../component/main/Navbar.js';
import PostDetail from '../../component/community/Post/PostDetail.js'
import CommentBar from '../../component/community/Post/CommentBar.js';

const PostContainer = styled.div`
  padding-top: 60px;
  padding-bottom: 125px;
  margin: 0;
  height: 100vh;
  width: 100%;
  background-color: white;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  max-width: 430px;
  min-width: 320px;
`;

const CommentBarArea = styled.div`
  position: fixed;
  align-self:center;
  bottom: 70px;
  width: 100%;
  height: 55px;
  align-self: center;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.07);
`

const Post = () => {
  return (
    <>
        <Header pageName="게시판" />
        <PostContainer id='community-container'>
          <PostDetail></PostDetail>
        </PostContainer>
        <CommentBarArea id='comment-bar-area'>
          <CommentBar id='comment-bar'/>
        </CommentBarArea>
        <Navbar />
    </>
  )
}

export default Post