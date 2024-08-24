import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ProfileIcon } from '../../../assets/profile.svg'

const CommentContainer = styled.div`
    height: 40px;
    display: flex;
    align-items: center;

    svg{
        width: 26px;
        height: 26px;
    }
`;
const CommentText = styled.div`
    padding-left: 5px;
    display: flex;
    align-items: center;
`;
const Comment = ({comments}) => {
  return (
    <>
        {comments.map((comment, index) => (
            <CommentContainer key ={index}>
                <ProfileIcon />
                <CommentText>{comment.text}</CommentText>
            </CommentContainer>
        ))} 
    </>
    );
};

export default Comment
