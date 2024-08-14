import React from 'react';
import * as S from './Home.style';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// 필요 모듈은 Swiper 패키지의 직접 가져오기 방식으로 변경
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ReactComponent as Banner1 } from '../../assets/banner1.svg';
// 컴포넌트
import Header from './Header';
import Navbar from './Navbar';
import Recommend from './Recommend/Recommend';


function Home() {
  return (
    <S.Container>
      <Header name="ECO TOUR" color="#91EB86" />
      {/* 배너 */}
      <div>
        <S.StyledSwiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={true} // 양쪽 화살표
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]} // 모듈 배열로 전달
        >
          <SwiperSlide>
            <S.BannerContainer>
              <Banner1/>
            </S.BannerContainer>
          </SwiperSlide>

          <SwiperSlide>
            <S.BannerContainer>
              <Banner1/>
            </S.BannerContainer>
          </SwiperSlide>

          <SwiperSlide>
            <S.BannerContainer>
              <Banner1/>
            </S.BannerContainer>
          </SwiperSlide>
        </S.StyledSwiper>
      </div>

      {/* 추천 생태관광지 */}
      <S.ContentHeader>ECO TOUR 추천 생태관광지</S.ContentHeader>
      <S.ContentText>ECO TOUR가 000님에게 추천하는 생태관광지를 확인해 보세요</S.ContentText>
      <Recommend/>

      <S.ContentHeader>이번 달 TOP5 인기 생태관광지</S.ContentHeader>
      <S.ContentText>이번 달에 가장 인기있는 생태관광지를 확인해 보세요</S.ContentText>
      <Navbar />
    </S.Container>
  );
}

export default Home;
