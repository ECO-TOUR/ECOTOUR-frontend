import { useEffect, useMemo, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import './MapMain.css';
// component
import BottomSheet from "../../../component/map/BottomSheet/BottomSheet";
import Navbar from '../../../component/Main/Navbar';
import Content from "../../../component/map/Content/Content";
// img
import LocationBtn from '../../../assets/LocationBtn.svg'; // 현위치 버튼
import Marker from '../../../assets/Marker.svg'; // 현위치 아이콘
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilState } from 'recoil';
import { NavAtoms } from '../../../recoil/NavAtoms';
import { StateAtoms } from '../../../recoil/BottomSheetAtoms';

function MapMain() {
  // Nav 변수 설정
  const [highlightedItem, setHighlightedItem] = useRecoilState(NavAtoms);
  const [closeState, setCloseState] = useRecoilState(StateAtoms);

  // 지도의 중심좌표
  const [center, setCenter] = useState({
    lat: null,
    lng: null,
  });

  // 현재 위치
  const [position, setPosition] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    setHighlightedItem("search"); // Nav 변수 설정
    setCloseState(true);

    // 위치 감지
    const handlePosition = (pos) => {
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    };

    // 위치 감지 실패 핸들러
    const handleError = (error) => {
      console.error("위치 정보를 가져오는 데 실패했습니다:", error);
      alert("실시간 위치 정보를 활성화 해주세요.");
    };

    // 위치 가져오기
    navigator.geolocation.getCurrentPosition(handlePosition, handleError);

    // 위치 변경 감지
    const watchId = navigator.geolocation.watchPosition(handlePosition, handleError);

    // Clean up
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const setCenterToMyPosition = () => {
    setCenter(position);
  };

  const updateCenterWhenMapMoved = useMemo(
    () =>
      debounce((map) => {
        setCenter({
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        });
      }, 500),
    []
  );

  const navigate = useNavigate();
  function onClickSearch() {
    navigate('/map-search');
  }

  return (
    <div id="map_main_container">
      <div id="map_main_header_container">지도</div>
      <div className="map_search_container" onClick={onClickSearch}>검색</div>
      <KakaoMap
        id="map"
        center={center}
        style={{
          width: "100%",
          height: "70%",
        }}
        level={2}
        onCenterChanged={updateCenterWhenMapMoved}
      >
        <MapMarker
          image={{
            src: Marker,
            size: { width: 30, height: 30 },
          }}
          position={position}
        />
      </KakaoMap>
      <img src={LocationBtn} className="location_btn" onClick={setCenterToMyPosition} />
      <BottomSheet>
        <Content/>
      </BottomSheet>
      <Navbar />
    </div>
  );
}

export default MapMain;
