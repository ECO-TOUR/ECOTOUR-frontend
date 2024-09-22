import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import exampleImage from '../../../assets/example2.jpg';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


const StyledPost = styled.div`
    margin-top: 16px;
    width: 100%;
    height: ${props => `calc(${props.width > 430 ? 430 : props.width}px + 128px)` };
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 10px;
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
`;
const LikeButton = styled.button`
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
        fill={liked === "yes" ? "red" : "none"}
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

// Post 컴포넌트 정의
const Posts = ({ searchTerm, isLike }) => {
  const navigate = useNavigate();

  const moveToPost = (postId) =>{
    navigate(`./post/${postId}`);
  };

  const userId = localStorage.getItem('user_id');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth > 430 ? 430 : window.innerWidth);


  useEffect(() => {
      //사이즈에 따라 게시물 크기 변경
      const handleResize = () =>{
          const updateWidth = window.innerWidth > 430 ? 430 : window.innerWidth;
          setWindowWidth(updateWidth);
      };

      window.addEventListener('resize', handleResize);
      
      //게시물 정보 받아오기
      if(searchTerm){
        axios.get(`/community/api/postsearch/1/${searchTerm}/${userId}`
          , {
            headers: {
              'Cache-Control': 'no-cache',  // 서버나 브라우저에 캐시를 사용하지 않도록 요청
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then(response =>{
          setPosts(response.data.content);
          setFilteredPosts(response.data.content); 
          console.log('검색결과',response.data.content);
        })
        .catch(error => {
          console.error(error);
        })  
      }
      else{
        axios.get(`/community/api/postinquire/${userId}/`
          , {
          headers: {
            'Cache-Control': 'no-cache',  // 서버나 브라우저에 캐시를 사용하지 않도록 요청
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        .then(response => {
          setPosts(response.data.content);
          setFilteredPosts(response.data.content); 
          console.log('Fetched data:', response.data.content);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }
    
      return () => {
          window.removeEventListener('resize', handleResize);
      };
      
  }, [searchTerm, userId]); 

  useEffect(() => {
    if (isLike) {
      const likedPosts = posts.filter((post) => post.like === 'yes');
      setFilteredPosts(likedPosts);
    } else {
      setFilteredPosts(posts); // 모든 게시물로 복구
    }
  }, [isLike, posts]);

  const toggleLike = (id) => {
    setPosts(prevPosts => 
        prevPosts.map(post =>
          post.post_id === id ? {...post, like: post.like === "yes" ? "no" : "yes"} : post
        )
    );
  };

  return (
    <>
      {filteredPosts.length>0?(
        filteredPosts.map(post => (
          <StyledPost onClick={() => moveToPost(post.post_id)} key={post.post_id} id='post' width={windowWidth}> 
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
                  <LikeButton onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(post.post_id);
                      LikeHandler(userId, post.post_id);
                    }}>
                      <LikeIcon liked={post.like} />
                  </LikeButton>
              </Like>
              <FirstLine>
                  {post.post_text}
              </FirstLine>
              <SecondLine>
                  <div>댓글 {post.comm_cnt?post.comm_cnt:'0'}개</div>
                  <div>{post.last_modified?formatDate(post.last_modified):"20xx.xx.xx PM 3:55"}</div>
              </SecondLine>
          </StyledPost>
        ))
      ):(
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          textAlign: "center" 
      }}>게시물이 없습니다</div>
      )}
    </>
  );  
}

export default Posts;


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
