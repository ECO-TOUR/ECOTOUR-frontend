import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import LikeIcon from '../../assets/heart.svg'
import CommentIcon from '../../assets/comment.svg'

const Component = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 3px;
`;

const ContentBox = styled.div`
    border-radius: 10px;
    border: 1px solid #D9D9D9;
    width: 48.5%;
    aspect-ratio: 1/1.35;
    flex-shrink: 0;
    margin: 0;
    margin-top: 5px;
    cursor: pointer;
`;

const ContentImage = styled.img`
    border-radius: 9px 9px 0px 0px;
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
`;

const ContentName = styled.div`
    font-weight: 600;
    height: 10%;
    font-size: 15px;
    padding: 2px 0px 0px 9px;
`;

const ContentRegion = styled.div`
    height: 10%;
    color: #676767;
    font-size: 12px;
    font-weight: 400;
    padding: 2px 0px 0px 9px;
        white-space: nowrap; /* 한 줄로 표시 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임표(...) 표시 */
`;

const ScoreContainer = styled.div`
    height: 5%;
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

function MyPostLarge() {
    const [posts, setPosts] = useState([]);
    const userId = localStorage.getItem('user_id')
    const [placeNames, setPlaceNames ]= useState([]);

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`/community/api/mypost/${userId}/`);
                console.log('내 게시글 목록:', response.data);
    
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
        <Component id='component'>
            {posts.length > 0 ?(
                posts.map((content, index) => (
                    <ContentBox key={content.post_id} onClick={() => onClickBox(content.post_id)}>
                        <ContentImage src={content.post_img[0]} />
                        <ContentName>{content.post_text}</ContentName>
                        <ContentRegion>{placeNames[index]}</ContentRegion>
                        <ScoreContainer>
                            <img src={LikeIcon} alt="like" width="12px" height="12px" color='red'/>
                            <ScoreText>{content.post_likes}</ScoreText>
                            <img src={CommentIcon} alt="like" width="12px" height="12px" color='red'/>
                            <ScoreText>{content.comm_cnt}</ScoreText>
                        </ScoreContainer>
                    </ContentBox>
                ))
            ):(<div>아직 게시글이 없습니다.</div>)}
        </Component>
    );
}

export default MyPostLarge;
