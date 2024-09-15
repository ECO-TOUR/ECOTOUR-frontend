import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './Notice.style';
// 컴포넌트
import Navbar from '../../../component/main/Navbar';
// img
import { ReactComponent as BackBtn } from '../../../assets/back_btn.svg';
// recoil
import { useRecoilState } from 'recoil';
import { NoticeTitle, NoticeDate, NoticeText} from '../../../recoil/NoticeAtoms';

function Notice() {

    const navigate = useNavigate();
    const [contents, setContents] = useState([]);
    const [title, setTitle] = useRecoilState(NoticeTitle);
    const [date, setDate] = useRecoilState(NoticeDate);
    const [text, setText] = useRecoilState(NoticeText);

    // API 연결
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/mypage/api/notiinqure/');
                setContents(response.data.content);
                //console.log(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // 뒤로가기 버튼 클릭 시
    function onClickBackBtn(){
        navigate('/mypage');
    }

    function onClickNotice(notice_id, notice_title, notice_date, notice_text){
        // 전역변수 설정
        setTitle(notice_title);
        setDate(notice_date);
        setText(notice_text);
        navigate(`${notice_id}`);
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
        {contents.map((content, index) => {
            return (
                <S.NoticeBox onClick={() => {onClickNotice(content.noti_id, content.noti_title, content.noti_date, content.noti_text)}}>
                    <S.NoticeTitle>{content.noti_title}</S.NoticeTitle>
                    <S.NoticeDate>{content.noti_date}</S.NoticeDate>
                </S.NoticeBox>
            );
        })}
        </S.MainContainer>
        <Navbar/>
    </div>
  )
}

export default Notice