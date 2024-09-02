import React, { useState } from 'react'
import axios from 'axios';
import './KeyWord.css';
import { useNavigate } from 'react-router-dom';

function KeyWord() {

    // 각 키워드 버튼의 클릭 상태를 관리하는 state
    const [clickedStates, setClickedStates] = useState(Array(8).fill(false));

    // 선택한 키워드 개수
    const [keywordCount, setKeywordCount] = useState(0);

    // 키워드 배열 정의
    const keywords = ['섬', '천연기념물', '생태교육', '산', '국립공원', '과학관', '박물관', '바다'];

    // 키워드 클릭 시 상태를 토글하는 함수
    const handleButtonClick = (index) => {
        const newClickedStates = [...clickedStates];
        newClickedStates[index] = !newClickedStates[index];
        setClickedStates(newClickedStates);

        // 선택된 키워드의 개수를 계산하여 업데이트
        const count = newClickedStates.filter(state => state).length;
        setKeywordCount(count);
    };

    // 다음 버튼 클릭 시
    const navigate = useNavigate();

    const onClickNextBtn = () => {
        if(keywordCount === 0){
            alert("키워드를 1개 이상 선택해주세요!");
        }
        else{
            axios.post('//accounts/api/preference/', {
                // headers: {
                //   'Content-Type': 'text/plain', // 또는 원하는 MIME 타입을 문자열로 지정
                // },
              })
              .then(response => {
                console.log(response.data);
                //navigate("/intro");
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
        }
    }

  return (
    <div class="keyword_container">
        <div class="keyword_title">
            선호하는 관광키워드를 <br/>
            선택해주세요
        </div>
        <div class="keyword_text">선택한 키워드와 관련된 생태 관광지를 추천해 드릴게요.<br/>1개 이상 선택해주세요.</div>
        <div class="keyword_wrap">
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