import React from 'react'
import * as S from './Content.style';

// recoil
import { useRecoilValue } from "recoil"; 
import { StateAtoms } from "../../../recoil/BottomSheetAtoms"

function Content() {
    const closeState = useRecoilValue(StateAtoms); // bottom 열림, 닫힘 상태
    const contents = [];
  return (
    <>
        <S.Header closeState={closeState}>
            <S.CountNum>{contents.length} 개</S.CountNum>
            <S.StateBtnComponent>
                <S.StateBtn>별점순</S.StateBtn>
                <S.StateBtn>조회순</S.StateBtn>
            </S.StateBtnComponent>
        </S.Header>
        {contents.length === 0 ? 
            (<S.None closeState={closeState}>
                현재 조건에 맞는 생태관광지가 없습니다.
                <div style={{fontSize:"13px", marginTop:"7px"}}>지도에서 위치를 변경하거나 상세정보를 변경해보세요.</div>
            </S.None>):
            (<div>
                {contents.map((content, index) => (
                    <div>내용</div>
                ))}
            </div>)
        }
    </>
  )
}

export default Content