import React from 'react'
import styled from 'styled-components';

const AddPhotoBox = styled.div`
    height: 66px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-right: 10px;
    margin-left: 0;
    padding: 0;
    width: 60px;
    background-size: cover;
    background-position: center;
    background-image: ${(props) => `url(${props.imageSrc})`};
`;

const AddPhoto = ({imageSrc}) => {
  return (
    <AddPhotoBox imageSrc={imageSrc}></AddPhotoBox>
  )
}

export default AddPhoto