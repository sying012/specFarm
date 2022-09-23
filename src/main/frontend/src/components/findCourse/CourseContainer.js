import React, { useEffect } from "react";
import styles from "../../styles/findcourse/CourseContainer.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CourseSelector from "../../components/findCourse/CourseSelector";
import CourseList from "./CourseList";
import { useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import InsertItem from "./InsertItem";

const CourseContainer = ({
  searchList,
  setSearchList,
  areaItems,
  setAreaItems,
  jobItems,
  setJobItems,
  value,
  setValue,
  selectedItem,
  setSelectedItem,
}) => {
  useEffect(() => {
    searchCourse(areaItems, jobItems, value);
  }, []);

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

  // 검색어 입력 시 검색 키워드 value에 저장
  const changeValue = useCallback((e) => {
    setValue(e.target.value);
    console.log(value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      searchCourse(areaItems, jobItems, value);
      // 검색 후 검색창에서 검색어 제거
      // setValue("");
    },
    [areaItems, jobItems, value]
  );

  const searchCourse = (areaItems, jobItems, text) => {
    // console.log(areaItems);
    // console.log(jobItems);
    axios({
      method: "post",
      url: API_BASE_URL + "/skills/listRequest",
      // 대분류 코드 스프링에 전달
      data: {
        areaItems: areaItems,
        jobItems: jobItems,
        searchText: text,
      },
    }).then((response) => {
      // 요청한 상위 리스트를 스프링에서 받아 리스트 State에 저장
      setSearchList(response.data.scn_list);
      // console.log(response.data);
    });
  };

  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseSearchBar}>
        <form className={styles.courseSearch} onSubmit={handleSubmit}>
          <input
            className={styles.courseinput}
            value={value}
            placeholder="검색어를 입력하세요."
            onChange={changeValue}
          ></input>
          <div onClick={handleSubmit} style={{ cursor: "pointer" }}>
            <SearchIcon
              fontSize="large"
              color="action"
              style={{ position: "absolute", top: "12px", right: "20px" }}
            />
          </div>
        </form>
      </div>
      <div className={styles.selectedWrap}>
        <div className={styles.selected}>
          <InsertItem selectedItem={selectedItem} deleteItem={deleteItem} />
        </div>
      </div>
      <div className={styles.selectContainer}>
        <div className={styles.selectWrapper}>
          <CourseSelector
            areaItems={areaItems}
            setAreaItems={setAreaItems}
            jobItems={jobItems}
            setJobItems={setJobItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          ></CourseSelector>
        </div>
        <div className={styles.selectBox}>
          <CourseList searchList={searchList}></CourseList>
        </div>
      </div>
    </div>
  );
};

export default CourseContainer;
