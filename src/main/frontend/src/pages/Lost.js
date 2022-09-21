import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import LostItem from "../components/lost/LostItem";
import LostList from "../components/lost/LostList";
import styles from "../styles/lost/Lost.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Lost = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchItem, setSearchItem] = useState({ type: "전체", text: "" });
  const searchType = [
    {
      id: 1,
      name: "전체",
    },
    {
      id: 2,
      name: "지역",
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
  ];

  const onChangePage = (value) => {
    setPageNum(value);
  };

  const onChangeSearchItem = (value) => {
    setSearchItem(value);
  };

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
              searchType={searchType}
              pageNum={pageNum}
              onChangePage={onChangePage}
              searchItem={searchItem}
              onChangeSearchItem={onChangeSearchItem}
            />
          }
        ></Route>
        <Route path="/:rownum" element={<LostItem />}></Route>
      </Routes>
    </div>
  );
};

export default Lost;
