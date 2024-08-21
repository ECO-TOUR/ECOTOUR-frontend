import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  * {
    box-sizing: border-box;
  }
`;

const CheckboxInput = styled.input`
  position: absolute;
  visibility: hidden;
`;

const CheckboxLabel = styled.label`
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s ease;
  display: inline-block;

  &:not(:last-child) {
    margin-right: 6px;
  }

  &:hover {
    background: rgba(0, 119, 255, 0.06);
  }

  span {
    float: left;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }

  span:first-child {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    transform: scale(1);
    border: 1px solid #cccfdb;
    transition: all 0.2s ease;
    box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
  }

  span:first-child svg {
    position: absolute;
    top: 3px;
    left: 3px;
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }

  span:last-child {
    padding-left: 8px;
    line-height: 18px;
  }

  &:hover span:first-child {
    border-color: #07f;
  }
`;

const InlineSvg = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
`;

const CheckboxSvg = styled.svg`
  position: absolute;
  top: 3px;
  left: 3px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
`;

const waveAnimation = `
  @keyframes wave-4 {
    50% {
      transform: scale(0.9);
    }
  }
`;

const CheckboxWrapperStyled = styled.div`
  ${CheckboxLabel}:hover span:first-child {
    border-color: #07f;
  }

  ${CheckboxInput}:checked + ${CheckboxLabel} span:first-child {
    background: #07f;
    border-color: #07f;
    animation: wave-4 0.4s ease;
  }

  ${CheckboxInput}:checked + ${CheckboxLabel} span:first-child ${CheckboxSvg} {
    stroke-dashoffset: 0;
  }

  ${waveAnimation}
`;

const Checkbox = () => (
  <CheckboxWrapperStyled>
    <CheckboxInput className="inp-cbx" id="morning" type="checkbox" />
    <CheckboxLabel className="cbx" htmlFor="morning">
      <span>
        <CheckboxSvg width="12px" height="10px">
          <use xlinkHref="#check-4" />
        </CheckboxSvg>
      </span>
      <span>내 위치 공유하기</span>
    </CheckboxLabel>
    <InlineSvg className="inline-svg">
      <symbol id="check-4" viewBox="0 0 12 10">
        <polyline points="1.5 6 4.5 9 10.5 1" />
      </symbol>
    </InlineSvg>
  </CheckboxWrapperStyled>
);

export default Checkbox;
