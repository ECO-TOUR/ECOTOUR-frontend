import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function KakaoRedirect() {

    const code = new URL(document.location.toString()).searchParams.get('code');
    const navigate = useNavigate();
  
    useEffect(() => {
        console.log(code);
        axios.post('/accounts/api/oauth/kakao/login', {
            headers: {
              Authorization: code,
              'Content-Type': 'application/json' 
            }
          }).then((secureResponse) => {
            console.log(secureResponse.data);
            // 성공적으로 로그인했다면 다음 페이지로 이동
          }).catch((error) => {
            console.error(error);
          });
    }, []);

  return (
    <div>로딩중</div>
  )
}

export default KakaoRedirect