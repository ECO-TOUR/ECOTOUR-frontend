import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Content.style';

// img
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import EmptyHeart from '../../../assets/empty_heart.svg';
import FillHeart from '../../../assets/click_heart.svg';
// recoil
import { useRecoilValue } from "recoil"; 
import { StateAtoms } from "../../../recoil/BottomSheetAtoms";

function Content() {
    const closeState = useRecoilValue(StateAtoms); // bottom 열림, 닫힘 상태
    const contents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    const [liked, setLiked] = useState(Array(contents.length).fill(false)); // 각 콘텐츠의 좋아요 상태 관리

    // 버튼 클릭 시 호출되는 함수: 특정 콘텐츠의 좋아요 상태를 토글
    const toggleLike = (index, event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중단
        setLiked((prevLiked) => {
            const newLiked = [...prevLiked];
            newLiked[index] = !newLiked[index];
            return newLiked;
        });
    };

    const navigate = useNavigate();
    const onClickDetail = () => {
        navigate('/detail');
    };

    return (
        <>
            <S.Header closeState={closeState}>
                <S.CountNum>{contents.length} 개</S.CountNum>
                <S.StateBtnComponent>
                    <S.StateBtn1 onClick={onClickScoreListBtn} btnState1={scoreList}>별점순</S.StateBtn1>
                    <S.StateBtn2 onClick={onClickViewListBtn} btnState2={viewList}>조회순</S.StateBtn2>
                </S.StateBtnComponent>
            </S.Header>
            {contents.length === 0 ? 
                (<S.None closeState={closeState}>
                    현재 조건에 맞는 생태관광지가 없습니다.
                    <div style={{fontSize:"13px", marginTop:"7px"}}>지도에서 위치를 변경하거나 상세정보를 변경해보세요.</div>
                </S.None>):
                (<S.ContentComponent closeState={closeState}>
                    {contents.map((content, index) => (
                        <S.ContentBox key={index} onClick={onClickDetail}>
                            <S.Img src={exampleImage}/>
                            <S.InfoBox>
                                <S.Name>순천만습지</S.Name>
                                <S.Region>전라남도 순천시</S.Region>
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
