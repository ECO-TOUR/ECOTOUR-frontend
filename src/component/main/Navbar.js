import React, {useState} from 'react'
import styled from 'styled-components'
import { ReactComponent as AccountIcon } from '../../assets/account.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ChatIcon } from '../../assets/chat.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { NavAtoms } from '../../recoil/NavAtoms';

const NavbarArea = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 430px;
  height: 70px;
  bottom: 0;
  border-top: 1px solid #D9D9D9;
  background-color: white;
  display: flex;
  justify-content: space-around;
  flex-shrink: 0;  /* 고정 */
  position: fixed;
  bottom: 0;
  z-index: 100;
  left: 50%; /* 화면 중앙에 수평 위치 조정 */
  transform: translateX(-50%); /* 중앙 정렬을 위해 위치 조정 */
`;

const NavItem = styled.button`
  background: none;
  padding: 0;
  border: none;
  margin-top: 15px;
  flex: 1;
  display: flex;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
    fill: ${props => props.highlight ? '#333333' : (props.color || '#D9D9D9')};
  }
`;

const Navbar = () => {
  const [highlightedItem, setHighlightedItem] = useRecoilState(NavAtoms);
  const navigate = useNavigate();

  const handleNavigation = (item, path) => {
    setHighlightedItem(item);
    navigate(path);
  }

  return (
    <NavbarArea>
      <NavItem 
        highlight={highlightedItem === 'chat'}
        onClick={() => handleNavigation('chat', '/community')}
      >
        <ChatIcon />
      </NavItem>
      <NavItem
        highlight={highlightedItem === 'search'}
        onClick={() => handleNavigation('search', '/map-main')}
      >
        <SearchIcon />
      </NavItem>
            <NavItem
        highlight={highlightedItem === 'home'}
        onClick={() => handleNavigation('home', '/main')}
      >
        <HomeIcon />
      </NavItem>
            <NavItem
        highlight={highlightedItem === 'heart'}
        onClick={() => handleNavigation('heart', '/like')}
      >
        <HeartIcon />
      </NavItem>
            <NavItem
        highlight={highlightedItem === 'account'}
        onClick={() => handleNavigation('account', '/mypage')}
      >
        <AccountIcon />
      </NavItem>
    </NavbarArea>
  )
}

export default Navbar
