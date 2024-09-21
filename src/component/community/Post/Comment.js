import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as ProfileIcon } from '../../../assets/profile.svg'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { UserProfile } from '../../../recoil/UserProfileAtoms';

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
`;
const ProfilePhoto = styled.img`
    width: 26px;
    height: 26px;
    border-radius: 15px;
`;

const Comment = ({comments}) => {
    const [profiles, setProfiles] = useRecoilState(UserProfile);

    useEffect(() => {
        const fetchProfile = async (userId) => {
            try {
                const response = await axios.get(`/mypage/api/${userId}/inquire`);
                const userProfileData = response.data.content.user;
                // console.log('프로필 받은 데이터', userProfileData);

                // 응답에서 받은 프로필 데이터를 profiles 배열에 추가
                setProfiles((prevProfiles) => [
                    ...prevProfiles,
                    {
                        userId: userProfileData.user_id,
                        nickname: userProfileData.nickname,
                        profilePhoto: userProfileData.profile_photo,
                    },
                ]);
            } catch (error) {
                console.error(`유저 ${userId}의 프로필 이미지를 불러오는 중 오류 발생:`, error);
            }
        };

        // 댓글을 작성한 유저의 프로필 정보가 profiles에 없을 때만 API 호출
        comments.forEach((comment) => {
            const userProfileExists = profiles.some((profile) => profile.userId === comment.user_id);
            if (!userProfileExists) {
                fetchProfile(comment.user_id);
            }
        });
    }, [comments, profiles, setProfiles]);
    return (  
    <>
        {comments.length > 0 ? (
            comments.map((comment, index) => {
                const userProfile = profiles.find((profile) => profile.userId === comment.user_id)
                return (
                    <CommentContainer key ={index}>
                        {userProfile?(
                            <ProfilePhoto src={userProfile.profilePhoto} />
                        ):(
                            <ProfileIcon />
                        )}
                        <CommentText>{comment.comments}</CommentText>
                    </CommentContainer>
                );
            })
        ) : (
            <NoCommets>댓글이 없습니다.</NoCommets>
        ) }
    </>
    );
};

export default Comment
