import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Checkbox from '../../component/community/AddForm/Checkbox';
import AddedPhoto from '../../component/community/AddForm/AddedPhoto';
import Header from '../../component/main/Header';
import Navbar from '../../component/main/Navbar';
import { ReactComponent as CameraIcon } from '../../assets/camera_icon.svg';
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

// 게시글 입력 input
const TextArea = styled.textarea`
  border: 1px solid #d9d9d9;
  height: 450px;
  width: calc(100% - 32px);
  padding: 12px;
  margin: 20px 16px 0 16px;
  resize: none;
  font-size: 15px;
  font-weight: 400;
  border-radius: 5px;
  font-family: 'Pretendard';
  line-height: 1.5;
`;

// 관광지 선택하기 div
const LocArea = styled.div`
  margin: 5px 16px;
  padding: 0;
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

// 사진 추가 버튼
const AddPhotoBtn = styled.button`
  height: 66px;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 0px;
  padding: 0;
  width: 60px;
  cursor: pointer;
`;

// 게시글 등록 버튼
const PostBtn = styled.button`
  width: calc(100% - 32px);
  margin: 12px 16px 0px 16px;
  height: 45px;
  border: none;
  border-radius: 10px;
  background-color: #333333;
  font-size: 15px;
  font-weight: 500;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

// 별점 팝업 스타일
const RatingModal = styled(Modal)`
  position: absolute;  /* 위치를 절대값으로 설정 */
  left: 50%;  /* 부모의 가로 너비 기준으로 50% 이동 */
  transform: translateX(-50%);  /* 자신의 너비 기준으로 가운데로 이동 */
  width: 348px;
  max-height: 300px;  /* 높이를 고정 */
  overflow-y: auto;  /* 내용이 넘칠 경우 세로 스크롤 사용 */
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  margin-top: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 (선택 사항) */
`;

// 별점 표시 스타일
const RatingStars = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Star = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${({ active }) => (active ? '#FFD700' : '#D9D9D9')}; // 별점 활성화 색
  margin: 0 5px;
`;

// 별점 제출 버튼 스타일
const SubmitRatingButton = styled.button`
  padding: 10px 20px;
  background-color: #333333;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;
const BackBtn = styled.div`
    position: absolute;
    top: 21px;
    left: 20px;
    color: #D9D9D9;
    cursor: pointer;
    z-index: 1001;
    
    svg{
      width: 13px;
      height: 18px;
    }
`;

const AddForm = () => {
    const [uploadedImage, setUploadedImage] = useState([]);
    const [uploadedImageUrl, setUploadedImageUrl] = useState([]);
    const [textContent, setTextContent] = useState('');
    const [tourId ,setTourId] = useState(null);
    const fileInputRef = useRef(null);
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        
        // 최대 5장까지 업로드 제한
        if (uploadedImage.length + files.length > 5) {
            alert("최대 5장의 사진만 업로드 할 수 있습니다.");
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

  const handleSearch = (value) => {
    setTourId(value);
    console.log('tour id changed:', value);
  };

    const handlePost = async () => {
        if (uploadedImage.length === 0 || textContent.trim() === '') {
            alert("내용 또는 사진을 추가해 주세요");
            return;
        }
        if (tourId === null){
            alert('관광지를 선택해 주세요');
            return;
        }
        const formData = new FormData();
    
        formData.append('text', textContent);
        formData.append('date', new Date().toISOString());
        formData.append('score', 4);
        formData.append('hashtag', '#example');
        formData.append('tour_id', tourId);
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
        <Header pageName='게시글 작성'/>
        <AddFormArea>
            <TextArea 
                type='text' 
                placeholder='방문한 관광지에 대한 리뷰와 연결됩니다. 방문 후기, 느낀 점 등을 작성해 주세요!'
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
            ></TextArea>
            <LocArea>
                <Checkbox onChange={handleSearch} initalValue={null}></Checkbox>
            </LocArea>
            <AddPhotoArea>
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

export default AddForm;
