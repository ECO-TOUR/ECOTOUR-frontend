import React, { useState, useRef, useEffect } from 'react'
import styled  from 'styled-components'
import Checkbox  from '../../component/community/AddForm/Checkbox';
import AddedPhoto from '../../component/community/AddForm/AddedPhoto';
import Header from '../../component/main/Header'
import Navbar from '../../component/main/Navbar'
import { useNavigate  } from 'react-router-dom';
import {ReactComponent as CameraIcon} from '../../assets/camera_icon.svg'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ReactComponent as BackBtnIcon } from '../../assets/back_btn.svg';
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    background-color: #333333;
    color: white;
    font-size: 15px;
    font-weight: bold;
    &:hover{
        border: 1px solid black;
        background-color: #555;
    }
`;

// 별점 팝업 뒷 overlay
const Overlay = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isOpen'
})`
display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};  /* 상태에 따라 오버레이 표시 여부 결정 */
position: fixed;
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

const ModifyForm = () => {
    const [uploadedImage, setUploadedImage] = useState([]);
    const [ImageUrl, setImageUrl] = useState([]);
    const [textContent, setTextContent] = useState('');
    const [tourId, setTourId] = useState(null);
    const [likes, setLikes] = useState(0);
    const fileInputRef = useRef(null);
    const [isTourIdLoaded, setIsTourIdLoaded] = useState(false);
    const userId = localStorage.getItem('user_id')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false); // 별점 팝업 상태
    const [rating, setRating] = useState(0); // 별점 상태
    const {postId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/community/api/postinquire/${userId}/`)
            .then(response => {
                const selectedPost = response.data.content.find(p => p.post_id === Number(postId));
                console.log('se',selectedPost);
                if(selectedPost){
                    setTextContent(selectedPost.post_text);
                    setUploadedImage(selectedPost.post_img);
                    setImageUrl(selectedPost.post_img);
                    setTourId(selectedPost.tour_id);
                    setLikes(selectedPost.post_likes);
                    setIsTourIdLoaded(true);
                    setRating(selectedPost.post_score);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },[postId, userId]);

    //이미지 업로드
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (uploadedImage.length + files.length> 5){
            alert("최대 5장의 사진만 업로드 할 수 있습니다.")
            return;
        }

        setUploadedImage((prevImages) => [...prevImages, ...files]);

        const newImageUrls = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                newImageUrls.push(event.target.result); // 미리보기 URL을 생성하여 추가
                if (newImageUrls.length === files.length) {
                    setImageUrl((prevImageUrl) => [...prevImageUrl, ...newImageUrls]); // 새로 생성된 URL들을 기존 URL에 추가
                }
            };
            reader.readAsDataURL(file);
        });
        fileInputRef.current.value = '';
        // console.log('업로드 수정',uploadedImage);
    };

    //버튼 클릭 시 파일 입력 하는거 나옴 
    const handleButtonClick = () => {
        if (uploadedImage.length >= 5){
            alert("최대 5장의 사진만 업로드 할 수 있습니다.")
            return;
        }
        fileInputRef.current.click(); 
    };

    //이미지 삭제
    const imageDelete = (index) => {
        const newImages =uploadedImage.filter((_, i) => i !== index);
        setUploadedImage(newImages);
        setImageUrl(newImages)
        console.log('삭제',uploadedImage);
    };

    const handleSearch = (value) => {
        setTourId(value);
        console.log('tour id changed:', value);
    }

    //게시글 수정 요청
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
        formData.append('post_id', postId);
        formData.append('text', textContent);
        formData.append('likes', likes);
        formData.append('score', 4);
        formData.append('hashtag', '#example');
        formData.append('tour_id', tourId);
        formData.append('user_id', userId);

          
        //게시물등록 버튼 비활성화
        setIsSubmitting(true); 

        
        try {
            for (const file of uploadedImage) {
                if (file instanceof File) {
                    // File인 경우 WebP로 변환 후 FormData에 추가
                    const webpFile = await convertToWebP(file);
                    formData.append('img', webpFile);
                } else if (typeof file === 'string' && file.startsWith('http')) {
                    // URL인 경우 'old_img'로 FormData에 추가
                    formData.append('old_img', file);
                }
            }
            // // 폼 데이터 확인을 위한 로그
            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
            const response = await axios.post('/community/api/postmodify/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            if (response.status === 200) {
                alert("게시글이 성공적으로 수정되었습니다.");
                navigate('/community/')
            }
        } catch (error) {
            console.error('게시글 등록 실패:', error);
            alert('게시글 등록 중 문제가 발생했습니다.');
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
    
                    // 이미지를 캔버스에 그린 후 WebP 형식으로 변환
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const webpFile = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
                                type: 'image/webp',
                                lastModified: file.lastModified,
                            });
                            resolve(webpFile);
                        } else {
                            reject(new Error('WebP 변환 중 문제가 발생했습니다.'));
                        }
                    }, 'image/webp');
                };
    
                img.onerror = (error) => reject(error);
            };
    
            reader.onerror = (error) => reject(error);
    
            reader.readAsDataURL(file);
        });
    };
    
    //뒤로가기
    const onClickBackBtn = () => {
        navigate(`/main`);
    };

    if (!isTourIdLoaded) {
        return <div>Loading...</div>;  // tourId가 로드될 때까지 로딩 메시지 표시
    }

    return (
    <>
        <Header pageName='게시글 수정'/>
        <BackBtn onClick={onClickBackBtn}>
          <BackBtnIcon />
        </BackBtn>
        <AddFormArea id='add-form-area'>
            <TextArea 
                id='text-area' 
                type='text' 
                placeholder='내용을 입력해 주세요'
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
            ></TextArea>
            <LocArea id='loc-check-area'>
                <Checkbox onChange={handleSearch} initialValue={tourId}></Checkbox>
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
                {ImageUrl.map((imageSrc, index) => (
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
    )
}

export default ModifyForm