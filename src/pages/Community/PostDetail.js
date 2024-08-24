import React from 'react'
import styled from 'styled-components'
import Header from '../../component/Main/Header.js';
import Navbar from '../../component/Main/Navbar.js';
import PostDetail from '../../component/community/Post/PostDetail.js'


const PostContainer = styled.div`
  padding-top: 60px;
  padding-bottom: 70px;
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

const Post = () => {
  return (
    <>
        <Header pageName="게시판" />
        <PostContainer id='community-container'>
            <PostDetail></PostDetail>
            <div>Post</div>
        </PostContainer>
        <Navbar />
    </>
  )
}

export default Post