import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Post 컴포넌트 정의
function Post() {
    // posts 상태 변수를 정의하고 초기값을 빈 배열로 설정
    const [posts, setPosts] = useState([]);
  
    // 컴포넌트가 마운트될 때 실행되는 useEffect 훅
    // useEffect(() => {
    //   // axios를 사용하여 GET 요청을 보내고 데이터 가져오기
    //   axios.get('http://localhost:8000/api/posts/')
    //     .then(response => {
    //       // 요청이 성공하면 response.data를 posts 상태로 설정
    //       setPosts(response.data);
    //     })
    //     .catch(error => {
    //       // 요청이 실패하면 에러를 콘솔에 출력
    //       console.error('Error fetching data:', error);
    //     });
    // }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때만 실행되도록 설정
  

    return(
    <div className='post'>
        <div className='photo-area'></div>
        <div className='first-line'>
            <div>이미지</div>
            <div>위치</div>
        </div>
        <div className='second-line'>
            {posts.map(post => (
            // 각 리스트 항목에 고유한 키 값으로 post.id 사용
            <li key={post.id}>{post.title}</li>
            ))}   
        </div>
        <div className='third-line'>댓글 1개</div>
    </div>
    )
}

export default Post