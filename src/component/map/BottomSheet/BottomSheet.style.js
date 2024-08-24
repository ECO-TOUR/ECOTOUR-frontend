import { motion } from "framer-motion";
import styled from "styled-components";

import { BOTTOM_SHEET_HEIGHT } from "../../../constants";

// bottomsheet 전체 박스
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  margin: 0 auto;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  height: ${BOTTOM_SHEET_HEIGHT}px;
  border-radius: 15px 15px 0px 0px;
`;

// bottomsheet 헤더
const HeaderWrapper = styled(motion.div)`
  height: 35px;
  position: relative;
  padding-top: 15px;
  cursor: pointer;
  border-radius: 15px 15px 0px 0px;
`;

// 헤더 바
const HandleBar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

const ContentWrapper = styled.div`
  height: 80vh;
`;

const NoneHeader = styled.div`
  margin-top: 35px;
`;

// 뒤로가기 버튼
export const BackBtn = styled.div`
  position: absolute;
  left: 5%;
  top: 2.6%;
  cursor: pointer;
  z-index: 2000;
`;

// 지도보기 버튼 컴포넌트
export const MapBtnConponent = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-top: 20px;
`;

// 지도 보기 버튼
export const MapBtn = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  background: #333;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 연한 그림자 추가
  transition: background 0.3s ease, box-shadow 0.3s ease; // 애니메이션 효과 추가

  &:hover {
    background: #444; // 색상을 살짝 연하게 변경
  }
`;

export const MapText = styled.div`
  margin-left: 8px;
`;

export { Wrapper, HeaderWrapper, HandleBar, ContentWrapper, NoneHeader };
