import styled from 'styled-components';

// 헤더
export const HeaderComponent = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #D9D9D9;
    width: 380px;
    padding: 25px 0px;
    margin: 0 auto;
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
    margin-left: 10px;
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

// 리뷰작성 버튼
export const MoreBtn = styled.div`
    color: #676767;
    font-size: 12px;
    font-weight: 400;
    margin-left: auto;
    margin-right: 15px;
    cursor: pointer;
`;

// 리뷰 컴포넌트
export const ReviewComponent = styled.div`
    border-bottom: 1px solid #D9D9D9;
    padding: 25px 0px 25px 35px;
    margin: 0 auto;
    cursor: pointer;
`;

export const ReviewHeader = styled.div`
    display: flex;
`;

export const ReviewHeaderWrap = styled.div`
    display: flex;
`;

// 닉네임
export const Writer = styled.div`
    color: #333333;
    margin-left: 20px;
    font-weight: 600;
    font-size: 16px;
`;

// 프로필
export const Profile = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 30px;
`;

// 작성일
export const Date = styled.div`
    color: #676767;
    font-size: 12px;
    font-weight: 400;
    margin-left: 20px;
    margin-top: 7px;
`;

// 사진 컴포넌트
export const ImgComponent = styled.div`
    padding: 15px 0px;
    display: flex;
    overflow-x: hidden;
    margin-bottom: 10px;

    &:hover {
        overflow-x: scroll; /* 호버 시 스크롤 바 표시 */
    }

    &::-webkit-scrollbar {
        height: 8px; /* 스크롤 바 높이 조정 */
        width: 80%;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #cccccc; /* 스크롤 바 색상 */
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f5f5f5; /* 스크롤 바 트랙 색상 */
    }
`;

// 사진
export const Image = styled.img`
    width: 191px;
    height: 150px;
    margin-right: 22px;
    border-radius: 10px;
`;

// 리뷰 내용
export const ReviewText = styled.div`
    font-size: 13px;
    font-weight: 400;
    display: -webkit-box; /* Flexbox와 유사한 CSS box layout */
    -webkit-line-clamp: 2; /* 표시할 최대 줄 수 */
    -webkit-box-orient: vertical; /* 상자 방향을 수직으로 설정 */
    overflow: hidden; /* 넘치는 텍스트를 숨김 */
    text-overflow: ellipsis; /* 넘치는 텍스트에 '...' 추가 */
    line-height: 1.5; /* 줄 간격 설정 */
    padding: 0px 30px 0px 0px;
`;

// 리뷰 없을 때 문구
export const None = styled.div`
    text-align: center;
    color: #333333;
    font-size: 18px;
    font-weight: 600;
    padding: 50px 0px;
`;