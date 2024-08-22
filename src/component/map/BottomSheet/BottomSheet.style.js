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
`;

// bottomsheet 헤더
const HeaderWrapper = styled(motion.div)`
  height: 35px;
  position: relative;
  padding-top: 16px;
  cursor: pointer;
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

export { Wrapper, HeaderWrapper, HandleBar, ContentWrapper, NoneHeader };
