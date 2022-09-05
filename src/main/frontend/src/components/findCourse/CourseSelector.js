import React, { useState } from "react";
import styles from "../../styles/findcourse/CourseSelector.module.css";
import AreaSelect from "./AreaSelect";
import JobSelect from "./JobSelect";

// const displayList = (list) => {
//   const result = [];

//   for (const val in list) {
//     result.push(<li key={val}>{list[val]}</li>);
//   }

//   return result;
// };

const CourseSelector = () => {
  const [selectedTab, setSeletedTab] = useState(0);
  const [seletedItem, setSelectedItem] = useState("");

  return (
    <div className={styles.courseSelector}>
      <div className={styles.tabWrapper}>
        <div
          className={styles.areaBtn}
          onClick={() => {
            setSeletedTab(0);
          }}
          style={
            selectedTab
              ? {
                  borderBottom: "2px solid #0d0d0d",
                }
              : { border: "2px solid #0d0d0d", borderBottom: "0" }
          }
        >
          지역선택
        </div>
        <div
          className={styles.jobBtn}
          onClick={() => {
            setSeletedTab(1);
          }}
          style={
            selectedTab
              ? { border: "2px solid #0d0d0d", borderBottom: "0" }
              : { borderBottom: "2px solid #0d0d0d" }
          }
        >
          직종선택
        </div>
      </div>
      {selectedTab ? <JobSelect /> : <AreaSelect setArea={setSelectedItem} />}

      <div className={styles.selected}>
        <>{seletedItem}</>
      </div>
    </div>
  );
};

export default CourseSelector;
