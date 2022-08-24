import logo from "./logo.svg";
import "./App.css";
import { BrowseRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

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
        <Route path="/faq" element={<FAQ />}></Route>
        <Route path="/lost" element={<Lost />}></Route>

        <Route path="/mypage" element={<MypageMain />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
