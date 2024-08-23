import React, { useState } from 'react'
import * as S from './Content.style';

// img
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import EmptyHeart from '../../../assets/empty_heart.svg';
import FillHeart from '../../../assets/click_heart.svg';
// recoil
import { useRecoilValue } from "recoil"; 
import { StateAtoms } from "../../../recoil/BottomSheetAtoms"

function Content() {
    const closeState = useRecoilValue(StateAtoms); // bottom 열림, 닫힘 상태
    const contents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [scoreList, setScoreList] = useState(false); // 별점순 버튼 상태
    const [viewList, setViewList] = useState(false) // 조회순 버튼 상태

    function onClickScoreListBtn(){
        setScoreList(!scoreList);
    }

    function onClickViewListBtn(){
        setViewList(!viewList);
    }

    // 좋아요 상태 변수
    const [liked, setLiked] = useState(false);
    // 버튼 클릭 시 호출되는 함수: 상태를 토글
    const toggleLike = () => {
        setLiked(!liked);
    };
  return (
    <>
        <S.Header closeState={closeState}>
            <S.CountNum>{contents.length} 개</S.CountNum>
            <S.StateBtnComponent>
                <S.StateBtn onClick={onClickScoreListBtn}>별점순</S.StateBtn>
                <S.StateBtn onClick={onClickViewListBtn}>조회순</S.StateBtn>
            </S.StateBtnComponent>
        </S.Header>
        {contents.length === 0 ? 
            (<S.None closeState={closeState}>
                현재 조건에 맞는 생태관광지가 없습니다.
                <div style={{fontSize:"13px", marginTop:"7px"}}>지도에서 위치를 변경하거나 상세정보를 변경해보세요.</div>
            </S.None>):
            (<S.ContentComponent closeState={closeState}>
                {contents.map((content, index) => (
                    <S.ContentBox>
                        <S.Img src={exampleImage}/>
                        <S.InfoBox>
                            <S.Name>순천만습지</S.Name>
                            <S.Region>전라남도 순천시</S.Region>
                            <S.ContentWrap>
                                <S.ScoreBox>
                                    <S.ScoreIcon/> 9.6 (100)
                                </S.ScoreBox>
                                <S.LikeBtn>
                                    <img src={liked ? FillHeart : EmptyHeart} onClick={toggleLike}/>
                                </S.LikeBtn>
                            </S.ContentWrap>
                        </S.InfoBox>
                    </S.ContentBox>
                ))}
            </S.ContentComponent>)
        }
    </>
  )
}

export default Content