import { atom } from 'recoil';

export const recentSearchesState = atom({
  key: 'recentSearchesState', // 유일한 ID
  default: [], // 기본값은 빈 배열
});