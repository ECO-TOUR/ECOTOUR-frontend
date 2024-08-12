import React, { useState } from 'react';
import Switch from 'react-switch';
import profileIcon from '../../assets/profile.svg';
import './Mypage.css'
import Header from '../Main/Header';

const ToggleSwitch = () => {
    const [checked, setChecked] = useState(false);
  
    const handleChange = (nextChecked) => {
      setChecked(nextChecked);
    };
    return (
        <div style={{height:'28px'}}>
            <Switch onChange={handleChange} checked={checked} />
        </div>
      );
    };

const NameTag = (props) => {
    return (
        <div className='nametag'>
            <div className='nametag-area'>
                <img className='profile-icon' src={profileIcon} alt="icon" />
                <div className='text-area'>
                    <div>
                        <span className='nickname'>{props.name ? props.name : '000'}님</span>
                        <span className='first-line'> 안녕하세요!</span>
                    </div>
                    <div className='second-line'>내 정보 수정</div>
                </div>
            </div>
        </div>
    )
}

const PostList = () => {
    return (
        <div className='postList'>
            <div className='postList-area'>
                <div className='post-title'>
                    <div className='title'>내가쓴 글</div>
                    <a href='#'> 더 보기</a>
                </div>
            </div>
        </div>
    )
}

const Settings = () => {
    return (
        <div className='settings'>
            <div className='settings-area'>
                <div className='title'>설정</div>            
                <div className='line'>알림 <ToggleSwitch/></div>
                <div className='line'>다크모드 <ToggleSwitch/></div>
            </div>
        </div>
    )
}

const ServiceManage = () => {
    return (
        <div className='service'>
            <div className='service-area'>
                <div className='title'>서비스 관리</div>
                <div className='line'>공지사항</div>
                <div className='line'>문의</div>
                <div className='line'>로그아웃</div>
                <div className='line'>회원탈퇴</div>
            </div>
        </div>
    )
}

const Mypage = () => {
    return (
        <div>
            <Header />
            <NameTag />
            <PostList />
            <Settings />
            <ServiceManage />
        </div>
    )
}

export default Mypage