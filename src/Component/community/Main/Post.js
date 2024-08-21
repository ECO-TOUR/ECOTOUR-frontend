import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledPost = styled.div`
    margin-top: 16px;
    width: 100%;
    height: calc(100% + 200px);
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 10px;
`;

const PhotoArea = styled.div`
    align-self: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #333333;
`;

const Like = styled.div`
    margin-top: 5px;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    align-self: start;
`;

const FirstLine = styled.div`
    height: 60px;
    width: 100%;
    margin-top: 5px;
    font-size: 12px;
    font-weight: 500;
`;

const SecondLine = styled.div`
    width: 100%;
    margin-top: 5px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
`;
const Comment = styled.div`
    align-self: start;
`;


// Post 컴포넌트 정의
const Post = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // axios.get('http://localhost:8000/community/api/postbest/')
        //   .then(response => {
        //     console.log("🚀 ~ useEffect ~ response:", response)
        //     // setPosts(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error);
        //   });

        // API 데이터가 없는 경우 예시 데이터 사용
        if (posts.length === 0) {
        setPosts([
            { id: 1, title: 'FirstLine', location: 'Locate', content: 'SecondLine', comments: [''] },
            { id: 2, title: 'FirstLine', location: 'Locate', content: 'SecondLine', comments: [''] },
            { id: 3, title: 'FirstLine', location: 'Locate', content: 'SecondLine', comments: [''] },
            { id: 4, title: 'FirstLine', location: 'Locate', content: 'SecondLine', comments: [''] },
            { id: 5, title: 'FirstLine', location: 'Locate', content: 'SecondLine', comments: [''] }
        ]);
        }
  }, [posts]); // posts 배열을 의존성 배열로 설정
          

  return (
    <>
      {posts.map(post => (
        <StyledPost key={post.id}> 
            <PhotoArea />
            <Like>
                <button>asdf</button>
            </Like>
            <FirstLine>
                {post.title}
            </FirstLine>
            <SecondLine>
                <Comment>댓글 {post.comments.length}개</Comment>
                <div>{post.time?post.time:"20xx.xx.xx PM 3:55"}</div>
            </SecondLine>
        </StyledPost>
      ))}
    </>
  );
}

export default Post;
