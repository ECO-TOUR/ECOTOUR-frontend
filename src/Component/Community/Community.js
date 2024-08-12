import React from 'react'
import './Community.css'
import Post from './Post.js'
import Header from '../Main/Header.js'
import Navbar from '../Main/Navbar.js'
const Community = () => {
  return (
    <>
    <Header/>
    <div className='community'>
        <div className='community-area'>
            <input className='searchbar' type='text' placeholder='검색'></input>
            <div className='post-area'>
                <div className='title'>전체 게시글</div>
                <Post/>
                <Post/>
            </div>
        </div>
        <div className='add-post'>
          <button className="button-3" role="button">+</button>
        </div>
    </div>
    <Navbar></Navbar>
    </>
  )
}

export default Community