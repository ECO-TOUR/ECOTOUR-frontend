import React from 'react'
import './Header.css'

const Header = (props) => {
  return (
    <div className='header'>
        <div className='header-area'>
            <div className='header-title'>
                {props.name?props.name:'Header'}
            </div>
        </div>
    </div>
  )
}

export default Header