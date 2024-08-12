import React, {useState} from 'react'
import styled from 'styled-components'
import { ReactComponent as AccountIcon } from '../../assets/account.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as ChatIcon } from '../../assets/chat.svg';
import { useNavigate } from 'react-router-dom';

const NavbarArea = styled.div`
  width: 400px;
  height: 80px;
  bottom: 0;
  border-top: 1px solid #D9D9D9;
  padding: 0;
  background-color: white;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.button`
  background: none;
  padding: 0;
  border: none;
  margin-top: 10px;
  width: 44px;
  height: 44px;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    fill: ${props => props.highlight ? '#333333' : (props.color || '#D9D9D9')};
  }
`;

const Navbar = () => {
  const [highlightedItem, setHighlightedItem] = useState('home');
  const navigate = useNavigate();

  const handleNavigation = (item, path) => {
    setHighlightedItem(item);
    navigate(path);
  }

  return (
    <NavbarArea>
      <NavItem 
        highlight={highlightedItem === 'chat'}
        onClick={() => handleNavigation('chat', '/chat')}
      >
        <ChatIcon />
      </NavItem>
      <NavItem
        highlight={highlightedItem === 'search'}
        onClick={() => handleNavigation('search', '/search')}
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
        onClick={() => handleNavigation('heart', '/heart')}
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