import React, { useEffect, useState } from "react";
import styles from "../../styles/findcourse/CourseContainer.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CourseSelector from "../../components/findCourse/CourseSelector";
import CourseList from "./CourseList";
import { useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const CourseContainer = ({ searchList, setSearchList }) => {
  const [areaItems, setAreaItems] = useState([]);
  const [jobItems, setJobItems] = useState([]);
  const [value, setValue] = useState("");

  const changeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      searchCourse(areaItems, jobItems, value);
      setValue("");
      e.preventDefault();
    },
    [areaItems, jobItems, value]
  );

  useEffect(() => {
    searchCourse(areaItems, jobItems, value);
  }, []);

  const searchCourse = useCallback((areaItems, jobItems, text) => {
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
  }, []);

  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseSearchBar}>
        <form className={styles.courseSearch} onSubmit={handleSubmit}>
          <input
            className={styles.courseinput}
            value={value}
            placeholder="검색"
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
      <div className={styles.popCourse}>
        <div className={styles.skillsBtns}>
          <a href="#">지게차 운전 기능사</a>
        </div>
        <div className={styles.skillsBtns}>
          <a href="#">건축기사</a>
        </div>
        <div className={styles.skillsBtns}>
          <a href="#">한식조리 기능사</a>
        </div>
        <div className={styles.skillsBtns}>
          <a href="#">중식조리 기능사</a>
        </div>
        <div className={styles.skillsBtns}>
          <a href="#">일식조리 기능사</a>
        </div>
        <div className={styles.skillsBtns}>
          <a href="#">양식조리 기능사</a>
        </div>
        <div className={styles.skillsBtns}>
          <a href="#">문식조리 기능사</a>
        </div>
      </div>
      <div className={styles.selectContainer}>
        <div className={styles.selectWrapper}>
          <CourseSelector
            areaItems={areaItems}
            setAreaItems={setAreaItems}
            jobItems={jobItems}
            setJobItems={setJobItems}
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
