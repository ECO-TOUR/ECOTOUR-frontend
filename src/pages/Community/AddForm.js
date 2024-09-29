import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Checkbox from '../../component/community/AddForm/Checkbox';
import AddedPhoto from '../../component/community/AddForm/AddedPhoto';
import Header from '../../component/main/Header';
import Navbar from '../../component/main/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { NavAtoms } from '../../recoil/NavAtoms.js';
// img
import { ReactComponent as BackBtnIcon } from '../../assets/back_btn.svg';
import { ReactComponent as CameraIcon } from '../../assets/camera_icon.svg';
import { ReactComponent as StarIcon } from '../../assets/star.svg';

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
  -webkit-user-select: none;
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
// 별점 팝업 뒷 overlay
const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};  /* 상태에 따라 오버레이 표시 여부 결정 */
  position: fixed;
  width: 100%;
  height: 100%;
  transform: translate(-50%, 0%);
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);  /* 반투명 검정색 배경 */
  z-index: 1000;
`;
// 별점 팝업 스타일
const RatingModal = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};  /* 상태에 따라 표시 여부 결정 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  /* 팝업을 화면 중앙에 위치 */
  background-color: white;
  padding: 15px;  /* 내부 여백 줄임 */
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 300px;  /* 가로 크기 작게 설정 */
  height: 200px;  /* 높이 제한 */
`;
const RatingText = styled.div`
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    padding: 10px 0px;
`;
// 별점 표시 스타일
const RatingStars = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px 0 15px 0;
`;
// Star 컴포넌트 수정
const Star = styled.div`
  cursor: pointer;
  margin: 0 5px;
`;
// 별 아이콘
const CustomStarIcon = styled(StarIcon).withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  width: 2rem;
  height: 2rem;
  fill: ${({ active }) => (active ? '#91EB86' : '#D9D9D9')};
  cursor: pointer;
  margin: 0 5px;
`;
// 버튼을 감싸는 부모 div 스타일
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;  /* 버튼을 수평 가운데로 정렬 */
  margin-top: 25px;  /* 상단에 약간의 여백 추가 */
`;
// 별점 제출 버튼 스타일
const SubmitRatingButton = styled.button`
  padding: 10px 70px;  /* padding 값을 줄여서 버튼의 크기를 적절히 조정 */
  background-color: #333333;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #555;
  }
`;
// 뒤로가기 버튼
const BackBtn = styled.div`
    position: absolute;
    top: 21px;
    left: 20px;
    color: #D9D9D9;
    cursor: pointer;
    z-index: 1000;
    
    svg{
      width: 13px;
      height: 18px;
    }
