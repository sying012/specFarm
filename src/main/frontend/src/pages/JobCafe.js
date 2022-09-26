import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import JobCafeContainer from "../components/jobCafe/JobCafeContainer";
import JobCafeDetail from "../components/jobCafe/JobCafeDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import { API_BASE_URL } from "../app-config.js";

const JobCafe = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [jobCafeList, setJobCafeList] = useState([]);

  const onSelectCategory = (cate) => {
    setCategory(cate);
  };

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/skills/jobCafe/getJobCafeList",
      method: "get",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      data: JobCafe,
    }).then((response) => {
      setJobCafeList(response.data.jobCafeList);
      //중복되는 CAFE_TYPE_NM 제거 후 CAFE_TYPE_NM으로 typeArr 생성
      const typeArr = new Set();
      for (let i = 0; i < response.data.jobCafeList.length; i++) {
        typeArr.add(response.data.jobCafeList[i].CAFE_TYPE_NM);
      }

      setCategories(Array.from(typeArr));
    });
  }, []);

  useEffect(() => {
    if (category !== "") {
      const newJobCafeList = jobCafeList.filter(
        (jobCafeItem) => jobCafeItem.CAFE_TYPE_NM === category
      );

      setJobCafeList(newJobCafeList);
    }
  }, [category]);

  return (
    <div>
      <div className="titleContainer">
        <NavLink to="/skills">
          <div className="titlewrap">성장창고</div>
        </NavLink>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/skills/jobcafe">
          <div className="subtitlewrap">일자리 카페</div>
        </NavLink>
      </div>
      <h1>취업에 필요한 서비스 무료 제공</h1>
      <Routes>
        <Route
          path="/"
          element={
            <JobCafeContainer
              jobCafeList={jobCafeList}
              categories={categories}
              onSelectCategory={onSelectCategory}
            />
          }
        ></Route>
        <Route
          path="/:index"
          element={<JobCafeDetail jobCafeList={jobCafeList} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default JobCafe;
