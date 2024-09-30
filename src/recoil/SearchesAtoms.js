import { atom } from 'recoil';

export const recentSearchesState = atom({
  key: 'recentSearchesState', // 유일한 ID
  default: [], // 기본값은 빈 배열
});

// 지도 검색시 좋아요 변수
export const likedState = atom({
  key: 'likedState',
  default: [], // default is an empty array
});

// 커뮤니티 관광지 검색
export const communitySearchValue = atom({
  key: 'communitySearchValue',
  default: '',
});

// 관광지 위경도
export const mapXY = atom({
  key: 'mapXY',
  default: []
});