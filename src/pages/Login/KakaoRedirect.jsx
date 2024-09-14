import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
          console.log(secureResponse.data.content);
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
              navigate('/main');
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [code, navigate]);
  return <div>로딩중</div>;
}
export default KakaoRedirect;