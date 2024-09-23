import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import LikeIcon from '../../assets/heart.svg'
import CommentIcon from '../../assets/comment.svg'

const Component = styled.div`
    height: 182px;
    margin: 10px 30px;
    padding-bottom: 10px;
    display: flex;
    overflow-x: hidden;
    user-select: none; /* 텍스트 선택 방지 */
    
    &:hover {
        overflow-x: scroll; /* 호버 시 스크롤 바 표시 */
    }

    &::-webkit-scrollbar {
        height: 8px; /* 스크롤 바 높이 조정 */
        width: 80%;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #cccccc; /* 스크롤 바 색상 */
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f5f5f5; /* 스크롤 바 트랙 색상 */
    }
`;

const ContentBox = styled.div`
    border-radius: 10px;
    border: 1px solid #D9D9D9;
    width: 174px;
    height: 164px;
    flex-shrink: 0;
    margin: 0 5px;
    cursor: pointer;
`;

const ContentImage = styled.img`
    border-radius: 9px 9px 0px 0px;
    width: 172.5px;
    height: 100px;
`;

const ContentName = styled.div`
    font-weight: 600;
    font-size: 15px;
    padding: 7px 9px 4px 9px;
    white-space: nowrap; /* 한 줄로 표시 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임표(...) 표시 */
`;

const ContentRegion = styled.div`
    color: #676767;
    font-size: 12px;
    font-weight: 400;
    padding: 0px 9px;
    white-space: nowrap; /* 한 줄로 표시 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임표(...) 표시 */
`;

const ScoreContainer = styled.div`
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    gap: 5px;
    width:calc(100% - 9px);
`;

const ScoreText = styled.div`
    color: #676767;
    font-size: 11px;
`;

const MoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 20px;
  height: 164px;
  flex-shrink: 0;
  margin: 0 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: default;
`;

function MyPost() {
    const [posts, setPosts] = useState([]);
    const userId = localStorage.getItem('user_id')
    const [placeNames, setPlaceNames ]= useState([]);


    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`/community/api/mypost/${userId}/`);
                // console.log('내 게시글 목록:', response.data);
    
                if (response.data && response.data.content) {
                    setPosts(response.data.content); // 먼저 posts 상태를 업데이트합니다.
                } else {
                    console.error('Error: "content" field is missing in the response.');
                }
            } catch (error) {
                console.error('Error 내 게시글 목록:', error);
            }
        };
    
        getPost();

    }, [userId]);

    useEffect(() => {
        const getPlaceNames = async () => {
            const placeNamesArray = await Promise.all(posts.map(async (data) => {
                try {
                    const placeResponse = await axios.get(`/place/detail/${data.tour_id}/${userId}/`);
                    return placeResponse.data.place_detail.tour_name;
                } catch (error) {
                    console.error('Error fetching place name:', error);
                    return 'Unknown place'; // 기본 장소 이름
                }
            }));
            setPlaceNames(placeNamesArray); // placeName 상태 업데이트
        };
    
        if (posts.length > 0) {
            getPlaceNames(); // posts가 있을 때만 placeName을 가져옵니다.
        }
    }, [posts, userId]);

    const navigate = useNavigate();

    const onClickBox = (id) => {
        navigate(`/community/post/${id}`);
    };
    


    return (
        <Component id="component">
        {posts.length > 0 ? (
        <>
            {posts.slice(0, 5).map((content, index) => (
                <ContentBox key={content.post_id} onClick={() => onClickBox(content.post_id)}>
                <ContentImage src={content.post_img[0]} />
                <ContentName>{content.post_text}</ContentName>
                <ContentRegion>{placeNames[index]}</ContentRegion>
                <ScoreContainer>
                    <img src={LikeIcon} alt="like" width="12px" height="12px" color="red" />
                    <ScoreText>{content.post_likes}</ScoreText>
                    <img src={CommentIcon} alt="comment" width="12px" height="12px" />
                    <ScoreText>{content.comm_cnt}</ScoreText>
                </ScoreContainer>
                </ContentBox>
            ))}
            {posts.length > 5 && <MoreBox>...</MoreBox>} {/* 5개 이상일 경우 "..." 표시 */}
        </>
            ):(<div>아직 게시글이 없습니다.</div>)}
        </Component>
    );
}

export default MyPost;
