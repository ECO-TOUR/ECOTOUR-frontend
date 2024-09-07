import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import useBottomSheet from "./useBottomSheet";
import * as S from "./BottomSheet.style";
// component
import Header from "./Header";
import MainHeader from "../../main/Header";
// img
import { ReactComponent as BackBtn } from '../../../assets/back_btn.svg';
import { ReactComponent as MapIcon } from '../../../assets/map_icon.svg';
// recoil
import { useRecoilState } from "recoil"; 
import { StateAtoms } from "../../../recoil/BottomSheetAtoms";

const BottomSheet = ({ children }) => {
  const navigate = useNavigate();
  const { onDragEnd, controls } = useBottomSheet();
  const [closeState, setCloseState] = useRecoilState(StateAtoms); // bottom 열림, 닫힘 상태

  // MapBtn 클릭 시 bottomsheet를 내리는 함수
  const handleMapBtnClick = () => {
    controls.start("hidden"); // 'hidden' 상태로 애니메이션 실행
    setCloseState(true);
  };

  return (
    <S.Wrapper
      drag="y"
      onDragEnd={onDragEnd}
      initial="hidden"
      animate={controls}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
      }}
      variants={{
        visible: { y: 0 },
        hidden: { y: "67%" },
      }}
      dragConstraints={{ top: 0 }} // 드래그 제약 조건을 설정
      dragElastic={0.2}
    >
      {/* closeState에 따른 헤더 */}
      {closeState ? (<Header />):(
        <>
        <S.BackBtn onClick={() => navigate('/map-search')}>
          <BackBtn/>
        </S.BackBtn>
        <MainHeader pageName="검색어/현위치"/>
        </>
      )}
      <S.ContentWrapper>{children}</S.ContentWrapper>
      <S.MapBtnConponent>
        <S.MapBtn onClick={handleMapBtnClick}> {/* MapBtn 클릭 이벤트 추가 */}
          <MapIcon/>
          <S.MapText>지도 보기</S.MapText>
        </S.MapBtn>
      </S.MapBtnConponent>
    </S.Wrapper>
  );
};

export default BottomSheet;
