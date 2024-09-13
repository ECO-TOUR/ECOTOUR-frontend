import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as S from './Review.style';
import ReviewProfile from '../../assets/review_profile.svg';
import exampleImage from '../../assets/example1.png'; // 이미지 파일을 import

function Review() {
    const { tour_id } = useParams(); // URL에서 tour_id 가져오기
    const [contents, setContents] = useState([]);
    const [count, setCount] = useState();
    const [score, setScore] = useState();
    const images = [1, 2, 3];

    useEffect(() => {
        // 관광지 정보 가져오기
        const fetchDetail = async () => {
            try {
              const response = await axios.get(`/api/postbytour/${tour_id}/`);
                setCount(response.data.content.avg_score);
                setScore(response.data.content.count);
                setContents(response.data.content.data);
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
                                    <S.ScoreIcon/><S.Score>9.6 (100)</S.Score>
                                </S.ScoreComponent>
                            </S.ReviewHeaderWrap>
                            <S.Date>2024.05.05 PM 3:55</S.Date>
                        </div>
                    </S.ReviewHeader>
                    {/* 사진 */}
                    <S.ImgComponent>
                        {images.map((images, index) => (
                            <S.Image src={exampleImage}/>
                        ))}
                    </S.ImgComponent>
                    {/* 리뷰 */}
                    <S.ReviewText>
                        커뮤니티 작성 글 내용 2줄까지만 글 보여지도록 하고 누르면 글 상세페이지로 이동하도록 구현
                    </S.ReviewText>
                </S.ReviewComponent>
            ))}
        </>)}
    </div>
  )
}

export default Review