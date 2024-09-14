import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Content.style';
import axios from 'axios';

// img
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import EmptyHeart from '../../../assets/empty_heart.svg';
import FillHeart from '../../../assets/click_heart.svg';
// recoil
import { useRecoilValue } from "recoil"; 
import { StateAtoms } from "../../../recoil/BottomSheetAtoms";

function Content() {
    const user_id = parseInt(localStorage.getItem('user_id'));
    const access_token = localStorage.getItem('access_token');
    const closeState = useRecoilValue(StateAtoms); // bottom 열림, 닫힘 상태
    const [contents, setContents] = useState([]);
    const [originalContents, setOriginalContents] = useState([]); // 원본 데이터를 저장
    const [scoreList, setScoreList] = useState(false); // 별점순 버튼 상태
    const [viewList, setViewList] = useState(false); // 조회순 버튼 상태

    // 별점순 버튼 클릭 시
    function onClickScoreListBtn(){
        setScoreList(!scoreList);
        setViewList(false);

        if (!scoreList) {
            const sortedContents = [...contents].sort((a, b) => b.avg_post_score - a.avg_post_score);
            setContents(sortedContents);
        } else {
            // 원래 순서로 돌아가기
            setContents(originalContents);
        }
    }

    // 조회순 버튼 클릭 시
    function onClickViewListBtn(){
        setViewList(!viewList);
        setScoreList(false);

        if (!viewList) {
            const sortedContents = [...contents].sort((a, b) => b.tour_viewcnt - a.tour_viewcnt);
            setContents(sortedContents);
        } else {
            // 원래 순서로 돌아가기
            setContents(originalContents);
        }
    }

    // 좋아요 상태 변수
    const [liked, setLiked] = useState(Array(contents.length).fill(false)); // 각 콘텐츠의 좋아요 상태 관리

    // 버튼 클릭 시 호출되는 함수: 특정 콘텐츠의 좋아요 상태를 토글
    const toggleLike = (event, tour_id) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중단
        alert("좋아요 목록에서 제외됩니다.");
        const fetchLike = async () => {
            try {
                const response = await axios.post(`/tourlike/api/wishlist/${user_id}/toggle/`, {
                    tour_id: tour_id
                });
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
            };
        
        fetchLike(); // 컴포넌트가 마운트될 때 API 호출
    };

    useEffect(() => {
        // 좋아요 목록 조회 API
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`/tourlike/api/wishlist/${user_id}/Inquire/`);
                //console.log(response.data);
                setContents(response.data);
                console.log(response.data);
                setOriginalContents(response.data);
            } catch (error) {
                console.log(error);
            }
          };
      
        fetchDetail(); // 컴포넌트가 마운트될 때 API 호출
    }, []);
    
    // detail클릭 시 페이지 이동
    const navigate = useNavigate();
    const onClickDetail = (tour_id) => {
        navigate(`/detail/${tour_id}`);
    };

    // 지역 길이 파싱
    const regionParsing = (text) => {
        const parts = text.split(' ');
        if (parts.length > 2) {
            // 두 번째 공백까지의 텍스트를 포함
            return `${parts[0]} ${parts[1]}`;
        }
        return text;
    };   

    return (
        <>
            <S.Header/>
            <S.SubHeader>
                <S.CountNum>{contents.length} 개</S.CountNum>
                <S.StateBtnComponent>
                    <S.StateBtn1 onClick={onClickScoreListBtn} btnState1={scoreList}>별점순</S.StateBtn1>
                    <S.StateBtn2 onClick={onClickViewListBtn} btnState2={viewList}>조회순</S.StateBtn2>
                </S.StateBtnComponent>
            </S.SubHeader>
            {contents.length === 0 ? 
                (<S.None>
                    좋아요를 누른 생태관광지가 없습니다.
                    <div style={{fontSize:"13px", marginTop:"7px"}}>마음에 드는 관광지에 좋아요를 눌러보세요.</div>
                </S.None>):
                (<S.ContentComponent>
                    {contents.map((content, index) => (
                        <S.ContentBox key={index} onClick={() => onClickDetail(content.tour_id)} >
                            <S.Img src={content.tour_img}/>
                            <S.InfoBox>
                                <S.Name>{content.tour_name}</S.Name>
                                <S.Region>{regionParsing(content.tour_location)}</S.Region>
                                <S.ContentWrap>
                                    <S.ScoreBox>
                                        <S.ScoreIcon/>{content.avg_post_score}
                                    </S.ScoreBox>
                                    <S.LikeBtn>
                                        <img src={liked[index] ?  EmptyHeart: FillHeart} onClick={(event) => toggleLike(event, content.tour_id)}/>
                                    </S.LikeBtn>
                                </S.ContentWrap>
                            </S.InfoBox>
                        </S.ContentBox>
                    ))}
                </S.ContentComponent>)
            }
        </>
    );
}

export default Content;
