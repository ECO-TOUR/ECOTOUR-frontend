import styled from 'styled-components';

// 헤더
export const HeaderComponent = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #D9D9D9;
    width: 380px;
    padding: 25px 0px;
`;

// 방문자 커뮤니티
export const HeaderTitle = styled.div`
    font-size: 22px;
    font-weight: 700;
    margin-left: 7px;
`;

// 평점 컴포넌트
export const ScoreComponent = styled.div`   
    display: flex;
    align-items: center;
    padding: 0px 100px 0px 0px;
`;

// 평점 아이콘
export const ScoreIcon = styled.div`
    width: 7px;
    height: 7px;
    background-color: #91EB86;
    border-radius: 30px;
    margin-right: 7px;
`;

// 점수 text
export const Score = styled.div`
    color: #676767;
    font-size: 13px;
`;

// 더보기 버튼
export const MoreBtn = styled.div`
    color: #333333;
    font-size: 13px;
    font-weight: 800;
    margin-right: 10px;
`;

// 리뷰 컴포넌트
export const ReviewComponent = styled.div`
    border-bottom: 1px solid #D9D9D9;
    width: 380px;
    padding: 20px 10px;
`;

export const ReviewHeader = styled.div`
    display: flex;
`;