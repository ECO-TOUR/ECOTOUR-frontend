import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as S from './Review.style';
import ReviewProfile from '../../assets/review_profile.svg';
import exampleImage from '../../assets/example1.png'; // 이미지 파일을 import

function Review() {
    const { tour_id } = useParams(); // URL에서 tour_id 가져오기
    //const user_id = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');
    const [user_name, setUserName] = useState();
    const [user_profile, setUserProfile] = useState();
    const [contents, setContents] = useState([]);
    const [count, setCount] = useState();
    const [score, setScore] = useState();
    const [images, setImages] = useState([]);

    // 날짜 형식 변경 함수
    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        
        // 날짜 부분 추출
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
    
        // 시간 부분 추출
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        // 12시간 형식으로 변환
        hours = hours % 12;
        hours = hours ? hours : 12; // 0시를 12시로 바꿈
    
        // 최종 형식으로 반환
        return `${year}.${month}.${day} ${ampm} ${hours}:${minutes}`;
    }

    // 데이터 변환 함수(이미지가 배열 문자열로 변환되는 문제 해결 함수)
    function transformData(response) {
        return response.data.map(item => ({
            ...item,
            post_img: JSON.parse(item.post_img) // 이미지 문자열 변수를 배열로 변환
        }));
    }

    useEffect(() => {

        // 관광지 정보 가져오기
        const fetchDetail = async () => {
            try {
              const response = await axios.get(`/api/postbytour/${tour_id}/`);
                const transformedData = transformData(response.data.content); // 데이터 변환
                setCount(response.data.content.count);
                setScore(response.data.content.avg_score);
                setContents(transformedData);
                console.log(response.data.content);
            } catch (error) {
              console.log(error);
            }
          };
      
        fetchDetail(); // 컴포넌트가 마운트될 때 API 호출
    },[]);
  return (
    <div>
        {/* 헤더 */}
        <S.HeaderComponent>
            <S.HeaderTitle>방문자 커뮤니티</S.HeaderTitle>
            <S.ScoreComponent>
                <S.ScoreIcon/><S.Score>{score} ({count})</S.Score>
            </S.ScoreComponent>
            <S.MoreBtn>더보기</S.MoreBtn>
        </S.HeaderComponent>

        {contents.length === 0 ? (<S.None>아직 작성된 방문 리뷰가 없습니다!</S.None>):(
        <>
            {contents.map((content, index) => (
                <S.ReviewComponent>
                    {/* 헤더 */}
                    <S.ReviewHeader>
                        <img src={ReviewProfile}/>
                        <div>
                            <S.ReviewHeaderWrap>
                                <S.Writer>닉네임</S.Writer>
                                <S.ScoreComponent>
                                    <S.ScoreIcon/><S.Score>{content.post_score}</S.Score>
                                </S.ScoreComponent>
                            </S.ReviewHeaderWrap>
                            <S.Date>{formatDateTime(content.last_modified)}</S.Date>
                        </div>
                    </S.ReviewHeader>
                    {/* 사진 */}
                    <S.ImgComponent>
                        {content.post_img.map((image, imgIndex) => (
                            <S.Image key={imgIndex} src={image}/>
                        ))}
                    </S.ImgComponent>
                    {/* 리뷰 */}
                    <S.ReviewText>
                        {content.post_text}
                    </S.ReviewText>
                </S.ReviewComponent>
            ))}
        </>)}
    </div>
  )
}

export default Review