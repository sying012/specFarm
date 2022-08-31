import React from "react";
import "../styles/notice/notice.css";
import NoticeList from "../components/notice/NoticeList";
import RegNotice from "../components/notice/RegNotice";
import { Routes, Route } from "react-router-dom";

const NoticeMain = () => {
  return (
    <div id="content">
      <div className="titleContainer">
        <div className="titlewrap">마을소식</div>
        <div className="subtitlewrap">이장님 말씀</div>
      </div>
      <Routes>
        <Route path="/" element={<NoticeList />}></Route>
        <Route path="/write" element={<RegNotice />}></Route>
      </Routes>
    </div>
  );
};

export default NoticeMain;
