import React, { useState } from "react";
import { Route, Routes } from "react-router";
import HalfFrame from "../components/mypage/HalfFrame";
import Frames from "../components/mypage/Frames";
import Profile from "../components/mypage/Profile";

import styles from "../styles/mypage/MypageMain.module.css";

function MypageMain() {
  const [certs, setCerts] = useState([
    { id: 1, certName: "정보처리기사", earnedDate: "2022.08.30" },
    { id: 2, certName: "전기어쩌구자격증", earnedDate: "2021.07.22" },
    { id: 3, certName: "정보처리기사", earnedDate: "2022.08.30" },
    { id: 4, certName: "전기어쩌구자격증", earnedDate: "2021.07.22" },
  ]);

  const [asks, setAsks] = useState([
    {
      id: 1,
      askTitle: "제목11111111",
      askContent: "내용아러ㅣ너러ㅣㅏ너ㅘㄴsdkhflskjlfsjdf kdhfs",
      askRegDate: "2022.08.24 10:56 AM",
      aCount: 12,
      certIdx: "정보처리기사",
    },
    {
      id: 2,
      askTitle: "제목11111111",
      askContent: "내용아러ㅣ너러ㅣㅏ너ㅘㄴsdkhflskjlfsjdf kdhfs",
      askRegDate: "2022.08.24 10:56 AM",
      aCount: 12,
      certIdx: "정보처리기사",
    },
  ]);

  const [shares, setShares] = useState([
    {
      id: 1,
      shareTitle: "나눔제목1",
      shareContent:
        "나눔내용 나눔내용 나눔내용나눔내용 나눔내용나눔내용나눔내용 나눔내용나눔내용나눔내용 나눔내용나눔내용나눔내용 나눔내용나눔내용나눔내용 나눔내용나눔내용나눔내용 나눔내용나눔내용나눔내용",
      shareRegDate: "2022.08.29 11:34 AM",
      shareFilePath: "/upload/share/corn.png",
    },
    {
      id: 2,
      shareTitle: "나눔제목2",
      shareContent:
        "나눔내용 나눔내용 나눔내용나눔내용 나눔내용나눔내용 나눔내용나눔내용 나눔내용나눔내용 나눔내용나눔내용나눔내용",
      shareRegDate: "2022.08.29 12:34 AM",
      shareFilePath: "/upload/share/cherries.png",
    },
  ]);

  return (
    <div className={styles.mypageMain}>
      <Profile certs={certs} />
      <div className={styles.mypageFrame}>
        <Routes>
          <Route
            path="/userinfo"
            element={<HalfFrame text="회원정보 수정" certs={certs} />}
          />
          <Route
            path="/written"
            element={
              <HalfFrame text="내가 쓴 글" asks={asks} shares={shares} />
            }
          />
          <Route
            path="/resetpassword"
            element={<HalfFrame text="비밀번호 변경" />}
          />
          <Route
            path="/"
            element={<Frames certs={certs} asks={asks} shares={shares} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default MypageMain;
