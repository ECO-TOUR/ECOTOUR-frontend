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

const ModifyForm = () => {
    const [uploadedImage, setUploadedImage] = useState([]);
    const [textContent, setTextContent] = useState('');
    const [tourId, setTourId] = useState(null);
    const [likes, setLikes] = useState(0);
    const fileInputRef = useRef(null);
    const [isTourIdLoaded, setIsTourIdLoaded] = useState(false);
    const userId = localStorage.getItem('user_id')
    const {postId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/community/api/postinquire/${userId}/`)
            .then(response => {
                const selectedPost = response.data.content.find(p => p.post_id === Number(postId));
                console.log('se',selectedPost);
                if(selectedPost){
                    setTextContent(selectedPost.post_text)
                    setUploadedImage(selectedPost.post_img);
                    setTourId(selectedPost.tour_id);
                    setLikes(selectedPost.post_likes);
                    setIsTourIdLoaded(true);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },[postId]);

    //이미지 업로드
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (uploadedImage.length + files.length> 5){
            alert("최대 5장의 사진만 업로드 할 수 있습니다.")
            return;
        }

        setUploadedImage((prevImages) => [...prevImages, ...files]);
        fileInputRef.current.value = '';
        console.log('업로드 수정',uploadedImage);
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
        console.log('삭제',uploadedImage);
    };

    const handleSearch = (value) => {
        setTourId(value);
        console.log('tour id changed:', value);
    }

    const handlePost = async () => {
        if (uploadedImage.length === 0 || textContent.trim() === '') {
            alert("내용 또는 사진을 추가해 주세요");
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

        
        try {
            uploadedImage.forEach((file) => {
                if (file instanceof File) {
                    // 파일인 경우에만 'img'로 FormData에 추가
                    formData.append('img', file);
                  } else if (typeof file === 'string' && file.startsWith('http')) {
                    // URL인 경우에만 'old_img'로 FormData에 추가
                    formData.append('old_img', file);
                  }
                });
            
                
            // 폼 데이터 확인을 위한 로그
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
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
        }
    };

    if (!isTourIdLoaded) {
        return <div>Loading...</div>;  // tourId가 로드될 때까지 로딩 메시지 표시
    }

    return (
    <>
        <Header pageName='게시글 수정'/>
        <AddFormArea id='add-form-area'>
            <TextArea 
                id='text-area' 
                type='text' 
                placeholder='내용을 입력해 주세요'
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
            ></TextArea>
            <LocArea id='loc-check-area'>
                <Checkbox onChange={handleSearch} initalValue={tourId}></Checkbox>
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
                {uploadedImage.map((imageSrc, index) => (
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

export default ModifyForm