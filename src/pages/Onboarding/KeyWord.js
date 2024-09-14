import React, { useState } from 'react'
import axios from 'axios';
import './KeyWord.css';
import { useNavigate } from 'react-router-dom';

function KeyWord() {

    // 각 키워드 버튼의 클릭 상태를 관리하는 state
    const [clickedStates, setClickedStates] = useState(Array(8).fill(false));

    // 선택된 키워드들을 저장하는 state
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const access_token = localStorage.getItem('access_token');

    // 키워드 배열 정의
    const keywords = ['섬', '천연기념물', '생태교육', '산', '국립공원', '과학관', '박물관', '바다'];

    // 키워드 클릭 시 상태를 토글하는 함수
    const handleButtonClick = (index) => {
        const newClickedStates = [...clickedStates];
        newClickedStates[index] = !newClickedStates[index];
        setClickedStates(newClickedStates);

        const selectedKeyword = keywords[index];
        const newSelectedKeywords = newClickedStates[index]
            ? [...selectedKeywords, selectedKeyword] // 선택된 키워드를 추가
            : selectedKeywords.filter(keyword => keyword !== selectedKeyword); // 선택 해제된 키워드를 제거

        setSelectedKeywords(newSelectedKeywords);
    };

    // 다음 버튼 클릭 시
    const navigate = useNavigate();

    const onClickNextBtn = () => {
        if(selectedKeywords.length === 0){
            alert("키워드를 1개 이상 선택해주세요!");
        }
        else{
            console.log(access_token);
            axios.post('/accounts/api/preference/', 
                { preference: selectedKeywords },  // 두 번째 인자는 전송할 데이터
                { headers: { 'Authorization': `Bearer ${access_token}` } }  // 세 번째 인자는 옵션 (headers 포함)
            )
              .then(response => {
                console.log(response.data);
                navigate("/intro");
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
        }
    }

  return (
    <div className="keyword_container">
        <div className="keyword_title">
            선호하는 관광키워드를 <br/>
            선택해주세요
        </div>
        <div className="keyword_text">선택한 키워드와 관련된 생태 관광지를 추천해 드릴게요.<br/>1개 이상 선택해주세요.</div>
        <div className="keyword_wrap">
            {Array.from({ length: 4 }, (_, rowIndex) => (
            <div className="keyword_row" key={rowIndex}>
                {Array.from({ length: 2 }, (_, colIndex) => {
                const index = rowIndex * 2 + colIndex;
                return (
                    <div 
                    className={`keyword_box ${clickedStates[index] ? 'clicked' : ''}`} 
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    >
                    {keywords[index]}
                    </div>
                );
                })}
            </div>
            ))}
        </div>

        <div id="next_btn" onClick={onClickNextBtn}>다음</div>
    </div>
  )
}

export default KeyWord;
