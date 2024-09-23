import React from 'react';
import * as S from './Home.style';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// 필요 모듈은 Swiper 패키지의 직접 가져오기 방식으로 변경
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// img
import { ReactComponent as Banner1 } from '../../assets/banner1.svg';
import { ReactComponent as Banner2 } from '../../assets/banner2.svg';
import { ReactComponent as Banner3 } from '../../assets/banner3.svg';
import { ReactComponent as UpIcon } from '../../assets/up_icon.svg';
// 컴포넌트
import Navbar from '../../component/main/Navbar';
import Recommend from '../../component/main/Recommend/Recommend';
import Top5 from '../../component/main/Top5/Top5';
import Community from '../../component/main/Community/Community';

function Home() {

  // 스크롤 함수
  const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });  
  };

  return (
    <S.Container>
      <S.Header>ECO TOUR</S.Header>
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
            <a href="https://languid-gateway-421.notion.site/ECO-TOUR-4da99f0989c94f28b664eea86a5d268e?pvs=4" target="_blank" rel="noopener noreferrer">
              <Banner1 />
            </a>
            </S.BannerContainer>
          </SwiperSlide>

          <SwiperSlide>
            <S.BannerContainer>
            <a href="https://open.kakao.com/o/g0raUSNg" target="_blank" rel="noopener noreferrer">
              <Banner2 />
            </a>
            </S.BannerContainer>
          </SwiperSlide>

          <SwiperSlide>
            <S.BannerContainer>
            <a href="https://languid-gateway-421.notion.site/ECO-TOUR-3ade7c8b0e6f4b65bb7b92fe4a2cb442?pvs=4" target="_blank" rel="noopener noreferrer">
              <Banner3 />
            </a>
            </S.BannerContainer>
          </SwiperSlide>
        </S.StyledSwiper>
      </div>

      {/* 추천 생태관광지 */}
      <S.ContentHeader>ECO TOUR 추천 생태관광지</S.ContentHeader>
      <S.ContentText>ECO TOUR가 {localStorage.getItem('nickname')}님에게 추천하는 생태관광지를 확인해 보세요</S.ContentText>
      <Recommend/>

      {/* top5 생태관광지 */}
      <S.ContentHeader>이번 달 TOP5 인기 생태관광지</S.ContentHeader>
      <S.ContentText>이번 달에 가장 인기있는 생태관광지를 확인해 보세요</S.ContentText>
      <Top5/>

      {/* 인기게시글 */}
      <S.ContentHeader>인기 있는 게시글</S.ContentHeader>
      <S.ContentText>지금 인기있는 커뮤니티 게시글을 확인해 보세요</S.ContentText>
      <Community/>

      <S.UpImg>
        <UpIcon onClick={scrollToTop}/>
      </S.UpImg>

      <Navbar />
    </S.Container>
  );
}

export default Home;
