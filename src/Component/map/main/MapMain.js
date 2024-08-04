import { useEffect, useMemo, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import './MapMain.css';
import BottomSheet from "../buttomSheet/ButtomSheet";
import LocationBtn from '../../../assets/LocationBtn.svg'; // 현위치 버튼
import Marker from '../../../assets/Marker.svg'; // 현위치 아이콘

function MapMain() {

  // 지도의 중심좌표
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  // 현재 위치
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  // 지도가 처음 렌더링되면 중심좌표를 현위치로 설정하고 위치 변화 감지
  useEffect(() => {

    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });

    navigator.geolocation.watchPosition((pos) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, []);

  return (
    <div id="map_main_container">
      <div id="map_main_header_container">지도</div>
      <div class="map_search_container">검색</div>
      <KakaoMap // 지도를 표시할 Container
        id="map"
        center={center}
        style={{
          width: "100%",
          height: "50%",
        }}
        level={4} // 지도의 확대 레벨
      >
        {/* 현위치 마커 */}
        <MapMarker
          image={{
            src: Marker,
            size: { width: 30, height: 30 },
          }}
          position={position}
        />
      </KakaoMap>
      <img src={LocationBtn} class="location_btn" />
      <BottomSheet>
        <span>Content</span>
      </BottomSheet>
    </div>
  )
}

export default MapMain;