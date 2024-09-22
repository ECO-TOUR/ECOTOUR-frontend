import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './Content.style';
import { useQuery, useMutation, useQueryClient } from 'react-query';
// img
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import EmptyHeart from '../../../assets/empty_heart.svg';
import FillHeart from '../../../assets/click_heart.svg';
// recoil
import { useRecoilValue } from "recoil"; 
import { StateAtoms } from "../../../recoil/BottomSheetAtoms";
import { recentSearchesState } from '../../../recoil/SearchesAtoms';

function Content() {
    const user_id = localStorage.getItem('user_id');
    const closeState = useRecoilValue(StateAtoms); // bottom 열림, 닫힘 상태
    const initialSearchResults = useRecoilValue(recentSearchesState); // 초기 상태를 저장
    const [searchResults, setSearchResults] = useState(initialSearchResults); // 상태를 복사하여 관리
    const [scoreList, setScoreList] = useState(false); // 별점순 버튼 상태
    const [viewList, setViewList] = useState(false); // 조회순 버튼 상태
    const queryClient = useQueryClient();

    // 별점순 버튼 클릭 시
    function onClickScoreListBtn() {
        setScoreList(!scoreList);
        setViewList(false);
    }

    // 조회순 버튼 클릭 시
    function onClickViewListBtn() {
        setViewList(!viewList);
        setScoreList(false);
    }

    // 좋아요 상태 변수
    const [liked, setLiked] = useState([]); // 각 콘텐츠의 좋아요 상태 관리
    // 좋아요 상태 초기화
    useEffect(() => {
        // 초기 좋아요 상태 설정: 서버에서 받은 tourspot_liked 값을 기반으로 liked 배열 초기화
        const initialLikedState = initialSearchResults.map(content => content.tourspot_liked === "liked");
        setLiked(initialLikedState);
    }, [initialSearchResults]);

    // // 좋아요 버튼 클릭 시 호출되는 함수: 특정 콘텐츠의 좋아요 상태를 토글
    // const toggleLike = (tour_id, index, event) => {
    //     event.stopPropagation(); // 클릭 이벤트 전파 중단

    //     const fetchLike = async () => {
    //         try {
    //             const response = await axios.post(`/tourlike/api/wishlist/${user_id}/toggle/`, {
    //                 tour_id: tour_id
    //             });
    //             setLiked((prevLiked) => {
    //                 const newLiked = [...prevLiked];
    //                 newLiked[index] = !newLiked[index]; // 좋아요 상태 토글
    //                 return newLiked;
    //             });

    //             // 좋아요 상태 업데이트
    //             setSearchResults(prevResults => {
    //                 const newResults = [...prevResults];
    //                 newResults[index] = {
    //                     ...newResults[index],
    //                     tourspot_liked: newResults[index].tourspot_liked === "liked" ? "unliked" : "liked",
    //                 };
    //                 return newResults;
    //             });

    //             console.log(searchResults);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
        
    //     fetchLike(); // 컴포넌트가 마운트될 때 API 호출
    // };

    // 좋아요 상태를 서버에 반영하는 mutation 정의
    const mutation = useMutation(
        async (tour_id) => {
            const response = await axios.post(`/tourlike/api/wishlist/${user_id}/toggle/`, { tour_id: tour_id });
            return response.data; // 서버의 응답 데이터 반환
        },
        {
            onMutate: (tour_id) => {
                const index = searchResults.findIndex(content => content.tour_id === tour_id);
                if (index > -1) {
                    // 이전 상태를 저장하고 좋아요 상태를 즉시 반영
                    setLiked((prevLiked) => {
                        const newLiked = [...prevLiked];
                        newLiked[index] = !newLiked[index];
                        return newLiked;
                    });
                    console.log(liked);
                }
            },
            onError: (error, tour_id, context) => {
                // 오류 발생 시 원래 상태로 복구 (context 사용)
                setLiked(context.previousLiked);
                console.error(error);
            },
            onSettled: () => {
                // 성공/실패 후 쿼리 무효화
                queryClient.invalidateQueries(['likes', user_id]);
            }
        }
    );

    const toggleLike = (tour_id, index, event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중단
        mutation.mutate(tour_id); // 좋아요 상태 변경 요청
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

    // 별점순, 조회순 버튼 클릭 시 정렬
    useEffect(() => {
        let sortedResults = [...initialSearchResults];

        if (viewList) {
            // 조회순 정렬
            sortedResults.sort((a, b) => b.tour_viewcnt - a.tour_viewcnt);
        } else if (scoreList) {
            // 별점순 정렬
            sortedResults.sort((a, b) => b.avg_score - a.avg_score);
        }

        setSearchResults(sortedResults);
    }, [viewList, scoreList, initialSearchResults]);

    const navigate = useNavigate();
    const onClickDetail = (tour_id) => {
        setTimeout(() => {
            if (!wasCloseStateChanged()) {
                navigate(`/detail/${tour_id}`);
            }
        }, 300); // 애니메이션 지속 시간과 맞추어야 할 수 있음
    };

    // 이전 상태를 저장하기 위한 useRef
    const prevCloseStateRef = useRef();
    useEffect(() => {
        prevCloseStateRef.current = closeState;
        //console.log(searchResults);
    }, [closeState]);

    // 이전 상태와 현재 상태를 비교하여 변화 감지
    const wasCloseStateChanged = () => {
        return prevCloseStateRef.current !== closeState;
    };

    return (
        <>
            <S.Header closeState={closeState}>
                <S.CountNum>{searchResults.length} 개</S.CountNum>
                <S.StateBtnComponent>
                    <S.StateBtn1 onClick={onClickScoreListBtn} btnState1={scoreList}>별점순</S.StateBtn1>
                    <S.StateBtn2 onClick={onClickViewListBtn} btnState2={viewList}>조회순</S.StateBtn2>
                </S.StateBtnComponent>
            </S.Header>
            {searchResults.length === 0 ? 
                (<S.None closeState={closeState}>
                    현재 조건에 맞는 생태관광지가 없습니다.
                    <div style={{fontSize:"13px", marginTop:"7px"}}>지도에서 위치를 변경하거나 상세정보를 변경해보세요.</div>
                </S.None>):
                (<S.ContentComponent closeState={closeState}>
                    {searchResults.map((content, index) => (
                        <S.ContentBox key={index} onClick={() => onClickDetail(content.tour_id)} >
                            <S.Img src={content.tour_img}/>
                            <S.InfoBox>
                                <S.Name>{content.tour_name}</S.Name>
                                <S.Region>{regionParsing(content.tour_location)}</S.Region>
                                <S.ContentWrap>
                                    <S.ScoreBox>
                                        <S.ScoreIcon/> {content.avg_score}
                                    </S.ScoreBox>
                                    <S.LikeBtn>
                                        <img src={liked[index] ? FillHeart : EmptyHeart} onClick={(event) => toggleLike(content.tour_id, index, event)}/>
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
