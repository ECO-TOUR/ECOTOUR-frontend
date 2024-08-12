import { atom } from 'recoil';

// 공통 질문 유무
export const NavAtom = atom<string>({
    key: 'NavAtom',
    default: "home",
});