`;

const AddForm = () => {

    const [uploadedImage, setUploadedImage] = useState([]);
    const [uploadedImageUrl, setUploadedImageUrl] = useState([]);
    const [textContent, setTextContent] = useState('');
    const [tourId, setTourId] = useState('');
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false); // 별점 팝업 상태
    const [rating, setRating] = useState(0); // 별점 상태
    const fileInputRef = useRef(null);
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const [, setHighlightedItem] = useRecoilState(NavAtoms);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //Nav 변수변경
    useEffect(() => {
      setHighlightedItem('chat');
    }, [setHighlightedItem]);

    // 파일 업로드 시 데이터 처리
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

    //사진 추가 버튼
    const handleButtonClick = () => {
      if (uploadedImage.length >= 5){
          alert("최대 5장의 사진만 업로드 할 수 있습니다.")
          return;
      }
      fileInputRef.current.click(); // 버튼 클릭 시 파일 입력을 클릭하도록 트리거
    };

    //사진 삭제
    const imageDelete = (index) => {
        const newImages =uploadedImage.filter((_, i) => i !== index);
        const newImageUrls =uploadedImageUrl.filter((_, i) => i !== index);
        setUploadedImage(newImages);
        setUploadedImageUrl(newImageUrls);
    };

    // 등록된 관광지 값 가져오기
    const handleSearch = (value) => {
        setTourId(value);
    }

    // 게시글 등록 버튼 클릭 시
    const handlePost = async () => {
      if (uploadedImage.length === 0 || textContent.trim() === '') {
        alert('내용 또는 사진을 추가해 주세요');
        return;
      }
      if (tourId === '') {
        alert('관광지를 선택해 주세요');
        return;
      } 
      // 게시글 등록 전에 별점 팝업 열기
      setIsRatingModalOpen(true); 
    };

    // 별 클릭 시 점수 값 변경 함수
    const handleStarClick = (index) => {
      setRating(index + 1);
    };
    
    // 별점 팝업에서 게시글 등록 버튼 클릭 시 
    const submitRating = async () => {
      if (rating === 0) {
        alert('별점을 선택해 주세요');
        return;
      }

      const formData = new FormData();
      formData.append('text', textContent);
      formData.append('date', new Date().toISOString());
      formData.append('score', rating); // 선택된 별점 사용
      formData.append('hashtag', '#example');
      formData.append('tour_id', tourId);
      formData.append('user_id', userId);
  
      //게시물등록 버튼 비활성화
      setIsSubmitting(true); 

      try {
        const filePromises = uploadedImage.map((file) => {
          return convertToWebP(file);
        });

        const webpFiles = await Promise.all(filePromises);
        webpFiles.forEach((webpFile) => {
            if (webpFile) {
                formData.append('img', webpFile);
            }
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
      } finally{
        setIsSubmitting(false);
      }

  };

  
    //webp 형식으로 바꾸기
    const convertToWebP = (file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
  
          reader.onload = (event) => {
              const img = new Image();
              img.src = event.target.result;
  
              img.onload = () => {
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const MAX_SIZE_MB = 2 * 1024 * 1024; // 2MB를 바이트로 변환
  
                  
                  const resizeAndCheckSize = () => {
                    // 캔버스의 크기를 설정
                    canvas.width = width;
                    canvas.height = height;

                    // 이미지를 캔버스에 그리기
                    ctx.drawImage(img, 0, 0, width, height);

                    // 캔버스를 WebP Blob으로 변환
                    return new Promise((resolve) => {
                        canvas.toBlob((blob) => {
                            if (blob.size <= MAX_SIZE_MB) {
                                // 파일 크기가 제한 내에 있을 경우, Blob을 파일로 변환하여 반환
                                const webpFile = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
                                    type: 'image/webp',
                                    lastModified: file.lastModified,
                                });
                                resolve(webpFile);
                            } else {
                                // 파일 크기가 제한을 초과하면 크기를 줄임
                                width *= 0.9;
                                height *= 0.9;
                                // 크기 조정 반복
                                resolve(resizeAndCheckSize());
                            }
                        }, 'image/webp');
                    });
                };

                // 크기 조정 및 확인 반복 시작
                resizeAndCheckSize()
                    .then((resizedWebP) => resolve(resizedWebP))
                    .catch((error) => reject(error));
            };
  
              img.onerror = (error) => reject(error);
          };
  
          reader.onerror = (error) => reject(error);
  
          reader.readAsDataURL(file);
      });
  };
  
  //뒤로가기
  const onClickBackBtn = () => {
      navigate('/community');
  };

  return (
    <>
        <Header pageName='게시글 작성'/>
        <BackBtn onClick={onClickBackBtn}>
          <BackBtnIcon />
        </BackBtn>
        <AddFormArea id='add-form-area'>
            <TextArea 
                type='text' 
                placeholder='방문한 관광지에 대한 리뷰와 연결됩니다. 방문 후기, 느낀 점 등을 작성해 주세요!'
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
            ></TextArea>
            {/* 관광지 선택 컴포넌트 */}
            <LocArea>
                <Checkbox onChange={handleSearch}></Checkbox>
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
                게시글 작성 완료
            </PostBtn>
        </AddFormArea>
        <Navbar/>

        {/* 별점 팝업 */}
        <Overlay isOpen={isRatingModalOpen} onClick={() => setIsRatingModalOpen(false)} />
        <RatingModal isOpen={isRatingModalOpen}>
          <RatingText>관광지에 대한 별점을 남겨주세요!</RatingText>
          <RatingStars>
            {[...Array(5)].map((_, index) => (
            <Star key={index} onClick={() => handleStarClick(index)}>
              <CustomStarIcon active={index < rating} />
            </Star>
            ))}
          </RatingStars>
          <ButtonWrapper>
            <SubmitRatingButton onClick={submitRating} disabled={isSubmitting}>
              게시글 등록
            </SubmitRatingButton>
          </ButtonWrapper>
        </RatingModal>
    </>
  );
};

export default AddForm;
