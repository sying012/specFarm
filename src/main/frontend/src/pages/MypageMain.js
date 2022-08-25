import React from "react";
import Frames from "../components/mypage/Frames";
import Profile from "../components/mypage/Profile";

import "../styles/mypage/MypageMain.css";

function MypageMain() {
  return (
    <div className="mypageMain">
      <Profile />
      <div className="mypageFrame">
        <Frames />
      </div>
    </div>
  );
}

export default MypageMain;
