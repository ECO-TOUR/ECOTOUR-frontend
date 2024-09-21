import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import Header from '../../component/main/Header.js';
import Navbar from '../../component/main/Navbar.js';
import PostDetail from '../../component/community/Post/PostDetail.js'
import {ReactComponent as SendIcon} from '../../assets/send.svg'
import { useRecoilState } from 'recoil';
import { UserProfile } from '../../recoil/UserProfileAtoms.js';


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
  const userId = localStorage.getItem('user_id')
  const {postId} = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [profile, setProfile] = useRecoilState(UserProfile);

  const fetchPost = async () => {

    try{
      const postResponse = await axios.get(`/community/api/postinquire/${userId}/`, {
        headers: {
          'Cache-Control': 'no-cache',  // 서버나 브라우저에 캐시를 사용하지 않도록 요청
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      setPosts(postResponse.data.content);
      const selectedPost = postResponse.data.content.find(p => p.post_id === Number(postId));
      setPost(selectedPost);
      
      console.log("🚀 ~ selectedPost:", selectedPost)
      
      //댓글 가져오기
      const commentsResponse = await axios.get(`/community/api/commentinquire/${postId}/`)
      setComments(commentsResponse.data.content);
      
      await fetchUserProfile(selectedPost.user_id);
      console.log(profile);
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
  };
  
  const fetchUserProfile = async (userId) => {
    try{
      const response = await axios.get(`/mypage/api/${userId}/inquire`)
      const userProfileData =  response.data.content.user;
      console.log("🚀 ~ fetchUserProfile ~ userProfileData:", userProfileData)
      
      setProfile((prevProfiles) => [
          ...prevProfiles,
          {
          user_id: userProfileData.user_id,
          nickname: userProfileData.nickname,
          profilePhoto: userProfileData.profile_photo
        }]);
    } catch(error) {
      console.error('프로필 업데이트 에러', error);
    }
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
  const handleKeyDown = (e) =>{
    if(e.key == 'Enter'){
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
    }
  }
  
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
            onKeyDown={handleKeyDown}
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