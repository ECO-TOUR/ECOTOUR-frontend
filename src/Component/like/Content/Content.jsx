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

    // 이전 상태를 저장하기 위한 useRef
    const prevCloseStateRef = useRef();
    useEffect(() => {
        prevCloseStateRef.current = closeState;
        // 좋아요 목록 조회 API
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`/tourlike/api/wishlist/${user_id}/Inquire/`);
                //console.log(response.data);
                setContents(response.data);
            } catch (error) {
                console.log(error);
            }
          };
      
        fetchDetail(); // 컴포넌트가 마운트될 때 API 호출
    }, [closeState]);

    // 이전 상태와 현재 상태를 비교하여 변화 감지
    const wasCloseStateChanged = () => {
        return prevCloseStateRef.current !== closeState;
    };
    
    const navigate = useNavigate();
    const onClickDetail = (event) => {
        setTimeout(() => {
            if (!wasCloseStateChanged()) {
                navigate('/detail');
            }
        }, 300); // 애니메이션 지속 시간과 맞추어야 할 수 있음
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
                (<S.None closeState={closeState}>
                    좋아요를 누른 생태관광지가 없습니다.
                    <div style={{fontSize:"13px", marginTop:"7px"}}>마음에 드는 관광지에 좋아요를 눌러보세요.</div>
                </S.None>):
                (<S.ContentComponent closeState={closeState}>
                    {contents.map((content, index) => (
                        <S.ContentBox key={index} onClick={onClickDetail} >
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
