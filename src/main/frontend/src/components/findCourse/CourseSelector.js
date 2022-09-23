import React, { useCallback, useState } from "react";
import styles from "../../styles/findcourse/CourseSelector.module.css";
import AreaSelect from "./AreaSelect";
import JobSelect from "./JobSelect";
import InsertItem from "./InsertItem";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const CourseSelector = ({
  areaItems,
  setAreaItems,
  jobItems,
  setJobItems,
  selectedItem,
  setSelectedItem,
}) => {
  const [selectedTab, setSeletedTab] = useState(0);

  const [active, setActive] = useState(-1);

  let getSelectedItem = (item) => {
    if (selectedItem.length < 6) {
      setSelectedItem(selectedItem.concat(item));

      if (item.which === "area") {
        // 선택된 검색조건이 지역일 경우 지역 배열에 분류
        setAreaItems(areaItems.concat(item));
      } else {
        // 선택된 검색조건이 직종일 경우 직종 배열에 분류
        setJobItems(jobItems.concat(item));
      }
    } else {
      alert("그만");
    }
  };

  return (
    <div className={styles.courseSelector}>
      <div className={styles.tabWrapper}>
        <div
          className={styles.areaBtn}
          onClick={() => {
            setSeletedTab(0);
            setActive(-1);
          }}
          style={
            selectedTab
              ? {
                  background: "none",
                }
              : { background: "#8cbf75", color: "white" }
          }
        >
          지역선택
        </div>
        <div
          className={styles.jobBtn}
          onClick={() => {
            setSeletedTab(1);
            setActive(-1);
          }}
          style={
            selectedTab
              ? {
                  background: "#8cbf75",
                  color: "white",
                }
              : { background: "none" }
          }
        >
          직무선택
        </div>
        <button
          className={styles.backListBtn}
          onClick={() => setActive(Math.max(-1, active - 1))}
        >
          <ArrowBackIosNewIcon />
        </button>
      </div>
      {selectedTab ? (
        <JobSelect
          selectedItem={selectedItem}
          getSelectedItem={getSelectedItem}
          active={active}
          setActive={setActive}
        />
      ) : (
        <AreaSelect
          selectedItem={selectedItem}
          getSelectedItem={getSelectedItem}
          active={active}
          setActive={setActive}
        />
      )}
    </div>
  );
};

export default CourseSelector;
