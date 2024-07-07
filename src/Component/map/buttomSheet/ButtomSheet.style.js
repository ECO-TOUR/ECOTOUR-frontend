import { motion } from "framer-motion";
import styled from "styled-components";

import { BOTTOM_SHEET_HEIGHT } from "../../../constants";

// bottomsheet 전체 박스
const Wrapper = styled(motion.div)`
  flex-direction: column;
  position: fixed;
  z-index: 10;
  top: 20vh;
  left: 0;
  right: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: white;
  height: ${BOTTOM_SHEET_HEIGHT}px;
  width: 400px;
  margin: 0 auto;

  overflow: auto;
`;

// bottomsheet 헤더
const HeaderWrapper = styled(motion.div)`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
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
  padding: 10px;
`;

export { Wrapper, HeaderWrapper, HandleBar, ContentWrapper };
