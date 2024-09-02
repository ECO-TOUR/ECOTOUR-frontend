import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function KakaoRedirect() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(code);
    axios
      .post('accounts/api/oauth/kakao/usercheck/', {
        headers: {
          'Content-Type': 'application/json',
        },
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
          // 성공적으로 로그인했다면 다음 페이지로 이동
          //console.log(secureResponse.data.content.user);
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

