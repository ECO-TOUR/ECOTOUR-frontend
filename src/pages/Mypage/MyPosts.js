import styled from 'styled-components';
import React from 'react';
import Header from '../../component/main/Header.js';
import Navbar from '../../component/main/Navbar.js';
import MyPost from '../../component/Mypage/MyPostLarge.js';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { NavAtoms } from '../../recoil/NavAtoms.js';
import { ReactComponent as BackBtnIcon } from '../../assets/back_btn.svg';

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
// 뒤로가기 버튼
const BackBtn = styled.div`
    position: absolute;
    top: 21px;
    left: 20px;
    color: #D9D9D9;
    cursor: pointer;
    z-index: 1000;
    
    svg{
      width: 13px;
      height: 18px;
    }
`;

 
const Community = () => {  
  const [, setHighlightedItem] = useRecoilState(NavAtoms);
  const navigate = useNavigate();
  //Nav 변수변경
  setHighlightedItem('account')

  //뒤로가기
  const onClickBackBtn = () => {
    navigate('/mypage');
  };

  return (
    <>
      <Header pageName="내가 쓴 글" />
      <BackBtn onClick={onClickBackBtn}>
        <BackBtnIcon />
      </BackBtn>
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
