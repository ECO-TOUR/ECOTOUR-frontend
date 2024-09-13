import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Switch from 'react-switch';
import Header from '../../component/main/Header';
import Navbar from '../../component/main/Navbar';
import MyPost from '../../component/Mypage/MyPost';

const NameTag = styled.div`
  display: flex;
  padding-left: 24px;
  justify-content: start;
  align-items: center;
  height: 144px;
`;
const TextArea = styled.div`
  margin-left: 10px;
`;
// 프로필 사진
const ProfileIcon = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 50px;
`;
const Nickname = styled.span`
  font-size: x-large;
  font-weight: 600;
`;
const FirstLine = styled.span`
  color: #333;
  font-family: ABeeZee;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
`;
const SecondLine = styled.div`
  margin-top: 6px;
  color: #676767;
  font-family: ABeeZee;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;
const PostList = styled.div`
  padding: 12px 16px;
`;
const PostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 25px;
`;
const Title = styled.div`
  color: #333;
  font-family: ABeeZee;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
`;
const StyledLink = styled.a`
  color: #333;
  text-decoration: none;
  height: 100%;
`;
const Settings = styled.div`
  height: 120px;
  padding: 12px 12px;
`;
const Line = styled.div`
  align-items: center;
  height: 30px;
  max-width: 386px;
  display: flex;
  justify-content: space-between;
  font-size: 19px;
  font-weight: 500;
  margin: 8px 10px 0px 10px;
  cursor: pointer;

  &:hover{
    background-color: gray;
  }
`;
const Service = styled.div`
  height: 200px;
  padding: 12px 12px;
`;
const MypostArea = styled.div`
  height: 100%;
`
const ToggleSwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div style={{ height: '28px' }}>
      <Switch onChange={handleChange} checked={checked} />
    </div>
  );
};
const MypageContainer = styled.div`
  padding-top: 60px;
  padding-bottom: 70px;
  margin: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  max-width: 430px;
  min-width: 320px;
`

const Mypage = (props) => {

  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');
  const access_token = localStorage.getItem('access_token');

  function onClickLogout(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');

    navigate('/');
  }

  // 사용자 정보 가져오는 api
  const [userName, setUserName] = useState();
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    console.log(user_id);
    axios.get(`/mypage/api/${user_id}/inquire`, {
      headers: {
          'Authorization': `Bearer ${access_token}` // 헤더에 access_token 추가
      }
    })
    .then(response => {
        console.log(response.data.content.user);
        setUserName(response.data.content.user.username);
        setUserProfile(response.data.content.user.profile_photo);
      })
    .catch(error => {
    console.error(error);
    });

  }, []);

  return (
    <div>
      <Header pageName = "My Page"/>
      <MypageContainer id="mypage_container">
        <NameTag id='nametag-area'>
          <ProfileIcon src={userProfile}/>
          <TextArea>
            <div>
              <Nickname>{userName}님</Nickname>
              <FirstLine> 안녕하세요!</FirstLine>
            </div>
          </TextArea>
        </NameTag>
        <PostList id='post-area'>
          <PostTitle id='post-title'>
            <Title>내가 쓴 글</Title>
            <StyledLink href="#"> 더 보기</StyledLink>
          </PostTitle>
          <MypostArea>
            <MyPost />
            {/* <MyPostLarge /> */}
          </MypostArea>          
        </PostList>
        <Settings id='settings'>
          <Title id='setting-title'>설정</Title>
          <Line>
            알림 <ToggleSwitch />
          </Line>
          <Line>
            다크모드 <ToggleSwitch />
          </Line>
        </Settings>
        <Service>
          <Title>서비스 관리</Title>
          <Line>공지사항</Line>
          <Line>문의</Line>
          <Line onClick={onClickLogout}>로그아웃</Line>
          <Line>회원탈퇴</Line>
        </Service>
      </MypageContainer>
      <Navbar />
    </div>
  );
};

export default Mypage;
