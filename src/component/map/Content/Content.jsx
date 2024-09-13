import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Content.style';

// img
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import EmptyHeart from '../../../assets/empty_heart.svg';
import FillHeart from '../../../assets/click_heart.svg';
// recoil
import { useRecoilValue } from "recoil"; 
import { StateAtoms } from "../../../recoil/BottomSheetAtoms";
import { recentSearchesState } from '../../../recoil/SearchesAtoms';

function Content() {
    const closeState = useRecoilValue(StateAtoms); // bottom 열림, 닫힘 상태
    const search_results = useRecoilValue(recentSearchesState);
    const [scoreList, setScoreList] = useState(false); // 별점순 버튼 상태
    const [viewList, setViewList] = useState(false); // 조회순 버튼 상태

    // 별점순 버튼 클릭 시
    function onClickScoreListBtn(){
        setScoreList(!scoreList);
        setViewList(false);
    }

    // 조회순 버튼 클릭 시
    function onClickViewListBtn(){
        setViewList(!viewList);
        setScoreList(false);
    }

    // 좋아요 상태 변수
    const [liked, setLiked] = useState(Array(search_results.length).fill(false)); // 각 콘텐츠의 좋아요 상태 관리

    // 버튼 클릭 시 호출되는 함수: 특정 콘텐츠의 좋아요 상태를 토글
    const toggleLike = (index, event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중단
        setLiked((prevLiked) => {
            const newLiked = [...prevLiked];
            newLiked[index] = !newLiked[index];
            return newLiked;
        });
    };

    // 이전 상태를 저장하기 위한 useRef
    const prevCloseStateRef = useRef();
    useEffect(() => {
        prevCloseStateRef.current = closeState;
        console.log(search_results);
    }, [closeState]);

    // 이전 상태와 현재 상태를 비교하여 변화 감지
    const wasCloseStateChanged = () => {
        return prevCloseStateRef.current !== closeState;
    };
    
    const navigate = useNavigate();
    const onClickDetail = (tour_id) => {
        setTimeout(() => {
            if (!wasCloseStateChanged()) {
                navigate(`/detail/${tour_id}`);
            }
        }, 300); // 애니메이션 지속 시간과 맞추어야 할 수 있음
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
            <S.Header closeState={closeState}>
                <S.CountNum>{search_results.length} 개</S.CountNum>
                <S.StateBtnComponent>
                    <S.StateBtn1 onClick={onClickScoreListBtn} btnState1={scoreList}>별점순</S.StateBtn1>
                    <S.StateBtn2 onClick={onClickViewListBtn} btnState2={viewList}>조회순</S.StateBtn2>
                </S.StateBtnComponent>
            </S.Header>
            {search_results.length === 0 ? 
                (<S.None closeState={closeState}>
                    현재 조건에 맞는 생태관광지가 없습니다.
                    <div style={{fontSize:"13px", marginTop:"7px"}}>지도에서 위치를 변경하거나 상세정보를 변경해보세요.</div>
                </S.None>):
                (<S.ContentComponent closeState={closeState}>
                    {search_results.map((content, index) => (
                        <S.ContentBox key={index} onClick={() => onClickDetail(content.tour_id)} >
                            <S.Img src={exampleImage}/>
                            <S.InfoBox>
                                <S.Name>{content.tour_name}</S.Name>
                                <S.Region>{regionParsing(content.tour_location)}</S.Region>
                                <S.ContentWrap>
                                    <S.ScoreBox>
                                        <S.ScoreIcon/> 9.6 (100)
                                    </S.ScoreBox>
                                    <S.LikeBtn>
                                        <img src={liked[index] ? FillHeart : EmptyHeart} onClick={(event) => toggleLike(index, event)}/>
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
