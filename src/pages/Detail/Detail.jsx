import React, { useState, useEffect, useRef } from 'react'
import * as S from './Detail.style';
// 컴포넌트
import Header from '../../component/Main/Header';
import Map from '../../component/Detail/DetailMap';
import Review from '../../component/Detail/Review';
import Nav from '../../component/Main/Navbar';
// img
import { ReactComponent as BackBtn } from '../../assets/back_btn.svg';
import EmptyHeart from '../../assets/empty_heart.svg';
import FillHeart from '../../assets/click_heart.svg';
import ShareIcon from '../../assets/share_icon.svg';
import exampleImage from '../../assets/example1.png'; // 이미지 파일을 import
import { ReactComponent as UpIcon } from '../../assets/up_icon.svg';

function Detail() {
    // 스크롤 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });  
    };

    // 지도 마커 표시 주소 변수
    const[address, setAddress] = useState("충청북도 단양군 단양읍 고수동굴길 8");
    // 관광지 이름
    const [title, setTitle] = useState("단양고수동굴");

    const mainImage = document.querySelector('.MainImg');
    const mainImgRef = useRef();

    // 좋아요 상태 변수
    const [liked, setLiked] = useState(false);
    // 버튼 클릭 시 호출되는 함수: 상태를 토글
    const toggleLike = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        // 카카오톡 sdk 추가
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const shareToKatalk = () => {
        // 이미지 URL이 존재하는지 확인
        const imageUrl = mainImgRef.current ? mainImgRef.current.src : '';
        console.log(imageUrl);
        // kakao sdk script 부른 후 window.Kakao로 접근
        if (window.Kakao) {
          const kakao = window.Kakao;
    
          // 중복 initialization 방지
          // 카카오에서 제공하는 javascript key를 이용하여 initialize
          if (!kakao.isInitialized()) {
            kakao.init("e2615a5b9086f44b29fc393b782e4f29");
          }
    
          kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: `${title}에 대해 더 자세히 보고싶다면?`,
                imageUrl: imageUrl,
                link: {
                    webUrl: window.location.href,
                },
            },
            buttons: [
                {
                    title: '자세히 보러가기',
                    link: {
                    webUrl: window.location.href,
                    },
                },
                ],
            });
        }
      };

  return (
    <S.Container>
        {/* 헤더 */}
        <S.HeaderComponent>
            <S.BackBtn onClick={() => window.history.back()}>
                <BackBtn/>
            </S.BackBtn>
            <S.Header>ECO TOUR</S.Header>
        </S.HeaderComponent>

        <S.MainImg src={exampleImage} ref={mainImgRef}/>
        <S.TitleComponent>
            <S.Title>{title}</S.Title>
            <S.IconBox>
                <S.IconImg src={liked ? FillHeart : EmptyHeart} onClick={toggleLike}/>
                <S.IconImg src={ShareIcon} onClick={shareToKatalk}/>
            </S.IconBox>
        </S.TitleComponent>

        {/* 지도(위치) */}
        <S.Address>{address}</S.Address>
        <Map address={address}/>
        <S.Line/>

        {/* 관광지 정보 */}
        <S.InfoComponent>
            <S.InfoHeader>
                <S.InfoIcon/>
                <S.InfoTitle>개장일</S.InfoTitle>
            </S.InfoHeader>
            <S.InfoText>
                    하절기(4월~10월) 09:00~18:30, 동절기(11월~3월) 09:00~18:00 ※ 퇴장 1시간전입장마감
            </S.InfoText>
        </S.InfoComponent>

        <S.InfoBox>
            <S.InfoComponent>
                <S.InfoHeader>
                    <S.InfoIcon/>
                    <S.InfoTitle>휴무일</S.InfoTitle>
                </S.InfoHeader>
                <S.InfoText>
                        연중무휴
                </S.InfoText>
            </S.InfoComponent>
            <S.InfoComponent>
                <S.InfoHeader>
                    <S.InfoIcon/>
                    <S.InfoTitle>화장실</S.InfoTitle>
                </S.InfoHeader>
                <S.InfoText>
                        있음
                </S.InfoText>
            </S.InfoComponent>
        </S.InfoBox>

        <S.InfoBox>
            <S.InfoComponent>
                <S.InfoHeader>
                    <S.InfoIcon/>
                    <S.InfoTitle>관련 홈페이지</S.InfoTitle>
                </S.InfoHeader>
                <S.InfoText>www.gosucave.co.kr</S.InfoText>
            </S.InfoComponent>
            <S.InfoComponent>
                <S.InfoHeader>
                    <S.InfoIcon/>
                    <S.InfoTitle>문의</S.InfoTitle>
                </S.InfoHeader>
                <S.InfoText>고수동굴문화재관리소 043-422-3072</S.InfoText>
            </S.InfoComponent>
        </S.InfoBox>

        <S.InfoComponent>
            <S.InfoHeader>
                <S.InfoIcon/>
                <S.InfoTitle>이용요금</S.InfoTitle>
            </S.InfoHeader>
            <S.InfoText>
                개인 - 성인 11,000원 / 청소년 7,000원 / 어린이 5,000원<br/>단체 - 성인 10,000원 / 청소년 6,000원 / 어린이 4,000원
            </S.InfoText>
        </S.InfoComponent>

        <S.InfoComponent>
            <S.InfoHeader>
                <S.InfoIcon/>
                <S.InfoTitle>주차시설</S.InfoTitle>
            </S.InfoHeader>
            <S.InfoText>
                승용•승합차 3,000원 / 버스 6,000원, 화물차(4t이하) 2,000원 화물차(4t이상) 4,000원 / 이륜차 500원
            </S.InfoText>
        </S.InfoComponent>
        <S.Line/>

        {/* 방문자 커뮤니티 */}
        <Review/>

        <S.UpImg>
            <UpIcon onClick={scrollToTop}/>
        </S.UpImg>
        <Nav/>
    </S.Container>
  )
}

export default Detail