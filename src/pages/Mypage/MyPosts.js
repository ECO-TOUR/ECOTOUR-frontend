import styled from 'styled-components';
import React , { useState , useEffect }from 'react';
import Header from '../../component/main/Header.js';
import Navbar from '../../component/main/Navbar.js';
import { useNavigate } from 'react-router-dom';
import MyPost from '../../component/Mypage/MyPostLarge.js';

const CommunityContainer = styled.div`
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

const CommunityArea = styled.div`
  margin: 6px 16px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 32px);
  min-width: calc(var(--mim-width) - 32px);
`;

const PostArea = styled.div`
  min-width: calc(320px - 32px);
  width: 100%;
  margin-top: 16px;
  font-weight: bold;
`;

const PostTitle = styled.div`
  margin-bottom: 10px;
`;

 
const Community = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(null);
  
  return (
    <>
      <Header pageName="내가 쓴 글" />
      <CommunityContainer id='community-container'>
        <CommunityArea id='community-area'>
          <PostArea id='post-area'>
            <PostTitle id='post-title'>전체 게시글</PostTitle>
            <MyPost></MyPost>
          </PostArea>
        </CommunityArea>
      </CommunityContainer>
      <Navbar id='navbar' />
    </>
  );
};

export default Community;
