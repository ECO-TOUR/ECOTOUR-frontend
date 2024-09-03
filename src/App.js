import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './GlobalStyle';

//page
import Mypage from './pages/Mypage/Mypage.js';
import Community from './pages/Community/Community.js';
import AddForm  from './pages/Community/AddForm.js';
import ModifyForm from './pages/Community/ModifyForm.js';
import Post from './pages/Community/Post.js'
import Login from './pages/Login/Login';
import Agreement from './pages/Agreement/Agreement'
import KeyWord from './pages/Onboarding/KeyWord.js';
import Intro from './pages/Onboarding/Intro';
import MapMain from './pages/map/Main/MapMain';
import MapSearch from './pages/map/Search/MapSearch.jsx';
import Home from'./pages/Main/Home'
import LikeMain from './pages/Like/LikeMain.js'
import Detail from './pages/Detail/Detail';
import KakaoRedirect from './pages/Login/KakaoRedirect';

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/agreement" element={<Agreement />} />
            <Route path='/auth' element={<KakaoRedirect />} />
            <Route path="/key-word" element={<KeyWord />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/main" element={<Home />} />
            <Route path="/map-main" element={<MapMain />} />
            <Route path="/map-search" element={<MapSearch />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/addform" element={<AddForm />} />
            <Route path="/community/modifyform/:postId" element={<ModifyForm />} />
            <Route path="/community/post/:postId" element={<Post />} />
            <Route path="/like" element={<LikeMain />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
