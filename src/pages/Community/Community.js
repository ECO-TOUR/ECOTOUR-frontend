import styled from 'styled-components';
import React , { useState,useEffect }from 'react';
import Header from '../../component/main/Header.js';
import Navbar from '../../component/main/Navbar.js';
import Posts from '../../component/community/Main/Posts.js'; 
import SearchBar from '../../component/community/Main/SearchBar.js'
import { ReactComponent as WriteIcon } from '../../assets/write.svg';
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
const AddButtonArea = styled.div`
  position: fixed;
  bottom: 80px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
`;
const AddPostButton = styled.button`
  margin-left: 0;
  margin-right: 10px;
  appearance: none;
  background-color: #91EB86;
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
  z-index: 10000; /* z-index를 더 높게 설정 */
  
  &:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }

  &:hover {
    background-color: #2c974b;
  }
  z-index: 1000;

  &:hover {
    outline: none;
    background-color: #2ea44f; 
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

  svg{
    width: 45px;
    height: 45px;
  }
`;
const BackBtn = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible'
})`
position: absolute;
top: 21px;
left: 20px;
color: #D9D9D9;
cursor: pointer;
z-index: 1001;
display: ${(props) => (props.visible ? 'block' : 'none')};

svg{
  width: 13px;
  height: 18px;
}
`;


const Community = () => {
  const [, setHighlightedItem] = useRecoilState(NavAtoms);
  const [isBntActivate, setIsBntActivate] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  //nav아이콘 하이라트
  useEffect(() => {
    setHighlightedItem('chat');
  }, [setHighlightedItem]);


  //게시글작성으로 이동
  const moveToAddForm = () =>{
    navigate('./addform/')
  }

  //검색 api 호출
  const handleSearch = async (term) => {
    await setSearchTerm(term); //검색어 업데이트 
    if(term){
      setIsBntActivate(true);
      setReset(false);
    }
    console.log("🚀 ~ Community ~ updatedSearchTerm:", searchTerm)
  } 

  //뒤로가기
  const onClickBackBtn = () => {
    setSearchTerm(null);
    setIsBntActivate(false);
    setReset(true);
  };

  return (
    <>
      <Header pageName="게시판" />
      <BackBtn onClick={onClickBackBtn} visible={isBntActivate}>
        <BackBtnIcon />
      </BackBtn>
      <CommunityContainer id='community-container'>
        <CommunityArea id='community-area'>
          <SearchBar onSearch={handleSearch} reset={reset}/>
          <PostArea id='post-area'>
            <PostTitle id='post-title'>{searchTerm?'검색 게시글':'전체 게시글'}</PostTitle>
            <Posts id='post' searchTerm={searchTerm}/>
          </PostArea>
        </CommunityArea>
      </CommunityContainer>
      <AddButtonArea id='add-button-area'>
        <AddPostButton role="button" onClick={moveToAddForm}>
          <WriteIcon />
        </AddPostButton>
      </AddButtonArea>
      <Navbar id='navbar' />
    </>
  );
};

export default Community;
