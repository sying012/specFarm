import React, { useState, useEffect } from "react";
import "../styles/notice/notice.css";
import NoticeList from "../components/notice/NoticeList";
import RegNotice from "../components/notice/RegNotice";
import NoticeDetail from "../components/notice/NoticeDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PrivateRoute from "../lib/PrivateRoute";
import { API_BASE_URL } from "../app-config";

import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const NoticeMain = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/community/ask/getUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        setUser(response.data.user);
      });
  }, [sessionStorage.getItem("ACCESS_TOKEN")]);

  const insertNotice = (notice) => {
    axios
      .post(API_BASE_URL + "/cs/write", notice, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        if (!!response.data.result) {
          alert("권한이 없습니다.");
          navigate("/login", { replace: true });
        } else {
          navigate(`${response.data.noticeIdx}`);
        }
      });
  };

  const deleteNotice = (noticeIdx) => {
    console.log(typeof noticeIdx);
    axios
      .get(
        API_BASE_URL + "/cs/delete",
        { params: { noticeIdx: noticeIdx } },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
          },
        }
      )
      .then((response) => {
        if (response.data.result === "success") {
          alert("삭제완료");
          navigate("/cs", { replace: true });
        }
      });
  };
  return (
    <div id="content" className="noticeContents">
      <div className="titleContainer">
        <div className="titlewrap">마을소식</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/cs">
          <div className="subtitlewrap">이장님 말씀</div>
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<NoticeList user={user} />}></Route>
        <Route
          path="/:noticeId"
          element={<NoticeDetail user={user} deleteNotice={deleteNotice} />}
        ></Route>
        <Route
          path="/write"
          element={
            <PrivateRoute component={RegNotice} insertNotice={insertNotice} />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default NoticeMain;
