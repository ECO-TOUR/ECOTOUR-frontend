import React, {useState, useEffect} from 'react';
import exampleImage from '../../assets/example1.png'; // 이미지 파일을 import
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Component = styled.div`
    padding-top: 10px;
    display: flex;
    overflow-x: auto;
`;

const ContentBox = styled.div`
    border-radius: 10px;
    border: 1px solid #D9D9D9;
    width: 174px;
    height: 164px;
    flex-shrink: 0;
    margin: 0 5px;
    cursor: pointer;
`;

const ContentImage = styled.img`
    border-radius: 9px 9px 0px 0px;
    width: 172.5px;
    height: 100px;
`;

const ContentName = styled.div`
    font-weight: 600;
    font-size: 15px;
    padding: 7px 9px 4px 9px;
`;

const ContentRegion = styled.div`
    color: #676767;
    font-size: 12px;
    font-weight: 400;
    padding: 0px 9px;
`;

const ScoreContainer = styled.div`
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    gap: 5px;
    margin-left: 108px;
`;

const ScoreIcon = styled.div`
    width: 7px;
    height: 7px;
    background-color: #91EB86;
    border-radius: 30px;
`;

const ScoreText = styled.div`
    color: #676767;
    font-size: 11px;
`;

function Recommend() {
    const [posts, setPosts] = useState([]);
    const userId = 5;

    useEffect(() => {
        const getPost = () =>{
            axios.get(`/community/api/mypost/${userId}/`)
            .then(response => {
                console.log("🚀 ~ getPost ~ response:", response)
                // setPosts(response.data.content); 
              })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
        };
        
        getPost();
    }, []);
    

    const navigate = useNavigate();

    const onClickBox = (id) => {
        navigate(`/detail/${id}`);
    };
    
    return (
        <Component id='component'>
            {/* {contents.map((content) => (
                <ContentBox key={content.id} onClick={() => onClickBox(content.id)}>
                    <ContentImage src={exampleImage} />
                    <ContentName>{content.name}</ContentName>
                    <ContentRegion>{content.region}</ContentRegion>
                    <ScoreContainer>
                        <ScoreIcon />
                        <ScoreText>{content.score} ({content.reviews})</ScoreText>
                    </ScoreContainer>
                </ContentBox>
            ))} */}
        </Component>
    );
}

export default Recommend;
