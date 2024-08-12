import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Login from './component/Login/Login.js';
import Agreement from './component/Agreement/Agreement.js'
import Home from './component/Main/Home.js';
import Mypage from './component/Mypage/Mypage.js';
import Intro from './component/Onboarding/Intro.js';
import Community from './component/Community/Community.js'
import KeyWord from './component/Onboarding/KeyWord.js';
import AddForm  from './component/Community/AddForm.js';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/agreement" element={<Agreement />} />
            <Route path="/key-word" element={<KeyWord />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/main" element={<Home />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/addform" element={<AddForm />} />

          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
