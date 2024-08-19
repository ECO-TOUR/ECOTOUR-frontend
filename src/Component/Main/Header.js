import React from 'react'
import './Header.css'

const Header = (props) => {
  const headerStyle = {
    color: props.color ? props.color : 'black', // 전달된 color prop이 없으면 기본 색상으로 black 사용
  };
  
  return (
    <div className='header'>
        <div className='header-area'>
            <div className='header-title' style={headerStyle}>
                {props.name?props.name:'Header'}
            </div>
        </div>
    </div>
  )
}

export default Header