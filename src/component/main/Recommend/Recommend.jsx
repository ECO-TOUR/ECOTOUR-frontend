import React, {useState, useEffect} from 'react'
import * as S from './Recommend.style'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Recommend() {

  const user_id = localStorage.getItem('user_id');
  const access_token = localStorage.getItem('access_token');
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();

  // API 연결
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`mainpage/api/recommend/${user_id}/`,{
              headers: {
                'Authorization': `Bearer ${access_token}` // 헤더에 access_token 추가
              }
            });
            setContents(response.data.content);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
  }, []);

  function onClickBox(tour_id){
    navigate(`/detail/${tour_id}`);
  }

  // 지역 길이 파싱
  const regionParsing = (text) => {
    if (typeof text === 'string') { // text가 문자열인지 확인
      const parts = text.split(' ');
      if (parts.length > 2) {
          // 두 번째 공백까지의 텍스트를 포함
          return `${parts[0]} ${parts[1]}`;
      }
      return text;
    }
    return ''; // text가 문자열이 아닐 경우 빈 문자열 반환
  };
  
  return (
    <S.Component>
        {contents.map((content, index) => (
            <S.ContentBox onClick={() => onClickBox(content.tour_id)}>
                <S.ContentImage src={content.tour_img}/>
                <S.ContentName>{content.tour_name}</S.ContentName>
                <S.ContentRegion>{regionParsing(content.tour_location)}</S.ContentRegion>
                <S.ScoreContainer>
                    <S.ScoreIcon/>
                    <S.ScoreText>{content.score}</S.ScoreText>
                </S.ScoreContainer>
            </S.ContentBox>
        ))}
    </S.Component>
  )
}

export default Recommend