import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NewShare from "../components/share/NewShare";
import ShareDetail from "../components/share/ShareDetail";
import ShareContainer from "../components/share/ShareContainer";

const Share = () => {
  const [shareList, setShareList] = useState([
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
      content: "aaaa",
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
      content: "aaaa",
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
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <div className="subtitlewrap">나눔 장터🤝</div>
      </div>
      <Routes>
        <Route
          path="/"
          element={<ShareContainer shareList={shareList} />}
        ></Route>
        <Route path="/newShare" element={<NewShare />}></Route>
        <Route
          path="/:id"
          element={<ShareDetail shareList={shareList} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Share;
