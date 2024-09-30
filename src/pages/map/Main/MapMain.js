import { useEffect, useMemo, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Map as KakaoMap, MapMarker, useMap } from "react-kakao-maps-sdk";
import Papa from 'papaparse';
import './MapMain.css';
import axios from "axios";
// component
import BottomSheet from "../../../component/map/BottomSheet/BottomSheet";
import Navbar from '../../../component/main/Navbar';
import Content from "../../../component/map/Content/Content";
// img
import LocationBtn from '../../../assets/LocationBtn.svg'; // 현위치 버튼
import Marker from '../../../assets/Marker.svg'; // 현위치 아이콘
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { NavAtoms } from '../../../recoil/NavAtoms';
import { StateAtoms } from '../../../recoil/BottomSheetAtoms';
import { recentSearchesState } from '../../../recoil/SearchesAtoms';
import { likedState, mapXY, searchValueState } from '../../../recoil/SearchesAtoms';

const EventMarkerContainer = ({ position, content, tourName }) => {
  const map = useMap()
  const [isVisible, setIsVisible] = useState(false)
  const [, setSearchResult] = useRecoilState(recentSearchesState);
  const [, setLiked] = useRecoilState(likedState); // 좋아요 상태 관리 변수

  // 마커 클릭 이벤트 핸들러
  const handleMarkerClick = (marker) => {
    map.panTo(marker.getPosition());
    // 검색 API 호출 로직 추가
    searchAPI(tourName);
  };

  // 검색 API 호출 함수
  const searchAPI = async (tourName) => {

    const access_token = localStorage.getItem("access_token");
    
    try {
      const response = await axios.get(`/place`, {
        params: { search: tourName, },
        headers: {
          'Authorization': `Bearer ${access_token}`, // Bearer 토큰 방식으로 추가
        },
      });

      setSearchResult(response.data.search_results || [])
      const initialLikedState = response.data.search_results.map(content => content.tourspot_liked === "liked");
      setLiked(initialLikedState);
    } catch (error) {
      console.error('검색 API 호출 오류:', error);
    }
  };

  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      // @ts-ignore
      onClick={(marker) => handleMarkerClick(marker)}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && content}
    </MapMarker>
  )
}

function MapMain() {
  
  const [data, setData] = useState([]);
  const [mapXy, setMapXy] = useRecoilState(mapXY); // 검색 결과 표시할 관광지 위경도 정보
  const searchValue = useRecoilValue(searchValueState); // 검색어

  useEffect(() => {
    // CSV 파일 경로
    const csvFilePath = '/TourPlace_trans_xy.csv';
    // CSV 파일을 가져와서 파싱
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true, // 첫 번째 줄을 헤더로 간주
          complete: (result) => {
            // 데이터 변환
            const parsedData = result.data.map(row => ({
              content: <div style={{ color: "#000" }}>{row.tour_name}</div>,
              latlng: { lat: parseFloat(row.tour_y), lng: parseFloat(row.tour_x) },
              tourName: row.tour_name, // tour_name 정보를 추가
            }));
            setData(parsedData);
          }
        });
      });
  }, []);

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
      <div className="map_search_container" onClick={onClickSearch}>{searchValue === '' ? "검색" : searchValue}</div>
      <KakaoMap
        id="map"
        center={center}
        style={{
          width: "100%",
          height: "70%",
        }}
        level={9}
        onCenterChanged={updateCenterWhenMapMoved}
      >
        <MapMarker
          image={{
            src: Marker,
            size: { width: 30, height: 30 },
          }}
          position={position}
        />
      {mapXy.length === 0 ? (
        // mapXy 배열이 비어있을 경우 data 배열 출력
        data.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            content={value.content}
            tourName={value.tourName}
          />
        ))
      ) : (
        // mapXy 배열이 있을 경우
        mapXy.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            content={value.content}
            tourName={value.tourName}
          />
        ))
      )}
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
