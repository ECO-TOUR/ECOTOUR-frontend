import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import Header from '../../component/main/Header.js';
import Navbar from '../../component/main/Navbar.js';
import PostDetail from '../../component/community/Post/PostDetail.js'
import {ReactComponent as SendIcon} from '../../assets/send.svg'

const PostContainer = styled.div`
  padding-top: 60px;
  padding-bottom: 125px;
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
const CommentBarArea = styled.div`
  position: fixed;
  align-self:center;
  bottom: 70px;
  width: 100%;
  height: 55px;
  align-self: center;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.07);
`
const CommentBar = styled.input`
    width: calc(100% - 32px);
    min-width: calc(var(--mim-width) - 32px);
    height: 40px;
    align-self: center;
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    color: #333333;
    font-weight: 400;
    font-size: 13px;
    box-sizing: border-box;
`;
const SendButton = styled.button`
  position: absolute;
  right: 10px;
  top: 1px;
  width: 55px;
  height: 55px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  svg{
    width: 22px;
    height: 22px;
    fill: #555555;
  }
`;


const Post = () => {
  const userId = 1;
  const {postId} = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  const fetchPost = () => {
    axios.get(`/community/api/postinquire/${userId}/`)
      .then(response => {
        setPosts(response.data.content); 
        const selectedPost = response.data.content.find(p => p.post_id === Number(postId));
        setPost(selectedPost);
        console.log('se',selectedPost);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      
    //댓글 가져오기
    axios.get(`/community/api/commentinquire/${postId}/`)
      .then(response => {
        setComments(response.data.content);
        console.log('받은 댓글',response.data.content)
      })
      .catch(error => {
        console.error('Error fetching data(comments):', error)
      })
    
  };
  
  useEffect(() => {
    fetchPost();  // 컴포넌트 마운트 시 데이터 가져오기
  }, [postId, userId]);

  //댓글 달기
  const handleCommentSubmit = () => {
    axios.post('/community/api/commentwrite/', {
      'post_id': postId,
      'user_id': userId,
      'comments': commentText,
    }).then(response => {
      console.log('댓글 달기 성공:', response.data);
      setCommentText('');
      fetchPost();
      
    }).catch(error => {
      console.error("Error submitting comment: ", error);
    })

  };
  
  return (
    <>
        <Header pageName="게시판" />
        <PostContainer id='community-container'>
          <PostDetail post = {post} comments={comments} />
        </PostContainer>
        <CommentBarArea id='comment-bar-area'>
          <CommentBar 
            id='comment-bar' 
            type="text" 
            placeholder="댓글 입력"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}  
          ></CommentBar>
          <SendButton onClick={handleCommentSubmit}>
            <SendIcon width="24px" height="24px"></SendIcon>
          </SendButton>
        </CommentBarArea>
        <Navbar />
    </>
  )
}

export default Post