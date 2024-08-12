import React from 'react'
import './Community.css'
import Post from './Post.js'


const Community = () => {
  return (
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
  )
}

export default Community