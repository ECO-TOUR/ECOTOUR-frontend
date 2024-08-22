import React from 'react'
import * as S from './Top5.style'
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import Arrow from '../../../assets/agreement_arrow.svg';
import { useNavigate } from 'react-router-dom';

function Top5() {
    const contents = [1, 2, 3, 4, 5];
    
    const navigate = useNavigate();
    function onClickBox(){
        navigate('/detail');
    }

  return (
    <S.Container>
        {contents.map((content, index) => (
            <S.ContentBox onClick={onClickBox}>
                <S.ContentImg src={exampleImage}/>
                <S.ContentNum>{index+1}</S.ContentNum>
                <S.ContentInfo>
                    <S.ContentName>순천만습지</S.ContentName>
                    <S.ContentRegion>전라남도 순천시</S.ContentRegion>
                </S.ContentInfo>
                <S.Arrow src={Arrow}/>
            </S.ContentBox>
        ))}
    </S.Container>
  )
}

export default Top5