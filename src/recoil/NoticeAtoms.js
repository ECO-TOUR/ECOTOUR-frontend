import { atom } from 'recoil';

// 공지사항 제목
export const NoticeTitle = atom({
    key: 'NoticeTitle',
    default: "",
});

// 공지사항 내용
export const NoticeText = atom({
    key: 'NoticeText',
    default: "",
});

// 공지사항 날짜
export const NoticeDate = atom({
    key: 'NoticeDate',
    default: "",
});