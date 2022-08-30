import React, { useState } from "react";
import "../styles/ask/ask.css";
import AskContent from "../components/ask/AskContent";
import AskReg from "../components/ask/AskReg";
import AskDetail from "../components/ask/AskDetail";
import { Routes, Route } from "react-router-dom";
import AskEdit from "../components/ask/AskEdit";

const Ask = (props) => {
  //리스폰스롤 받아온 데이터를 사용하기위한 state, ask엔티티가 아닌 받변개수가 추가된 DTO로 응답
  const [asks, setAsks] = useState([
    {
      id: 1,
      askTitle:
        "제목1111saddddddddddsdfasdfasdgfdfdgdgsdfjhgfhdfghdfghdfghdfghdfghfdggfdhg fdghdf gdfgdfdsfgfdgfdgfdg fdggsdfdddddddddddddddddddddddddddfsa1111",
      askContent:
        "내용아러ㅣ너러ㅣㅏ너ㅘㄴsdkhflskjlfsjdf kdhfsgfhhjdlfjglh  f  kfrk가나다라마바사 아자차카타파하",
      askRegDate: "2022.08.24 10:56 AM",
      userId: "관리자인 척",
      aCount: 12,
      certIdx: "정보처리기사",
      userProfileName: "/upload/profile/badge.png",
    },
    {
      id: 2,
      askTitle: "제123132441111목11",
      askContent: "내ㄴㅇdsfgsdjlfsjdf kdhfs",
      askRegDate: "2022.08.24 10:50 AM",
      userId: "관리자인 아닌척",
      aCount: 32,
      certIdx: "용접기능사",
      userProfileName: null,
    },
  ]);

  return (
    <div id="content">
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <div className="subtitlewrap">무엇이든 물어방</div>
      </div>
      <Routes>
        <Route path="/" element={<AskContent asks={asks}></AskContent>}></Route>
        <Route
          path="/:askId"
          element={<AskDetail asks={asks}></AskDetail>}
        ></Route>
        <Route
          path="/edit/:askId"
          element={<AskEdit asks={asks}></AskEdit>}
        ></Route>
        <Route path="/write" element={<AskReg />}></Route>
      </Routes>
    </div>
  );
};

export default Ask;
