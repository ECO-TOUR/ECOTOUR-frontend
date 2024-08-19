import React from 'react'
import styled  from 'styled-components'
import Checkbox  from './Checkbox';
import AddPhoto from './AddPhoto';

const AddFormArea = styled.div`
    height: 690px;
    background-color: white;
    padding: 0;
    position: relative;
`;

const TextArea = styled.textarea`
    border: 1px solid #ccc;
    height: 400px;
    width: calc(100% - 32px - 24px);
    padding: 12px;
    margin: 0px 16px;
    align-items: start;
    resize: none;
    font-size: 15px;
    font-weight: 600;
    border-radius: 5px;
`;

const MyLoc = styled.div`
    /* border: 1px solid gray; */
    width: calc(100% - 32px);
    margin: 0 16px;
    padding: 0;
    height: 40px;
    display: flex;
    align-items: center;
`;


const MyPhotoArea = styled.div`
    /* border: 1px solid gray; */
    height: 66px;
    width: calc(100% - 32px);
    margin: 0 16px;
    padding: 0;
    display: flex ;
`;

const AddPhotoBtn = styled.button`
    height: 66px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-right: 10px;
    padding: 0;
    width: 60px;

    &:hover {
        background-color: #ccc;
        text-decoration: none;
        transition-duration: 0.1s;
    }
    
`;

const PostBtn = styled.button`
    width: calc(100% - 32px);
    margin: 0 16px;
    height: 45px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #91EB86;
    position: absolute;
    bottom: 20px;
    font-size: 15px;
    font-weight: bold;

    &:hover{
        border: 1px solid black;
    }
`;

const AddForm = () => {
  return (
    <AddFormArea>
        <TextArea type='text' placeholder='내용을 입력해 주세요'></TextArea>
        <MyLoc>
            <Checkbox></Checkbox>
        </MyLoc>
        <MyPhotoArea>
            <AddPhotoBtn></AddPhotoBtn>
            <AddPhoto></AddPhoto>
        </MyPhotoArea>
        <PostBtn>
            게시글 등록
        </PostBtn>
    </AddFormArea>
  )
}

export default AddForm