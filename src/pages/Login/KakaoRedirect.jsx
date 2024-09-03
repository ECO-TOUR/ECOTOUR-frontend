import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function KakaoRedirect() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('accounts/api/oauth/kakao/usercheck/', {
        code: code,
      })
      .then((secureResponse) => {
        // 만약 유저 정보가 없다면(최초 회원)
        if (secureResponse.data.content.user == null)
          // 회원가입 동의 페이지로 이동
          navigate('/agreement', {
            state: secureResponse.data.content.response_token,
          });
        // 기존 회원이라면 메인으로 이동
        else {
          //console.log(secureResponse.data.content);
          localStorage.setItem("user_id", secureResponse.data.content.user.user_id);
          localStorage.setItem("access_token", secureResponse.data.content.response_token.access_token);
          navigate('/main')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [code, navigate]);

  return <div>로딩중</div>;
}

export default KakaoRedirect;

