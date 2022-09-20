import React, { useCallback, useState } from "react";
import styles from "../../styles/findcourse/CourseSelector.module.css";
import AreaSelect from "./AreaSelect";
import JobSelect from "./JobSelect";
import InsertItem from "./InsertItem";

const CourseSelector = ({ areaItems, setAreaItems, jobItems, setJobItems }) => {
  const [selectedTab, setSeletedTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState([]);

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

  const deleteItem = useCallback(
    (code, which) => {
      setSelectedItem(
        selectedItem.filter((selectedItem) => selectedItem.code !== code)
      );

      if (which === "area") {
        // 선택된 검색조건이 지역일 경우 지역 배열에 분류
        setAreaItems(areaItems.filter((areaItems) => areaItems.code !== code));
      } else {
        // 선택된 검색조건이 직종일 경우 직종 배열에 분류
        setJobItems(jobItems.filter((jobItems) => jobItems.code !== code));
      }
    },
    [selectedItem]
  );

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
                  borderBottom: "2px solid rgb(150,150,150)",
                }
              : { border: "2px solid rgb(150,150,150)", borderBottom: "0" }
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
              ? { border: "2px solid rgb(150,150,150)", borderBottom: "0" }
              : { borderBottom: "2px solid rgb(150,150,150)" }
          }
        >
          직무선택
        </div>
      </div>
      {selectedTab ? (
        <JobSelect
          selectedItem={selectedItem}
          getSelectedItem={getSelectedItem}
        />
      ) : (
        <AreaSelect
          selectedItem={selectedItem}
          getSelectedItem={getSelectedItem}
        />
      )}

      <div className={styles.selected}>
        <InsertItem selectedItem={selectedItem} deleteItem={deleteItem} />
      </div>
    </div>
  );
};

export default CourseSelector;
