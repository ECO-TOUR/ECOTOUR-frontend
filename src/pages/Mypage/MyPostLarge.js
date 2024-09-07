import React from 'react'
import styled from 'styled-components'


const MyPostArea = styled.button`
    border: 1.5px solid #D9D9D9;
    border-radius: 10px;
    background-color: white;
    width: 200px;
    height: 250px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
`;
const Thumbnail = styled.img`
    width: 100%;
    height: 200px;
    background-color: #ccc;
`;

const Title = styled.div`
    width: calc(100% - 10px);
    height: 30px;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
`;

const Subtitle = styled.div`
    width: calc(100% - 10px);
    height: 20px;
    margin-top: 5px;
    margin-left: 10px;
    text-align: left;
`
const Rating = styled.div`
    width: calc(100% - 10px);
    height: 20px;
    margin-right: 10px;
    text-align: right;
`
const MyPostLarge = () => {
  return (
    <MyPostArea>
        <Thumbnail />
        <Title>title</Title>
        <Subtitle>subtitle</Subtitle>
        <Rating>rating</Rating>
    </MyPostArea>
  )
}

export default MyPostLarge