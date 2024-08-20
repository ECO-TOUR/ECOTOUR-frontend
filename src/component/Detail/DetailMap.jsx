import { useEffect, useMemo, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

function DetailMap() {

  // 지도의 중심좌표
  const [center, setCenter] = useState({
    lat: 37.5665, // 서울의 기본 위도
    lng: 126.9780, // 서울의 기본 경도
  });

  // 현재 위치
  const [position, setPosition] = useState({
    lat: 37.5665, // 서울의 기본 위도
    lng: 126.9780, // 서울의 기본 경도
  });

  useEffect(() => {

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

  return (
    <div>
      <KakaoMap
        center={center}
        style={{
          width: "100%",
          height: "200px",
        }}
        level={4}
      >
      </KakaoMap>
    </div>
  )
}

export default DetailMap;