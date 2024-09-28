import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import exampleImage from '../../../assets/example2.jpg';
import { ReactComponent as MoveRightIcon } from '../../../assets/move_right.svg';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const StyledPost = styled.div`
    margin-top: 10px;
    width: 100%;
    height: ${props => `calc(${props.width > 430 ? 430 : props.width}px + 128px)` };
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 15px 5px 10px 5px;
    cursor: pointer;
    border-bottom: 1px solid #D9D9D9;
`;
const PhotoArea = styled.div`
    position: relative;
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
    object-fit: cover;
    display: block;
`;

// Swiper 기본 내비게이션 버튼을 SVG로 교체하는 스타일
const CustomNavigationButton = styled.div`
  .swiper-button-next, .swiper-button-prev {
    background: none; /* 배경을 없애기 */
    border: none;
    &::after {
      content: ''; /* Swiper 기본 화살표 없애기 */
    }
  }

  .swiper-button-next svg,
  .swiper-button-prev svg {
    width: 25px;
    height: 25px;
  }

  .swiper-button-prev {
    left: 5px;
  }

  .swiper-button-next {
    right: 5px;
  }

  /* 왼쪽 버튼은 아이콘 회전 */
  .swiper-button-prev svg {
    transform: rotate(180deg);
  }
`;
const Like = styled.div`
    margin-top: 5px;
    height: 35px;
    width: 100%;
    font-size: 15px;
    font-weight: 500;
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
      fill={liked ? "#FF5959" : "none"}
      stroke={liked ? "#FF5959" : "#333"}
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 8.5C22 5.46243 19.5376 3 16.5 3C14.7819 3.05354 13.1586 3.80024 12 5.07C10.8414 3.80024 9.2181 3.05354 7.5 3C4.46243 3 2 5.46243 2 8.5C2 12.42 6.75 16.75 9 19L11.28 21.28C11.4205 21.4207 11.6112 21.4998 11.81 21.5H12.19C12.3888 21.4998 12.5795 21.4207 12.72 21.28L15 19C17.25 16.75 22 12.42 22 8.5Z"
        fill={liked === "yes" ? "#FF5959" : "none"}
        stroke="#FF5959"
      />
    </svg>
  );

// 게시글 내용
const FirstLine = styled.div`
    height: 75px;
    width: 100%;
    margin-top: 5px;
    font-size: 15px;
    font-weight: 400;
    overflow: hidden; /* 넘치는 텍스트 숨김 */ 
    display: -webkit-box;
    -webkit-line-clamp: 4; /* 텍스트를 5줄로 제한 */
    -webkit-box-orient: vertical;
    line-height: 1.2; /* 줄 간격 설정 */
    max-height: calc(1.2em * 5); /* line-height * 줄 수 */
    text-overflow: ellipsis; /* 말줄임표(...) 표시 */
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
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => (
          <CustomNavigationButton key={post.post_id}> {/* 고유한 key로 설정 */}
            <StyledPost onClick={() => moveToPost(post.post_id)} id='post' width={windowWidth}>
              <PhotoArea>
              <Swiper
                key={post.post_id} // Swiper가 각 게시물마다 독립적으로 작동하도록 고유 key 추가
                navigation={{
                  nextEl: `.swiper-button-next-${index}`, // index로 고유 클래스명 부여
                  prevEl: `.swiper-button-prev-${index}`,
                }}
                pagination={{ clickable: true }}
                spaceBetween={15}
                slidesPerView={1}
                style={{ height: '100%' }}
                modules={[Navigation]}
              >
                {Array.isArray(post.post_img) &&
                  post.post_img.slice(0, 5).map((imgSrc, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <SwiperImage
                        src={imgSrc || exampleImage}
                        alt={`Post Image ${imgIndex + 1}`}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>

              {Array.isArray(post.post_img) && post.post_img.length > 1 && (
                <>
                  <div
                    className={`swiper-button-next swiper-button-next-${index}`} // 고유 클래스명 부여
                    onClick={(e) => e.stopPropagation()} // 클릭 시 이벤트 전파 방지
                  >
                    <MoveRightIcon />
                  </div>
                  <div
                    className={`swiper-button-prev swiper-button-prev-${index}`} // 고유 클래스명 부여
                    onClick={(e) => e.stopPropagation()} // 클릭 시 이벤트 전파 방지
                  >
                    <MoveRightIcon />
                  </div>
                </>
              )}

              </PhotoArea>

              {/* 좋아요 */}
              <Like>
                <LikeButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(post.post_id);
                    LikeHandler(userId, post.post_id);
                  }}
                >
                  <LikeIcon liked={post.like} />
                </LikeButton>
              </Like>

              <FirstLine>{post.post_text}</FirstLine>
              <SecondLine>
                <div>댓글 {post.comm_cnt ? post.comm_cnt : '0'}개</div>
                <div style={{fontWeight:"400", color:"#676767"}}>{post.last_modified ? formatDate(post.last_modified) : '20xx.xx.xx PM 3:55'}</div>
              </SecondLine>
            </StyledPost>
          </CustomNavigationButton>
        ))
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            textAlign: 'center',
          }}
        >
          게시물이 없습니다
        </div>
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
