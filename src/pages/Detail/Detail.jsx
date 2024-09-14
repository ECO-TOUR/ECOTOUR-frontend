import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as S from './Detail.style';
// 컴포넌트
import Map from '../../component/Detail/DetailMap';
import Review from '../../component/Detail/Review';
import Nav from '../../component/main/Navbar';
// img
import { ReactComponent as BackBtn } from '../../assets/back_btn.svg';
import EmptyHeart from '../../assets/empty_heart.svg';
import FillHeart from '../../assets/click_heart.svg';
import ShareIcon from '../../assets/share_icon.svg';
import { ReactComponent as UpIcon } from '../../assets/up_icon.svg';

function Detail() {

    const { tour_id } = useParams();
    const [detail, setDetail] = useState(null);
    const user_id = parseInt(localStorage.getItem('user_id'));

    // 스크롤 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });  
    };

    // 지도 마커 표시 주소 변수
    const[address, setAddress] = useState("");
    const [title, setTitle] = useState(""); // 관광지 이름
    const [image, setImage] = useState(""); // 관광지 이미지
    const [website, setWebsite] = useState("") // 관광지 홈페이지

    const mainImgRef = useRef();

    // 좋아요 상태 변수
    const [liked, setLiked] = useState(false);
    // 버튼 클릭 시 호출되는 함수: 상태를 토글
    const toggleLike = () => {

        setLiked(!liked);

        const fetchLike = async () => {
            try {
                const response = await axios.post(`/tourlike/api/wishlist/${user_id}/toggle/`, {
                    tour_id: tour_id
                });
                //console.log(response.data);
            } catch (error) {
                console.log(error);
            }
            };
        
        fetchLike(); // 컴포넌트가 마운트될 때 API 호출
    };

    useEffect(() => {
        // 관광지 정보 가져오기
        const fetchDetail = async () => {
            try {
              const response = await axios.get(`/place/detail/${tour_id}/${user_id}`);
              const { tour_name, tour_location, tour_img, website, tour_tel, 
                tour_telname, restrooms, parking, fees, opening_hours} = response.data.place_detail;
              setTitle(tour_name); // 관광지 이름
              setAddress(tour_location); // 관광지 주소
              setImage(tour_img); // 관광지 이미지
              setDetail(response.data.place_detail);
              //console.log(response.data);

              if(response.data.place_detail.tourspot_liked === "liked"){
                setLiked(true);
              }
            } catch (error) {
              console.log(error);
            }
          };
      
        fetchDetail(); // 컴포넌트가 마운트될 때 API 호출
        // 카카오톡 sdk 추가
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, [tour_id]);

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

        <S.MainImg src={image} ref={mainImgRef}/>
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
                {detail ? (<>{detail.opening_hours}</>) : (
                    <>Loading...</> // 데이터를 불러오는 동안 보여줄 내용
                )}
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
                    {detail ? (<>{detail.restrooms}</>) : (
                        <>Loading...</> // 데이터를 불러오는 동안 보여줄 내용
                    )}
                </S.InfoText>
            </S.InfoComponent>
        </S.InfoBox>

        <S.InfoBox>
            <S.InfoComponent>
                <S.InfoHeader>
                    <S.InfoIcon/>
                    <S.InfoTitle>관련 홈페이지</S.InfoTitle>
                </S.InfoHeader>
                <S.InfoText>                    
                    {detail ? (<>{detail.website}</>) : (
                        <>Loading...</> // 데이터를 불러오는 동안 보여줄 내용
                    )}
                </S.InfoText>
            </S.InfoComponent>
            <S.InfoComponent>
                <S.InfoHeader>
                    <S.InfoIcon/>
                    <S.InfoTitle>문의</S.InfoTitle>
                </S.InfoHeader>
                <S.InfoText>                    
                    {detail ? (<>{detail.tour_telname} {detail.tour_tel}</>) : (
                        <>Loading...</> // 데이터를 불러오는 동안 보여줄 내용
                    )}
                </S.InfoText>
            </S.InfoComponent>
        </S.InfoBox>

        <S.InfoComponent>
            <S.InfoHeader>
                <S.InfoIcon/>
                <S.InfoTitle>이용요금</S.InfoTitle>
            </S.InfoHeader>
            <S.InfoText>
                {detail ? (<>{detail.fees}</>) : (
                    <>Loading...</> // 데이터를 불러오는 동안 보여줄 내용
                )}
            </S.InfoText>
        </S.InfoComponent>

        <S.InfoComponent>
            <S.InfoHeader>
                <S.InfoIcon/>
                <S.InfoTitle>주차시설</S.InfoTitle>
            </S.InfoHeader>
            <S.InfoText>
                {detail ? (<>{detail.parking}</>) : (
                    <>Loading...</> // 데이터를 불러오는 동안 보여줄 내용
                )}
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