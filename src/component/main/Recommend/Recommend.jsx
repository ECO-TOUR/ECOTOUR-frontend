import React, {useState, useEffect} from 'react'
import * as S from './Recommend.style'
import axios from 'axios';
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import { useNavigate } from 'react-router-dom';

function Recommend() {

  const user_id = localStorage.getItem('user_id');
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();

  // API 연결
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/recommend/${user_id}`);
            setContents(response.data.content);
            console.log(response);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    };

    fetchData();
  }, []);

  function onClickBox(){
    navigate('/detail');
  }
  
  return (
    <S.Component>
        {contents.map((content, index) => (
            <S.ContentBox onClick={onClickBox}>
                <S.ContentImage src={exampleImage}/>
                <S.ContentName>순천만습지</S.ContentName>
                <S.ContentRegion>전라남도 순천시</S.ContentRegion>
                <S.ScoreContainer>
                    <S.ScoreIcon/>
                    <S.ScoreText>9.6 (100)</S.ScoreText>
                </S.ScoreContainer>
            </S.ContentBox>
        ))}
    </S.Component>
  )
}

export default Recommend