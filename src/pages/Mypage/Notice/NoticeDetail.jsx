import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as S from './Notice.style';
// img
import { ReactComponent as BackBtn } from '../../../assets/back_btn.svg';
// 컴포넌트
import Navbar from '../../../component/main/Navbar';
// recoil
import { useRecoilValue } from 'recoil';
import { NoticeTitle, NoticeDate, NoticeText} from '../../../recoil/NoticeAtoms';

function NoticeDetail() {

    const navigate = useNavigate();
    const title = useRecoilValue(NoticeTitle);
    const date = useRecoilValue(NoticeDate);
    const text = useRecoilValue(NoticeText);

    // 뒤로가기 버튼 클릭 시
    function onClickBackBtn(){
        navigate('/notice');
    }

    // 목록 클릭 시
    function onClickNotice(){
        navigate('/notice');
    }

  return (
    <div>
        <S.Header_container>
            <S.BackBtn onClick={onClickBackBtn}>
                <BackBtn />
            </S.BackBtn>
            공지사항
        </S.Header_container>
        <S.MainContainer>
            <S.NoticeDetailTitle>{title}</S.NoticeDetailTitle>
            <S.NoticeDetailDate>등록일 | {date}</S.NoticeDetailDate>
            <S.NoticeDetailText>{text}</S.NoticeDetailText>
            <S.NoticeDetailBottom onClick={onClickNotice}>목록</S.NoticeDetailBottom>
        </S.MainContainer>
        <Navbar/>
    </div>
  )
}

export default NoticeDetail