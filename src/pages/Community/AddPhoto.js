import React from 'react'
import styled from 'styled-components';

const AddPhotoBox = styled.button`
    height: 66px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-right: 10px;
    padding: 0;
    width: 60px;
`;

const AddPhoto = () => {
  return (
    <AddPhotoBox>Added<br/>Photo</AddPhotoBox>
  )
}

export default AddPhoto