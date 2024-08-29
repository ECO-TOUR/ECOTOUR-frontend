import React from 'react'
import styled from 'styled-components'

const StyledComentBar = styled.input`
    width: calc(100% - 32px);
    min-width: calc(var(--mim-width) - 32px);
    height: 40px;
    align-self: center;
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    color: #333333;
    font-weight: 400;
    font-size: 13px;
    box-sizing: border-box;
`;
const CommentBar = () => {
  return (
    <StyledComentBar id='coment-bar' type="text" placeholder="댓글 입력" ></StyledComentBar>
  )
}

export default CommentBar