import React, { useState } from "react";
import { Route, Routes } from "react-router";
import LostItem from "../components/lost/LostItem";
import LostList from "../components/lost/LostList";
import LostListTest from "../components/lost/LostListTest";

const Lost = () => {
  const [losts, setLosts] = useState([
    {
      id: 1,
      brchName: "서울",
      lostCat: "MP3/전자제품/게임기 등",
      lostItem: "USB",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
    },
    {
      id: 2,
      brchName: "대전",
      lostCat: "기타",
      lostItem: "주민등록증",
      lostLoc: "청운중학교",
      lostDate: "2022.00.00",
    },
    {
      id: 3,
      brchName: "대구",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
    },
    {
      id: 4,
      brchName: "경기북부",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울전자고등학교 제19시험장",
      lostDate: "2022.00.00",
    },
    {
      id: 5,
      brchName: "서울",
      lostCat: "MP3/전자제품/게임기 등",
      lostItem: "USB",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
    },
    {
      id: 6,
      brchName: "대전",
      lostCat: "기타",
      lostItem: "주민등록증",
      lostLoc: "청운중학교",
      lostDate: "2022.00.00",
    },
    {
      id: 7,
      brchName: "대구",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
    },
    {
      id: 8,
      brchName: "경기북부",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울전자고등학교 제19시험장",
      lostDate: "2022.00.00",
    },
    {
      id: 9,
      brchName: "대구",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
    },
    {
      id: 10,
      brchName: "경기북부",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울전자고등학교 제19시험장",
      lostDate: "2022.00.00",
    },
  ]);

  const [searchTypeItem, setSearchTypeItem] = useState([
    {
      id: 1,
      name: "전체",
    },
    {
      id: 2,
      name: "지사",
    },
    {
      id: 3,
      name: "분실물 목록",
    },
    {
      id: 4,
      name: "분실 장소",
    },
    {
      id: 5,
      name: "분실 일자",
    },
  ]);

  return (
    <div id="content">
      <div className="titleContainer">
        <div className="titlewrap">마을소식</div>
        <div className="subtitlewrap">분실물 센터</div>
      </div>
      <Routes>
        <Route
          path="/"
          element={<LostList losts={losts} searchTypeItem={searchTypeItem} />}
        ></Route>
        <Route path="/mm" element={<LostItem />}></Route>
      </Routes>
    </div>
  );
};

export default Lost;
