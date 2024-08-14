import styled from 'styled-components';
import { Swiper } from 'swiper/react';

// 전체
export const Container = styled.div`
    background-color: white;
    height: 100vh;
`;

// 배너
export const StyledSwiper = styled(Swiper)`
    height: 220px;

    .swiper-pagination-bullet {
        background-color: #333333; // 기본 bullet 색상
        opacity: 1 !important; /* 투명도 문제 해결 */
    }

    .swiper-pagination-bullet-active {
        background-color: #91EB86; // 활성화된 bullet 색상
    }

    /* 화살표의 크기와 모양을 조절합니다 */
    .swiper-button-next::after,
    .swiper-button-prev::after {
        font-size: 16px; /* 화살표 아이콘의 크기를 조절합니다 */
        color: #676767; /* 화살표 아이콘 색상 */
    }
`;

// 배너 이미지
export const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

// content 헤더
export const ContentHeader = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-top: 30px;
    padding: 0px 20px;
`;

// content text
export const ContentText = styled.div`
    font-size: 13px;
    font-weight: 400;
    margin-top: 10px;
    padding: 0px 20px;
    color: #676767;
`;
  