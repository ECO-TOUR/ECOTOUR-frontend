import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import profileIcon from '../../assets/profile.svg';
import Header from '../../component/Main/Header';
import Navbar from '../../component/Main/Navbar';
import MyPost from './MyPost';
import MyPostLarge from './MyPostLarge';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameTagContainer = styled.div`
  background-color: white;
`;

const NameTagArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 144px;
  padding: 0px 30px 0px 0px;
`;

const TextArea = styled.div`
  margin-left: 10px;
`;

const ProfileIcon = styled.img`
  width: 85px;
  height: 85px;
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

const PostListContainer = styled.div`
  width: 100%;
  background-color: white;
`;

const PostListArea = styled.div`
  height: 250px;
  padding: 12px 12px;
`;

const PostTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const SettingsContainer = styled.div`
  background-color: white;
`;

const SettingsArea = styled.div`
  height: 120px;
  padding: 12px 12px;
`;

const Line = styled.div`
  align-items: center;
  max-width: 360px;
  display: flex;
  justify-content: space-between;
  font-size: 19px;
  font-weight: 500;
  margin-left: 18px;
  margin-top: 10px;
`;

const ServiceContainer = styled.div`
  background-color: white;
`;

const ServiceArea = styled.div`
  height: 200px;
  padding: 12px 12px;
`;

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

const NameTag = (props) => {
  return (
    <NameTagContainer>
      <NameTagArea>
        <ProfileIcon src={profileIcon} alt="icon" />
        <TextArea>
          <div>
            <Nickname>{props.name ? props.name : '000'}님</Nickname>
            <FirstLine> 안녕하세요!</FirstLine>
          </div>
          <SecondLine>내 정보 수정</SecondLine>
        </TextArea>
      </NameTagArea>
    </NameTagContainer>
  );
};

const PostList = () => {
  return (
    <PostListContainer>
      <PostListArea>
        <PostTitleContainer>
          <Title>내가쓴 글</Title>
          <StyledLink href="#"> 더 보기</StyledLink>
        </PostTitleContainer>
        <div>
          {/* <MyPost /> */}
          <MyPostLarge />
        </div>
      </PostListArea>
    </PostListContainer>
  );
};

const Settings = () => {
  return (
    <SettingsContainer>
      <SettingsArea>
        <Title>설정</Title>
        <Line>
          알림 <ToggleSwitch />
        </Line>
        <Line>
          다크모드 <ToggleSwitch />
        </Line>
      </SettingsArea>
    </SettingsContainer>
  );
};

const ServiceManage = () => {
  return (
    <ServiceContainer>
      <ServiceArea>
        <Title>서비스 관리</Title>
        <Line>공지사항</Line>
        <Line>문의</Line>
        <Line>로그아웃</Line>
        <Line>회원탈퇴</Line>
      </ServiceArea>
    </ServiceContainer>
  );
};

const Mypage = () => {
  return (
    <div>
      <Header pageName = "My Page"/>
      <NameTag />
      <PostList />
      <Settings />
      <ServiceManage />
      <Navbar />
    </div>
  );
};

export default Mypage;
