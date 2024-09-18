import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './Community.style';
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import LikeIcon from '../../../assets/white_like.svg'; // 이미지 파일을 import
import ChatIcon from '../../../assets/white_chat.svg'; // 이미지 파일을 import

function Community() {

    const [contents, setContents] = useState([]);
    const navigate = useNavigate();

    // API연결 완료
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/community/api/postbest');
                //console.log(response.data.content);
                setContents(response.data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    function onClickContent(post_id){
        navigate(`/community/post/${post_id}`);
    }
  return (
    <S.Component>
        {contents.map((content, index) => (
            <S.ContentBox onClick={() => onClickContent(content.post_id)}>
                <S.ContentImage src={content.post_img || exampleImage}/>
                <S.ContentDiv>
                    <S.ContentTitle>{content.post_text}</S.ContentTitle>
                    <S.ContentInfo>
                        <img src={LikeIcon}/><S.InfoText>{content.post_likes}</S.InfoText>
                        <img src={ChatIcon}/><S.InfoText>{content.comm_cnt}</S.InfoText>
                    </S.ContentInfo>                    
                </S.ContentDiv>                
            </S.ContentBox>
        ))}
    </S.Component>
  )
}

export default Community