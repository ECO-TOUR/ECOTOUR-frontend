import React from 'react'
import * as S from './Community.style';
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import LikeIcon from '../../../assets/white_like.svg'; // 이미지 파일을 import
import ChatIcon from '../../../assets/white_chat.svg'; // 이미지 파일을 import

function Community() {

    const contents = [1, 2, 3, 4];
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