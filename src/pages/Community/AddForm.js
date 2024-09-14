import React, { useState, useRef } from 'react'
import styled  from 'styled-components'
import Checkbox  from '../../component/community/AddForm/Checkbox';
import AddedPhoto from '../../component/community/AddForm/AddedPhoto';
import Header from '../../component/main/Header'
import Navbar from '../../component/main/Navbar'
import {ReactComponent as CameraIcon} from '../../assets/camera_icon.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFormArea = styled.div`
    padding-top: 60px;
    padding-bottom: 70px;
    margin: 0;
    height: 100vh;
    width: 100%;
    background-color: white;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    max-width: 430px;
    min-width: 320px;
`;

const TextArea = styled.textarea`
    border: 1px solid #ccc;
    height: calc(100%  - 40px - 66px - 75px);
    width: calc(100% - 32px);
    padding: 12px;
    margin: 10px 16px 0 16px;
    resize: none;
    font-family: 'Pretendard';
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
`;

const LocArea = styled.div`
    width: calc(100% - 32px);
    margin: 0 16px;
    padding: 0;
    height: 40px;
`;

const AddPhotoArea = styled.div`
    height: 66px;
    width: calc(100% - 32px);
    margin: 0 16px;
    padding: 0;
    display: flex;
    overflow-x: auto;
    white-space: nowrap; /* 이미지들이 한 줄에 나열되도록 설정 */

`;

const AddPhotoBtn = styled.button`
    height: 66px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-right: 10px;
    margin-left: 0px;
    padding: 0;
    width: 60px;
    flex-shrink: 0; 
    cursor: pointer;
    &:hover {
        background-color: #ccc;
        text-decoration: none;
        transition-duration: 0.1s;
    }    
`;

const PostBtn = styled.button`
    width: calc(100% - 32px);
    margin: 10px 16px 0px 16px;
    height: 45px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #91EB86;
    font-size: 15px;
    font-weight: bold;
    &:hover{
        border: 1px solid black;
    }
`;

const AddForm = () => {
    const [uploadedImage, setUploadedImage] = useState([]);
    const [uploadedImageUrl, setUploadedImageUrl] = useState([]);
    const [textContent, setTextContent] = useState('');
    const fileInputRef = useRef(null);
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (uploadedImage.length + files.length > 5){
            alert("최대 5장의 사진만 업로드 할 수 있습니다.")
            return;
        }
        const imageUrls = files.map((file) => URL.createObjectURL(file));

        setUploadedImage((prevImages) => [...prevImages, ...files]);
        setUploadedImageUrl((prevImageUrls) => [...prevImageUrls, ...imageUrls]);

        fileInputRef.current.value = '';    
    };

    const handleButtonClick = () => {
        if (uploadedImage.length >= 5){
            alert("최대 5장의 사진만 업로드 할 수 있습니다.")
            return;
        }
        fileInputRef.current.click(); // 버튼 클릭 시 파일 입력을 클릭하도록 트리거
    };

    const imageDelete = (index) => {
        const newImages =uploadedImage.filter((_, i) => i !== index);
        setUploadedImage(newImages);
    };

    const handlePost = async () => {
        if (uploadedImage.length === 0 || textContent.trim() === '') {
            alert("내용 또는 사진을 추가해 주세요");
            return;
        }
        const formData = new FormData();
    
        formData.append('text', textContent);
        formData.append('date', new Date().toISOString());
        formData.append('score', 4);
        formData.append('hashtag', '#example');
        formData.append('tour_id', 2508605);
        formData.append('user_id', userId);
        
        try {
            uploadedImage.forEach((file) => {
              formData.append('img', file); // 'img' must match what you're using in your Django view
            });
      
            const response = await axios.post('/community/api/postwrite/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            if (response.status === 200) {
                alert("게시글이 성공적으로 등록되었습니다.");
                navigate('/community/')
            }
        } catch (error) {
            console.error('게시글 등록 실패:', error);
            alert('게시글 등록 중 문제가 발생했습니다.');
        }
    };


    return (
    <>
        <Header/>
        <AddFormArea id='add-form-area'>
            <TextArea 
                id='text-area' 
                type='text' 
                placeholder='내용을 입력해 주세요'
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
            ></TextArea>
            <LocArea id='loc-check-area'>
                <Checkbox></Checkbox>
            </LocArea>
            <AddPhotoArea id='add-photo-area'>
                <AddPhotoBtn onClick={handleButtonClick}>
                    <CameraIcon />
                </AddPhotoBtn>
                <input
                        type='file'
                        accept='image/*'
                        ref={fileInputRef} 
                        style={{display: 'none'}}
                        multiple
                        onChange={handleFileChange}
                    />
                {uploadedImageUrl.map((imageSrc, index) => (
                    <AddedPhoto 
                        key={index} 
                        imageSrc={imageSrc} 
                        onClick={() => imageDelete(index)}/>
                ))}
            </AddPhotoArea>
            <PostBtn id='post-button' onClick={handlePost}>
                게시글 등록
            </PostBtn>
        </AddFormArea>
        <Navbar/>
    </>
    )
}

export default AddForm