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

// 정렬 선택 조건 div
const PostTitleArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
`

// 정렬 선택 조건(전체게시글)
const PostTitle = styled.div`
  cursor: pointer;
  border-bottom: 3px solid ${(props) => (props.isLike ? "#F5F5F5" : "#91EB86")};
  flex: 1;
  text-align: center;
  padding: 0px 0px 13px 0px;
  font-weight: 500;
`;

// 정렬 선택 조건(좋아요)
const LikeTitle = styled.div`
  cursor: pointer;
  border-bottom: 3px solid ${(props) => (props.isLike ? "#91EB86" : "#F5F5F5")};
  flex: 1;
  text-align: center;
  padding: 0px 0px 13px 0px;
  font-weight: 500;
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
  margin-bottom: 10px;
  margin-right: 15px;
  appearance: none;
  background-color: #333333;
  border: none;
  border-radius: 50px;
  filter: drop-shadow(1px 2px 4px #ABABAB);
  cursor: pointer;
  display: inline-block;
  padding: 0;
  position: relative;
  width: 3.3rem;
  height: 3.3rem;
  z-index: 10000; /* z-index를 더 높게 설정 */

  &:hover {
    background-color: #555;
  }

  svg{
    width: 23px;
    height: 23px;
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
  const [isLike, setIsLike] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  // 좋아요 버튼 클릭 시
  const onClickLikeBtn = () => {
    setIsLike(true);
  }

  // 전체 게시글 버튼 클릭 시
  const onClickPostBtn = () => {
    setIsLike(false);
  }

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
    //console.log("🚀 ~ Community ~ updatedSearchTerm:", searchTerm)
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
      <CommunityContainer>
        <CommunityArea>
          {/* 검색어 입력창 */}
          <SearchBar onSearch={handleSearch} reset={reset}/>
          <PostArea>
            <PostTitleArea id='post-title'>
              <PostTitle onClick={onClickPostBtn} isLike={isLike}>{searchTerm?'검색 게시글':'전체 게시글'}</PostTitle>
              <LikeTitle onClick={onClickLikeBtn} isLike={isLike}>좋아요</LikeTitle>
            </PostTitleArea>
            {/* 게시글 */}
            <Posts searchTerm={searchTerm} isLike={isLike}/>
          </PostArea>
        </CommunityArea>
      </CommunityContainer>
      {/* 글쓰기 버튼 */}
      <AddButtonArea>
        <AddPostButton role="button" onClick={moveToAddForm}>
          <WriteIcon />
        </AddPostButton>
      </AddButtonArea>
      <Navbar />
    </>
  );
};

export default Community;
