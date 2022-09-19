import React from "react";
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
  const navigate = useNavigate();
  const noticeData = [
    {
      id: 1,
      noticeTitle:
        "제목인데 엄청나게 긴 제목이라서 뒤에 ...이 생기면 좋겠다는 생각을 하는 제목 제목인데 엄청나게 긴 제목이라서 뒤에 ...이 생기면 좋겠다는 생각을 하는 제목 제목인데 엄청나게 긴 제목이라서 뒤에 ...이 생기면 좋겠다는 생각을 하는 제목",
      noticeContent:
        "<p>내요요요요요요요요요용</p> 내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용 내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용 내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용",
      noticeRegDate: "2022.08.04 22:34",
    },
    {
      id: 2,
      noticeTitle: "제목인데 그냥 제목",
      noticeContent:
        "내요요요요요요요요요용 내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용",
      noticeRegDate: "2022.08.04 22:35",
    },
    {
      id: 3,
      noticeTitle: "제목인데 엄청나게 긴 제목이지만 ...은 없을 정도의 제목",
      noticeContent:
        "내요요요요요요요요요용 내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용내요요요요요요요요요용",
      noticeRegDate: "2022.08.04 22:36",
    },
  ];

  const insertNotice = (notice) => {
    axios
      .post(API_BASE_URL + "/cs/write", notice, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        navigate(`${response.data.noticeIdx}`);
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
        <Route
          path="/"
          element={<NoticeList noticeData={noticeData} />}
        ></Route>
        <Route path="/:noticeId" element={<NoticeDetail />}></Route>
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
