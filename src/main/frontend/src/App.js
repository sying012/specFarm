import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import { Home } from "@mui/icons-material";
import Login from "./pages/Login";
import Join from "./pages/Join";
import FindUser from "./pages/FindUser";
import CertMain from "./pages/CertMain";
import SeminarMain from "./pages/SeminarMain";
import CommunityMain from "./pages/CommunityMain";
import Study from "./pages/Study";
import Ask from "./pages/Ask";
import Share from "./pages/Share";
import NoticeMain from "./pages/NoticeMain";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import ProfileMdf from "./pages/ProfileMdf";
import Lost from "./pages/Lost";
import MypageMain from "./pages/MypageMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/finduser" element={<FindUser />}></Route>

      <Route element={<Layout />}>
        <Route path="/cert" element={<CertMain />}></Route>

        <Route path="/seminar" element={<SeminarMain />}></Route>

        <Route path="/community" element={<CommunityMain />}></Route>
        <Route path="/community/study" element={<Study />}></Route>
        <Route path="/community/ask" element={<Ask />}></Route>
        <Route path="/community/share" element={<Share />}></Route>

        <Route path="/notice" element={<NoticeMain />}></Route>
        <Route path="/notice/faq" element={<FAQ />}></Route>
        <Route path="/notice/lost" element={<Lost />}></Route>

        <Route path="/mypage" element={<MypageMain />}></Route>
        <Route path="/mypage/modify" element={<ProfileMdf />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
