import styled from 'styled-components';

// 전체
export const Container = styled.div`
    background-color: white;
    height: 100%;
    padding: 0px 0px 100px 0px;
`;

// 헤더 컴포넌트
export const HeaderComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #D9D9D9;
    width: 370px;
    margin: 0 auto;
`;

// 헤더
export const Header = styled.div`
    font-weight: 800;
    font-size: 19px;
    color: #91EB86;
    text-align: center;
    padding: 20px 0px;
`;

// 뒤로가기 버튼
export const BackBtn = styled.div`
    position: absolute;
    left: 0%;
    cursor: pointer;
`;

// 관광지 사진
export const MainImg = styled.img`
    width: 100%;
    height: 220px;
    margin-top: 13px;
`; 

// 제목 컴포넌트
export const TitleComponent = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`;

// 제목
export const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    margin-left: 25px;
`;

// 좋아요 공유 아이콘 박스
export const IconBox = styled.div`
    margin-right: 30px;
    margin-left: auto;
`;

// 좋아요, 공유 아이콘 이미지
export const IconImg = styled.img`
    margin: 0 10px;
    cursor: pointer;
`;

// 관광지 주소
export const Address = styled.div`
    font-size: 14px;
    color: #676767;
    font-weight: 400;
    margin-top: 19px;
    margin-left: 25px;
    margin-bottom: 15px;
`;

// 구분선
export const Line = styled.div`
    height: 3px;
    width: 100%;
    background-color: #D9D9D9;
    margin: 20px 0px;
`;

// wrap
export const InfoBox = styled.div`
    display: flex;
`;

// 관광지 정보 박스
export const InfoComponent = styled.div`
    margin: 10px 0px;
    flex-grow: 1;
    flex-basis: 0;
`;

// 관광지 정보 헤더
export const InfoHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 30px;
`;

// 관광지 정보 헤더 아이콘
export const InfoIcon = styled.div`
    width: 7px;
    height: 7px;
    background-color: #91EB86;
    border-radius: 30px;
    margin: 0px;
`;

export const InfoTitle = styled.div`
    margin-left: 10px;
    font-size: 17px;
    font-weight: 600;
`;

// 설명
export const InfoText = styled.div`
    color: #333333;
    font-size: 14px;
    font-weight: 300;
    padding: 0px 30px 0px 45px;
    line-height: 1.3;
`;

export const UpImg = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-top: 20px;
    padding: 1px 0px;
`;