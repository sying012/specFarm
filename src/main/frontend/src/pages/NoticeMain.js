import React from "react";
import "../styles/notice/notice.css";
import NoticeList from "../components/notice/NoticeList";
import RegNotice from "../components/notice/RegNotice";
import NoticeDetail from "../components/notice/NoticeDetail";
import { Routes, Route } from "react-router-dom";

const NoticeMain = () => {
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
  return (
    <div id="content">
      <div className="titleContainer">
        <div className="titlewrap">마을소식</div>
        <div className="subtitlewrap">이장님 말씀</div>
      </div>
      <Routes>
        <Route
          path="/"
          element={<NoticeList noticeData={noticeData} />}
        ></Route>
        <Route
          path="/:noticeId"
          element={<NoticeDetail noticeData={noticeData} />}
        ></Route>
        <Route path="/write" element={<RegNotice />}></Route>
      </Routes>
    </div>
  );
};

export default NoticeMain;
