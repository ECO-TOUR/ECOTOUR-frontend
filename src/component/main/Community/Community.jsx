import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './Community.style';
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import LikeIcon from '../../../assets/white_like.svg'; // 이미지 파일을 import
import ChatIcon from '../../../assets/white_chat.svg'; // 이미지 파일을 import

function Community() {

    const [contents, setContents] = useState([]);

    // API연결 완료
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/community/api/postbest');
                console.log(response.data);
                setContents(response.data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
  return (
    <S.Component>
        {contents.map((content, index) => (
            <S.ContentBox>
                <S.ContentImage src={exampleImage}/>
                <S.ContentDiv>
                    <S.ContentTitle>여기 정말 재미있었어요! 하하하하</S.ContentTitle>
                    <S.ContentInfo>
                        <img src={LikeIcon}/><S.InfoText>20</S.InfoText>
                        <img src={ChatIcon}/><S.InfoText>5</S.InfoText>
                    </S.ContentInfo>                    
                </S.ContentDiv>                
            </S.ContentBox>
        ))}
    </S.Component>
  )
}

export default Community