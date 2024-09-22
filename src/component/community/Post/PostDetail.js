import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import exampleImage from '../../../assets/example2.jpg';
import { ReactComponent as ProfileIcon } from '../../../assets/profile.svg';
import Comment from './Comment'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRecoilState } from 'recoil';
import { UserProfile } from '../../../recoil/UserProfileAtoms';
import 'swiper/css';

const StyledPost = styled.div`
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-self: center;
    padding: 0 16px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
`;
const PhotoArea = styled.div`
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1 / 1;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; 
`;
const SwiperImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
`;
const Like = styled.div`
    margin-top: 5px;
    height: 35px;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    align-self: start;
    position: relative;
`;
const LikeButton = styled.button`
    position: absolute;
    left: -5px;
    height: 35px;
    width: 35px;
    outline: none;
    border: none;
    background: none;
    cursor: pointer; /* 마우스를 올렸을 때 커서를 포인터로 변경 */
    padding: 0;


`;
const LikeIcon = ({ liked }) => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill={liked ? "red" : "none"}
      stroke={liked ? "red" : "#333"}
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 8.5C22 5.46243 19.5376 3 16.5 3C14.7819 3.05354 13.1586 3.80024 12 5.07C10.8414 3.80024 9.2181 3.05354 7.5 3C4.46243 3 2 5.46243 2 8.5C2 12.42 6.75 16.75 9 19L11.28 21.28C11.4205 21.4207 11.6112 21.4998 11.81 21.5H12.19C12.3888 21.4998 12.5795 21.4207 12.72 21.28L15 19C17.25 16.75 22 12.42 22 8.5Z"
        fill={liked ? "red" : "none"}
        stroke="#333"
      />
    </svg>
  );
const FirstLine = styled.div`
    height: 75px;
    width: 100%;
    margin-top: 5px;
    font-size: 16px;
    font-weight: 500;
`;
const SecondLine = styled.div`
    width: 100%;
    margin-top: 5px;
    height: 35px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: end;
`; 
const UserArea = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg{
    width: 40px;
    height: 40px;
  };
`;
const Info = styled.div`
  margin-left: 10px;
  margin-top: 5px;
  div{
    margin-bottom: 5px;
  }
`;
const CommentArea = styled.div`
  padding-top : 7px;

`
const Modify = styled.button`
  margin-left: auto; 
  margin-right: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  color: #676767;
`;

const Delete = styled.button`
  margin-left: auto; 
  margin-right: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  color: #676767;
`
const Control = styled.div`
`
const Span = styled.div`
  display: flex;
`
const ProfilePhoto = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

const PostDetail = ({post, comments}) => {
  const [liked, setLiked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth > 430 ? 430 : window.innerWidth);
  const userId = localStorage.getItem('user_id');
  const [profile] = useRecoilState(UserProfile);
  const [userData, setUserData] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    if(post) {
      setLiked(post.like === 'yes');
      const foundData = profile.find((user) => user.userId === parseInt(post.user_id))
      setUserData(foundData);
      // console.log("🚀 ~ useEffect ~ foundData:", foundData)
    }
  },[post, profile]);


  //사이즈에 따라 게시물 크기 변경
  useEffect(() => {
      const handleResize = () =>{
          const updateWidth = window.innerWidth > 430 ? 430 : window.innerWidth;
          setWindowWidth(updateWidth);
      };

      window.addEventListener('resize', handleResize);
  
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }); 

  //좋아요 토글
  const toggleLike = () => {
      setLiked(prevLiked => !prevLiked);
      LikeHandler(userId, post.post_id);
  };

  //좋아요 정보 요청
  const LikeHandler = (userId, postId) => {
    axios.post(`/community/api/postlike/${userId}/`, {
      'post_id':postId, 
    })
    .then(response => {
      console.log('like 성공',response);
    })
    .catch(error => {
      console.log('error like', error);
    })
  }
  
  //포스트 삭제 요청
  const DeletePost = (postId) => {
    const confirmDelete = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
  
    // 확인 버튼을 눌렀을 때만 삭제 요청을 보냄
    if (confirmDelete) {
      axios.delete(`/community/api/postdelete/${postId}`)
        .then(response => {
          console.log(response);
          alert("게시글이 삭제되었습니다.");
          navigate('/community');  // 삭제 후 커뮤니티 페이지로 이동
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("게시글 삭제가 취소되었습니다.");
    }
  }


  //포스트 정보 없을 때 로딩
  if (!post){
    return <div>Loading...</div>
  }

  return (
    <>
      <StyledPost id="post-area" width={windowWidth}> 
          <UserArea id="user-area">
            <Span>
              {userData?(
                <>
                  <ProfilePhoto src={userData.profilePhoto}></ProfilePhoto>
                  <Info>
                    <div>{userData.nickname}</div>
                    <div>{post.last_modified? formatDate(post.last_modified):"20xx.xx.xx PM 3:55"}</div>
                  </Info>
                </>  
                ):(
                <>
                  <ProfileIcon/>
                  <Info>
                    <div>User Id</div>
                    <div>{post.last_modified? formatDate(post.last_modified):"20xx.xx.xx PM 3:55"}</div>
                  </Info>
                </>  
              )}
               </Span>
            <Control id='control'>
              {parseInt(post.user_id) === parseInt(userId)?(
                <>
                  <Modify onClick={() => navigate(`/community/modifyform/${post.post_id}`)}>수정</Modify>
                  <Delete onClick={() => DeletePost(post.post_id)}>삭제</Delete>
                </>):(<></>)} 
            </Control>
          </UserArea>
          <PhotoArea>
            <Swiper
              pagination={{ clickable: true }}
              spaceBetween={15}
              slidesPerView={1}
              style={{height: '100%'}}
            >
              {Array.isArray(post.post_img) && post.post_img.slice(0, 5).map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <SwiperImage 
                    src={imgSrc || exampleImage} 
                    alt={`Post Image ${index + 1}`} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </PhotoArea>
          <Like>
              <LikeButton onClick={toggleLike}>
                  <LikeIcon liked={liked} />
              </LikeButton>
          </Like>
          <FirstLine>
              {post.post_text}
          </FirstLine>
          <SecondLine>
              <div>댓글 {post.comm_cnt || '0'}개</div>
          </SecondLine>
          <CommentArea>
            <Comment comments={comments || []}></Comment>
          </CommentArea>
      </StyledPost>
    </>
  );
}

export default PostDetail;


function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  // 연도, 월, 일 추출 및 형식 지정
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  // 시간, 분 추출 및 12시간제로 변환
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0시를 12시로 변환

  // 최종 포맷팅된 문자열 반환
  return `${year}.${month}.${day} ${ampm} ${hours}:${minutes}`;
}