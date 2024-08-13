import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-1Thin.woff') format('woff'); 
	font-weight: 100; 
	font-style: normal; 
}
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-2ExtraLight.woff') format('woff'); 
	font-weight: 200; 
	font-style: normal; 
}
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff'); 
	font-weight: 300; 
	font-style: normal; 
}
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff'); 
	font-weight: 400; 
	font-style: normal; 
}
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff'); 
	font-weight: 500; 
	font-style: normal; 
}
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff'); 
	font-weight: 600; 
	font-style: normal; 
}
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff'); 
	font-weight: 700; 
	font-style: normal; 
}
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff'); 
	font-weight: 800; 
	font-style: normal; 
}
@font-face { 
	font-family: 'S-CoreDream'; 
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff') format('woff'); 
	font-weight: 900; 
	font-style: normal; 
}

body{

}

  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  max-width: 430px; /* 모바일 환경에 맞춰 최대 너비를 430px로 고정 */
  background-color: white;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
html,body, input, button {
  line-height: 1;
  max-width: 430px; /* 모바일 환경에 맞춰 최대 너비를 430px로 고정 */
  background-color: #f2f2f2;
  overflow-x: hidden;
  font-family: 'S-CoreDream';
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

/* 웹킷 브라우저에서 스크롤바 숨기기 */
::-webkit-scrollbar {
  width: 0; /* 수평 스크롤바 숨기기 */
  height: 0; /* 수직 스크롤바 숨기기 */
}

div, img {
  height: auto; /* height를 자동으로 설정 */
  background: none;
}

#root {
  position: relative;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color:inherit;
}

button {
  cursor: pointer;
}

input {
  outline: none;
}

`;