import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './Top5.style';
import exampleImage from '../../../assets/example1.png'; // 이미지 파일을 import
import Arrow from '../../../assets/agreement_arrow.svg';
import { useNavigate } from 'react-router-dom';

function Top5() {
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();

    // API 연결
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/mainpage/api/best/');
                setContents(response.data.content);
                console.log(response.data.content);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
    
        fetchData();
    }, []);

    // 주소 파싱 함수
    function splitLocation(location) {
        const firstSpaceIndex = location.indexOf(' ');
        const secondSpaceIndex = location.indexOf(' ', firstSpaceIndex + 1);

        if (secondSpaceIndex === -1) {
            return { part1: location, part2: '' }; // 두 번째 띄어쓰기가 없는 경우
        }

        const part1 = location.substring(0, secondSpaceIndex);

        return { part1 };
    }

    // 박스 클릭 시
    function onClickBox(tour_id) {
        console.log(tour_id);
        navigate(`/detail/${tour_id}`);
    }

    return (
        <S.Container>
            {contents.map((content, index) => {
                const { part1, part2 } = splitLocation(content.tour_location);

                return (
                    <S.ContentBox key={index} onClick={() => onClickBox(content.tour_id)}>
                        <S.ContentImg src={content.tour_img} />
                        <S.ContentNum>{index + 1}</S.ContentNum>
                        <S.ContentInfo>
                            <S.ContentName>{content.tour_name}</S.ContentName>
                            <S.ContentRegion>{part1}</S.ContentRegion>
                        </S.ContentInfo>
                        <S.Arrow src={Arrow} />
                    </S.ContentBox>
                );
            })}
        </S.Container>
    );
}

export default Top5;
