import React from 'react'
import styled from 'styled-components';

const AddPhotoBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'imageSrc',
})`
    height: 66px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-right: 10px;
    margin-left: 0;
    padding: 0;
    width: 60px;
    flex-shrink: 0; 
    background-size: cover;
    background-position: center;
    background-image: ${(props) => `url(${props.imageSrc})`};
    cursor: pointer; 
    position: relative;
    
    &:hover::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3); /* 반투명한 검은색 오버레이 */
      border-radius: 10px; /* AddPhotoBox의 border-radius와 일치시킴 */
      z-index: 1; /* 오버레이가 이미지 위에 표시되도록 설정 */
    }
`;

const AddPhoto = ({imageSrc, onClick}) => {

  const encodedImageSrc = encodeURI(imageSrc);

  return (
    <AddPhotoBox imageSrc={encodedImageSrc} onClick={onClick}></AddPhotoBox>
  )
}

export default AddPhoto
