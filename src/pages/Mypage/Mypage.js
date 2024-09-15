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
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
`;
const SecondLine = styled.div`
  margin-top: 6px;
  color: #676767;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

// 내가 쓴 글 container
const PostList = styled.div`
  padding: 12px 0px;
  margin-top: 10px;
`;

const PostTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 내가 쓴 글, 서비스 관리
const Title = styled.div`
  color: #333;
  font-size: 20px;
  font-weight: 700;
  padding: 0 30px;
  margin-bottom: 20px;
`;

// 더보기
const StyledLink = styled.div`
  color: #333;
  text-decoration: none;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  padding: 0px 30px;
  cursor: pointer;
`;
const Settings = styled.div`
  height: 120px;
  padding: 12px 12px;
`;

// 서비스 관리 div
const Line = styled.div`
  align-items: center;
  height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 19px;
  font-weight: 400;
  cursor: pointer;
  padding: 25px 30px;

  &:hover{
    background-color: #F5F5F5;
  }
`;
const Service = styled.div`
  height: 200px;
  padding: 12px 0px;
  margin-top: 30px;
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

  // 공지사항 클릭 시
  function onClickNotice(){
    navigate('/notice');
  }
  // 문의 클릭 시
  function onClickQna(){
    window.location.href = 'https://open.kakao.com/o/g0raUSNg';
  }

  // 로그아웃 클릭 시
  function onClickLogout(){
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm('정말 로그아웃 하시겠습니까?');
    
    if (isConfirmed) {
        localStorage.removeItem('user_id');
        localStorage.removeItem('access_token');

        window.location.href = '/';  // 'navigate' 대신 'window.location.href'로 변경 가능
    }
  }

  // 회원탈퇴 클릭 시
  function onClickDeleteUser(){
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm('정말 회원탈퇴를 하시겠습니까?');

    if (isConfirmed) {
        axios.post(`/accounts/api/oauth/kakao/signout/`, 
          {},  // 두 번째 인자로 빈 객체를 전송
          { headers: { 'Authorization': `Bearer ${access_token}` } }  // 세 번째 인자로 headers 전달
        )
        .then(response => {
            //console.log(response.data);
            localStorage.removeItem('user_id');
            localStorage.removeItem('access_token');
            navigate('/');
          })
        .catch(error => {
        console.error(error);
        });
    }
    
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
        //console.log('user_data',response.data.content.user);
        setUserName(response.data.content.user.username);
        setUserProfile(response.data.content.user.profile_photo);
      })
    .catch(error => {
    console.error(error);
    });

  }, []);

  return (
    <div>
      <Header pageName="마이페이지"/>
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
            <StyledLink onClick={() => navigate('./../myposts')}>더보기</StyledLink>
          </PostTitle>
          <MypostArea>
            <MyPost />
          </MypostArea>          
        </PostList>
        {/* <Settings id='settings'>
          <Title id='setting-title'>설정</Title>
          <Line>
            알림 <ToggleSwitch />
          </Line>
          <Line>
            다크모드 <ToggleSwitch />
          </Line>
        </Settings> */}
        <Service>
          <Title>서비스 관리</Title>
          <Line onClick={onClickNotice}>공지사항</Line>
          <Line onClick={onClickQna}>문의</Line>
          <Line onClick={onClickLogout}>로그아웃</Line>
          <Line onClick={onClickDeleteUser}>회원탈퇴</Line>
        </Service>
      </MypageContainer>
      <Navbar />
    </div>
  );
};

export default Mypage;
