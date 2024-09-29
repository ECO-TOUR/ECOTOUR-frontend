import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// 컴포넌트
import LoadingPage from '../Loading/Loading';
// Function to get the CSRF token from the cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
function KakaoRedirect() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();

  // 현재 URL에서 쿼리 파라미터 추출
  const urlParams = new URLSearchParams(window.location.search);

  // 'state' 쿼리 파라미터 값 추출
  const extractedState = urlParams.get('state');
  const decodedState = JSON.parse(decodeURIComponent(extractedState)); // 디코딩 후 JSON 파싱

  useEffect(() => {
    const csrfToken = getCookie('csrftoken');
    axios
      .post(
        'accounts/api/oauth/kakao/usercheck/',
        {
          code: code,
        },
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Send cookies with the request
        }
      )
      .then((secureResponse) => {
        // 만약 유저 정보가 없다면(최초 회원)
        if (secureResponse.data.content.user == null)
          // 회원가입 동의 페이지로 이동
          navigate('/agreement', {
            state: secureResponse.data.content.response_token,
          });
        // 기존 회원이라면 메인으로 이동
        else {
          axios
            .post('/accounts/api/oauth/kakao/login/', {
              body: secureResponse.data.content.response_token,
              headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
              },
              withCredentials: true, // Send cookies with the request
            })
            .then((res) => {
              localStorage.setItem(
                'user_id',
                res.data.content.user.user_id // Correct way to access the user data
              );
              localStorage.setItem(
                'access_token',
                res.data.content.access_token // Correct way to access the access token
              );
              localStorage.setItem('nickname', res.data.content.user.nickname);
              
              if(decodedState === null){
                navigate("/main");
              }
              else{
                navigate(decodedState);
              }
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [code, navigate, decodedState]);
  
  return <div><LoadingPage text="로그인 중입니다."/></div>;
}
export default KakaoRedirect;