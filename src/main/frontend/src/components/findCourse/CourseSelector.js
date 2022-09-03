import { borderBottom, display } from "@mui/system";
import React, { useState } from "react";
import styles from "../../styles/findcourse/courseSelector.module.css";

const testList = {
  11: "서울",
  246: "부산",
  227: "대구",
  2648: "인천",
  131: "서울",
  236: "부산",
  247: "대구",
  28: "인천",
  151: "서울",
  426: "부산",
  257: "대구",
  248: "인천",
};

const displayList = (list) => {
  const result = [];

  for (const val in list) {
    result.push(<li key={val}>{list[val]}</li>);
  }

  return result;
};

const CourseSelector = () => {
  const [selectedTab, setSeletedTab] = useState(0);

  return (
    <div className={styles.courseSelector}>
      <div className={styles.tabWrapper}>
        <div
          className={styles.regionBtn}
          onClick={() => {
            setSeletedTab(0);
          }}
          style={
            selectedTab
              ? { borderBottom: "1px solid" }
              : { border: "1px solid", borderBottom: "0" }
          }
        >
          지역선택
        </div>
        <div
          className={styles.occuBtn}
          onClick={() => {
            setSeletedTab(1);
          }}
          style={
            selectedTab
              ? { border: "1px solid", borderBottom: "0" }
              : { borderBottom: "1px solid" }
          }
        >
          직종선택
        </div>
      </div>
      <div className={styles.selectListWrapper}>
        <ul className={styles.upperList}>{displayList(testList)}</ul>
        <ul className={styles.lowerList}>{displayList(testList)}</ul>
      </div>
      <div className={styles.selected}></div>
    </div>
  );
};

export default CourseSelector;
