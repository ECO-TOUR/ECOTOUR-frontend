import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Switch from 'react-switch';
import Header from '../../component/main/Header';
import Navbar from '../../component/main/Navbar';
import MyPost from '../../component/Mypage/MyPost';
import Notice from './Notice/Notice';

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

// 팝업 스타일
const PopupContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  z-index: 1001;
  position: fixed;  /* 화면에 고정 */
  top: 50%;         /* 화면 상단에서 50% */
  left: 50%;        /* 화면 왼쪽에서 50% */
  transform: translate(-50%, -50%);  /* 팝업을 정확히 중앙으로 */
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

//팝업 스타일
const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 70%;
  height: 15%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;
const NotificationText = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  align-content: center;
  text-align: center;
`;
const ButtonArea = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
`;
const ConfirmButton = styled.button`
  background-color: #4caf50;
  color: white;
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const Mypage = (props) => {

  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');
  const access_token = localStorage.getItem('access_token');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
  const [popupType, setPopupType] = useState(''); // 팝업의 타입 ('logout' or 'deleteUser')

  // 공지사항 클릭 시
  function onClickNotice(){
    navigate('/notice');
  }
  // 문의 클릭 시
  function onClickQna(){
    window.location.href = 'https://open.kakao.com/o/g0raUSNg';
  }

  // 로그아웃 실행 함수
  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    navigate('/');
  };

  // 회원탈퇴 실행 함수
  const handleDeleteUser = () => {
    axios
      .post(`/accounts/api/oauth/kakao/signout/`, 
        {},// 두 번째 인자로 빈 객체를 전송
        { headers: { Authorization: `Bearer ${access_token}` } }// 세 번째 인자로 headers 전달
      )
      .then((response) => {
        //console.log(response.data);
        localStorage.removeItem('user_id');
        localStorage.removeItem('access_token');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleOpenPopup = (type) => {
    setPopupType(type);
    setIsPopupOpen(true); // 팝업 열기
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  // 사용자 정보 가져오는 api
  const [userName, setUserName] = useState();
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {

    axios.get(`/mypage/api/${user_id}/inquire`)
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
          <Line onClick={() => handleOpenPopup('logout')}>로그아웃</Line>
          <Line onClick={() => handleOpenPopup('deleteUser')}>회원탈퇴</Line>
        </Service>
      </MypageContainer>
      <Navbar />

      {/* 팝업창 */}
      <PopupContainer id='popup-area' show={isPopupOpen} >
        <PopupContent>
          <NotificationText>{popupType === 'logout'
              ? '정말 로그아웃 하시겠습니까?'
              : '정말 회원탈퇴를 하시겠습니까?'}</NotificationText>
          <ButtonArea>
            <ConfirmButton
              onClick={popupType === 'logout' ? handleLogout : handleDeleteUser}
            >
              확인
            </ConfirmButton>
            <CloseButton onClick={() => handleClosePopup()}>취소</CloseButton>
          </ButtonArea>
        </PopupContent>
      </PopupContainer>
    </div>
  );
};

export default Mypage;
