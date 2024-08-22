import { useEffect, useMemo, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from 'react-router-dom';

const {kakao} = window;
function DetailMap({ address }) {

  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: null, lng: null },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  
  // 주소 변수
  const [searchAddress, SetSearchAddress] = useState(address);
  
  // 주소에 해당하는 마커 표시
  useEffect(() => {
    // 주소를 좌표로 변환한는 함수
    const geocoder = new kakao.maps.services.Geocoder();
    
    // 주소를 좌표로 변환하여 state에 저장
    let callback = function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0]
        setState({
          center: { lat: newSearch.y, lng: newSearch.x }
        })
      }
    };
      geocoder.addressSearch(`${searchAddress}`, callback);
    }, [])
  
  return (
    <div>
      <KakaoMap
        center={state.center}
        isPanto={state.isPanto}
        style={{
          width: "100%",
          height: "200px",
        }}
        level={2}
      >
        <MapMarker position={state.center}/>
      </KakaoMap>
    </div>
  )
}

export default DetailMap;