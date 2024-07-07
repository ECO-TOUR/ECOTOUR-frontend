import React, { useEffect } from 'react'
import './MapMain.css';
import BottomSheet from "../buttomSheet/ButtomSheet";
import LocationBtn from '../../../assets/LocationBtn.svg';

const {kakao} = window;

function MapMain() {

  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  },[])

  return (
    <div id="map_main_container">
      <div id="map_main_header_container">지도</div>
      <div class="map_search_container">검색</div>
      <div id="map" style={{width: '400px', height: '350px'}}></div>
      <img src={LocationBtn} class="location_btn"/>

      <BottomSheet>
        <span>Content</span>
      </BottomSheet>
    </div>
  )
}

export default MapMain;