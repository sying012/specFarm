import React from "react";
import { Route, Routes } from "react-router";
import Frame from "../components/mypage/Frame";
import Frames from "../components/mypage/Frames";
import Profile from "../components/mypage/Profile";

import styles from "../styles/mypage/MypageMain.module.css";

function MypageMain() {
  return (
    <div className={styles.mypageMain}>
      <Profile />
      <div className={styles.mypageFrame}>
        <Routes>
          <Route
            path="/userinfo"
            element={<Frame text="회원정보 수정"></Frame>}
          />
          <Route path="/written" element={<Frame text="내가 쓴 글"></Frame>} />
          <Route path="/" element={<Frames />} />
        </Routes>
      </div>
    </div>
  );
}

export default MypageMain;
