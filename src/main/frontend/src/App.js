import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import FindUser from "./pages/FindUser";
import CertMain from "./pages/CertMain";
import SkillsMain from "./pages/SkillsMain";
import JobCafe from "./pages/JobCafe";
import FindCourse from "./pages/FindCourse";
import CommunityMain from "./pages/CommunityMain";
import Study from "./pages/Study";
import Ask from "./pages/Ask";
import Share from "./pages/Share";
import NoticeMain from "./pages/NoticeMain";
import FAQ from "./pages/FAQ";
import Lost from "./pages/Lost";
import MypageMain from "./pages/MypageMain";
import NotFound from "./pages/NotFound";
import Deactivate from "./components/mypage/Deactivate";
import ProfileMdf from "./components/mypage/ProfileMdf";
import CheckPw from "./components/mypage/CheckPw";
import CertFind from "./components/cert/CertFind";

function App() {
  return (
    <Routes>
      <Route exact path="/oauth2/code/*" element={<Login />} />
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/finduser" element={<FindUser />}></Route>

      <Route element={<Layout />}>
        <Route path="/cert" element={<CertMain />}></Route>
        <Route path="/certfind" element={<CertFind />}></Route>

        <Route path="/skills" element={<SkillsMain />}></Route>
        <Route path="/skills/jobcafe/*" element={<JobCafe />}></Route>
        <Route path="/skills/findcourse/*" element={<FindCourse />}></Route>

        <Route path="/community" element={<CommunityMain />}></Route>
        <Route path="/community/study/*" element={<Study />}></Route>
        <Route path="/community/ask/*" element={<Ask />}></Route>
        <Route path="/community/share/*" element={<Share />}></Route>

        <Route path="/cs/*" element={<NoticeMain />}></Route>
        <Route path="/cs/faq" element={<FAQ />}></Route>
        <Route path="/cs/lost/*" element={<Lost />}></Route>

        <Route path="/mypage/*" element={<MypageMain />}></Route>
        <Route path="/mypage/deactivate" element={<Deactivate />}></Route>
        <Route path="/mypage/pwcheck" element={<CheckPw />}></Route>
        <Route path="/mypage/modify" element={<ProfileMdf />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
