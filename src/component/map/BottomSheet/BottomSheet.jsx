import useBottomSheet from "./useBottomSheet";
import * as S from "./BottomSheet.style";
// component
import Header from "./Header";
import MainHeader from "../../Main/Header";
// img
import { ReactComponent as BackBtn } from '../../../assets/back_btn.svg';
// recoil
import { useRecoilValue } from "recoil"; 
import { StateAtoms } from "../../../recoil/BottomSheetAtoms"

const BottomSheet = ({ children }) => {
  const { onDragEnd, controls } = useBottomSheet();
  const closeState = useRecoilValue(StateAtoms); // bottom 열림, 닫힘 상태

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
        <S.BackBtn onClick={() => window.history.back()}>
          <BackBtn/>
        </S.BackBtn>
        <MainHeader pageName="검색어/현위치"/>
        </>
      )}
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.Wrapper>
  );
};

export default BottomSheet;
