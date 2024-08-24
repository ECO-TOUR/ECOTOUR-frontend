import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import exampleImage from '../../../assets/example2.jpg';

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
    background-image: url(${props => props.img});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    align-self: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #333333;
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
      fill={liked ? "#91EB86" : "none"}
      stroke={liked ? "#91EB86" : "#333"}
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 8.5C22 5.46243 19.5376 3 16.5 3C14.7819 3.05354 13.1586 3.80024 12 5.07C10.8414 3.80024 9.2181 3.05354 7.5 3C4.46243 3 2 5.46243 2 8.5C2 12.42 6.75 16.75 9 19L11.28 21.28C11.4205 21.4207 11.6112 21.4998 11.81 21.5H12.19C12.3888 21.4998 12.5795 21.4207 12.72 21.28L15 19C17.25 16.75 22 12.42 22 8.5Z"
        fill={liked ? "#91EB86" : "none"}
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


// Post 컴포넌트 정의
const Post = () => {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth > 430 ? 430 : window.innerWidth);

    useEffect(() => {
        //사이즈에 따라 게시물 크기 변경
        const handleResize = () =>{
            const updateWidth = window.innerWidth > 430 ? 430 : window.innerWidth;
            setWindowWidth(updateWidth);
        };

        window.addEventListener('resize', handleResize);
        
        //게시물 정보 받아오기
        axios.get('http://localhost:8000/community/api/postinquire/')
          .then(response => {
            setPosts(response.data.content);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        
        console.log(posts);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
  }, []); 

  const toggleLike = id => {
    setLikedPosts(prevLikedPosts => ({
        ...prevLikedPosts,
        [id]: !prevLikedPosts[id]
    }));
  };

  return (
    <>
      {posts.map(post => (
        <StyledPost key={post.post_id} id='post' width={windowWidth}> 
            <PhotoArea img = {post.post_img?post.post_img:exampleImage}/>
            <Like>
                <LikeButton onClick={() => toggleLike(post.post_id)}>
                    <LikeIcon liked={likedPosts[post.post_id]} />
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
      ))}
    </>
  );
}

export default Post;


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