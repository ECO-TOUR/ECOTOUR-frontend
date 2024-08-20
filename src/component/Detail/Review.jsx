import React from 'react'
import * as S from './Review.style';
import ReviewProfile from '../../assets/review_profile.svg';

function Review() {
    const contents = [1];
  return (
    <div>
        {/* 헤더 */}
        <S.HeaderComponent>
            <S.HeaderTitle>방문자 커뮤니티</S.HeaderTitle>
            <S.ScoreComponent>
                <S.ScoreIcon/><S.Score>9.6 (100)</S.Score>
            </S.ScoreComponent>
            <S.MoreBtn>더보기</S.MoreBtn>
        </S.HeaderComponent>

        {contents.map((content, index) => (
            <S.ReviewComponent>
                {/* 헤더 */}
                <S.ReviewHeader>
                    <img src={ReviewProfile}/>
                </S.ReviewHeader>
            </S.ReviewComponent>
        ))}
    </div>
  )
}

export default Review