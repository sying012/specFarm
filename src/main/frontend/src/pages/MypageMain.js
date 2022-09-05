import React, { useState } from "react";
import { Route, Routes } from "react-router";
import HalfFrame from "../components/mypage/HalfFrame";
import Frames from "../components/mypage/Frames";
import Profile from "../components/mypage/Profile";

import styles from "../styles/mypage/MypageMain.module.css";

function MypageMain() {
  const [user, setUser] = useState({
    userId: "thisisId",
    userPw: "dd",
    userName: "조유미",
    userTel: "010-0000-0000",
    userEmail: "801@bitcamp.com",
    nickname: "박대리",
    profilePath: "",
  });

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
      shareTitle: "나눔해요1",
      userId: "당근",
      regDate: "2022.08.01",
      content: "aaaa",
      itemImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
      shareState: 0,
    },
    {
      id: 2,
      shareTitle: "나눔해요2",
      userId: "당근",
      regDate: "2022.08.02",
      content:
        "aaaaㅇㅇㅇㅇㅇㅇㅇ아아아앙아아아아아아아아아아ㅏ앙아ㅏㅇ아아아아아아아아아아앙아아ㅏ아아앙ㅇ닫러재ㅑㄷ뤄마뎌ㅣㄱㅎㅍㄷ구 판어푸냎 아앙ㅇ닫러재ㅑㄷ뤄마뎌ㅣㄱㅎㅍㄷ구 판어푸냎ㄷ잘채ㅔㅈ긍파ㅡㄴㅇ",
      itemImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
      shareState: 1,
    },
    {
      id: 3,
      shareTitle: "나눔해요3",
      userId: "당근",
      regDate: "2022.08.03",
      content: "aaaa",
      itemImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
      shareState: 0,
    },
    {
      id: 4,
      shareTitle: "나눔해요4",
      userId: "당근",
      regDate: "2022.08.04",
      content: "aaaa",
      itemImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
      shareState: 1,
    },
  ]);

  const [attrCerts, setAttrCerts] = useState([
    { id: 1, certId:"1122", certName: "사회복지사1급" },
    { id: 2, certId:"1234", certName: "전기어쩌구자격증" },
    { id: 3, certId:"1452", certName: "정보처리기사" },
    { id: 4, certId:"1172", certName: "전기어쩌구자격증" },
  ]);

  return (
    <div className={styles.mypageMain}>
      <Profile certs={certs} user={user} />
      <div className={styles.mypageFrame}>
        <Routes>
          <Route
            path="/userinfo"
            element={
              <HalfFrame text="회원정보 수정" certs={certs} user={user} />
            }
          />
          <Route
            path="/written"
            element={
              <HalfFrame
                text="내가 쓴 글"
                asks={asks}
                shares={shares}
                user={user}
              />
            }
          />
          <Route
            path="/resetpassword"
            element={<HalfFrame text="비밀번호 변경" user={user} />}
          />
          <Route
            path="/"
            element={
              <Frames user={user} certs={certs} asks={asks} shares={shares} attrCerts={attrCerts} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default MypageMain;
