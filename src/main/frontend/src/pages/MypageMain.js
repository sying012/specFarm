import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HalfFrame from "../components/mypage/HalfFrame";
import Frames from "../components/mypage/Frames";
import Profile from "../components/mypage/Profile";
import axios from "axios";
import { API_BASE_URL } from "../app-config";

import styles from "../styles/mypage/MypageMain.module.css";

function MypageMain() {
  const [user, setUser] = useState({});
  const [certs, setCerts] = useState([]);
  const [asks, setAsks] = useState([]);
  const [shares, setShares] = useState([]);
  const [attrCerts, setAttrCerts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/mypage",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((response) => {
        if (response) {
          console.log(response);
          setUser(response.data.user);
          setCerts(response.data.earnedCert);
          setAsks(response.data.writtenAsks);
          setShares(response.data.writtenShares);
          setAttrCerts(response.data.favCerts);
        }
      })
      .catch((e) => {
        console.log("catch문 " + e);
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className={styles.mypageMain}>
      <Profile certs={certs} user={user} />
      <div className={styles.mypageFrame}>
        <Routes>
          <Route
            path="/userinfo"
            element={
              <HalfFrame text="농부 정보 수정" certs={certs} user={user} />
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
              <Frames
                user={user}
                certs={certs}
                asks={asks}
                shares={shares}
                attrCerts={attrCerts}
                setAttrCerts={setAttrCerts}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default MypageMain;
