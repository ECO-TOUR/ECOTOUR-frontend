import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as ProfileIcon } from '../../../assets/profile.svg'
import axios from 'axios';

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
    const [profiles, setProfiles] = useState({});

    useEffect(() => {
        const fetchProfile = async (userId) => {
            try{
                const response = await axios.get(`/mypage/api/${userId}/inquire`);
                setProfiles((prevProfiles) => ({
                    ...prevProfiles,
                    [userId]: response.data.profile_photo,  // 응답 데이터에서 프로필 이미지 URL 추출
                }));
            } catch (error) {
                console.error(`유저 ${userId}의 프로필 이미지를 불러오는 중 오류 발생:`, error);
            }
        }
        comments.forEach((comment) => {
            // 이미 프로필이 불러와졌는지 확인하고, 없다면 API 요청을 수행
            if (!profiles[comment.user_id]) {
                fetchProfile(comment.user_id);
            }
        });
    })

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
