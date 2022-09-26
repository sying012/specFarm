import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
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
import CertFind from "./components/cert/CertFind";
import SocialLogin from "./components/login/SocialLogin";
import { useEffect, useState } from "react";
import BigFrame from "./components/mypage/BigFrame";
import Admin from "./pages/Admin";
import Help from "./pages/Help";
import PrivateRoute from "./lib/PrivateRoute";

function App() {
  const location = useLocation();
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/join" &&
      location.pathname !== "/findUser"
    ) {
      setPathname(location.pathname);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route exact path="/oauth2/code/*" element={<SocialLogin />} />
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login pathname={pathname} />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/finduser" element={<FindUser />}></Route>

      <Route element={<Layout />}>
        <Route path="/cert" element={<CertMain />}></Route>
        <Route path="/cert/certfind/*" element={<CertFind />}></Route>

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
        <Route
          path="/cs/help/*"
          element={<PrivateRoute component={Help} />}
        ></Route>

        <Route
          path="/mypage/*"
          element={<PrivateRoute component={MypageMain} />}
        ></Route>
        <Route
          path="/mypage/modify"
          element={<PrivateRoute component={BigFrame} text="프로필 수정" />}
        ></Route>
        <Route
          path="/mypage/deactivate"
          element={<PrivateRoute component={BigFrame} text="회원탈퇴" />}
        ></Route>
        <Route
          path="/mypage/pwcheck"
          element={<PrivateRoute component={BigFrame} text="비밀번호 확인" />}
        ></Route>

        <Route path="/admin/*" element={<Admin />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
