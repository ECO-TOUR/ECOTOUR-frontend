import { useEffect, useMemo, useState } from "react";
import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

const {kakao} = window;
function DetailMap({ address }) {

  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [searchAddress, SetSearchAddress] = useState(address);
  
  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    
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
        level={3}
      >
        {!state.isLoading && (
          <MapMarker position={state.center}/>
        )}
      </KakaoMap>
    </div>
  )
}

export default DetailMap;