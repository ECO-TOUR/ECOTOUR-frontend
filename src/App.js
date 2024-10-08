import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

//page
import Mypage from './pages/Mypage/Mypage.js';
import Notice from './pages/Mypage/Notice/Notice';
import NoticeDetail from './pages/Mypage/Notice/NoticeDetail';
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
import MyPosts from './pages/Mypage/MyPosts.js'
// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
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
            <Route path="/detail/:tour_id" element={<Detail />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/:notice_id" element={<NoticeDetail />} />
            <Route path="/myposts" element={<MyPosts />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
    </>
  );
}

export default App;
