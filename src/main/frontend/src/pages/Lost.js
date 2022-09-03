import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import LostItem from "../components/lost/LostItem";
import LostList from "../components/lost/LostList";
import styles from "../styles/lost/Lost.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Lost = () => {
  const [losts, setLosts] = useState([
    {
      id: 1,
      brchName: "서울",
      lostCat: "MP3/전자제품/게임기 등",
      lostItem: "USB",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
      brchTrthNm: "서울서부지사",
      brchTel: "02-432-9876",
      brchAddr: "서울특별시 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 2,
      brchName: "대전",
      lostCat: "기타",
      lostItem: "주민등록증",
      lostLoc: "청운중학교",
      lostDate: "2022.00.00",
      brchTrthNm: "대전지사",
      brchTel: "02-432-9876",
      brchAddr: "대전시 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 3,
      brchName: "대구",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
      brchTrthNm: "대구지사",
      brchTel: "02-432-9876",
      brchAddr: "대구시 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 4,
      brchName: "경기북부",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울전자고등학교 제19시험장",
      lostDate: "2022.00.00",
      brchTrthNm: "경기북부지사",
      brchTel: "02-432-9876",
      brchAddr: "경기도 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 5,
      brchName: "서울",
      lostCat: "MP3/전자제품/게임기 등",
      lostItem: "USB",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
      brchTrthNm: "서울서부지사",
      brchTel: "02-432-9876",
      brchAddr: "서울특별시 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 6,
      brchName: "대전",
      lostCat: "기타",
      lostItem: "주민등록증",
      lostLoc: "청운중학교",
      lostDate: "2022.00.00",
      brchTrthNm: "서울서부지사",
      brchTel: "02-432-9876",
      brchAddr: "서울특별시 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 7,
      brchName: "대구",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
      brchTrthNm: "서울서부지사",
      brchTel: "02-432-9876",
      brchAddr: "서울특별시 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 8,
      brchName: "경기북부",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울전자고등학교 제19시험장",
      lostDate: "2022.00.00",
      brchTrthNm: "서울서부지사",
      brchTel: "02-432-9876",
      brchAddr: "서울특별시 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 9,
      brchName: "대구",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울여자고등학교",
      lostDate: "2022.00.00",
      brchTrthNm: "서울서부지사",
      brchTel: "02-432-9876",
      brchAddr: "서울특별시 은평구 진관 3 로 36(진관동)",
    },
    {
      id: 10,
      brchName: "경기북부",
      lostCat: "기타",
      lostItem: "MP3/전자제품/게임기 등",
      lostLoc: "서울전자고등학교 제19시험장",
      lostDate: "2022.00.00",
      brchTrthNm: "서울서부지사",
      brchTel: "02-432-9876",
      brchAddr: "서울특별시 은평구 진관 3 로 36(진관동)",
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

  const brchNames = [
    { title: "서울지사" },
    { title: "경기북부" },
    { title: "대구지사" },
  ];

  return (
    <div id="content">
      <div className={styles.titleContainer}>
        <div className={styles.titlewrap}>마을소식</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/cs/lost">
          <div className={styles.subtitlewrap}>분실물 센터</div>
        </NavLink>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <LostList
              losts={losts}
              searchTypeItem={searchTypeItem}
              brchNames={brchNames}
            />
          }
        ></Route>
        <Route path="/:lostsId" element={<LostItem losts={losts} />}></Route>
      </Routes>
    </div>
  );
};

export default Lost;
