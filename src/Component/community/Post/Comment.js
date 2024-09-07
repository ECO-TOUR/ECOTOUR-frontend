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
    padding-left: 10px;
    display: flex;
    align-items: center;
`;

const NoCommets = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
`

const Comment = ({comments}) => {
  return (
    <>
        {comments.length > 0 ? (
            comments.map((comment, index) => (
                <CommentContainer key ={index}>
                    <ProfileIcon />
                    <CommentText>{comment.comments}</CommentText>
                </CommentContainer>
            ))
        ) : (
            <NoCommets>댓글이 없습니다.</NoCommets>
        ) }
    </>
    );
};

export default Comment
