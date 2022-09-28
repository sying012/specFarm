import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import JobCafeContainer from "../components/jobCafe/JobCafeContainer";
import JobCafeDetail from "../components/jobCafe/JobCafeDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const JobCafe = () => {
  const [jobCafeList, setJobCafeList] = useState([]);
  console.log(jobCafeList);
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
              setJobCafeList={setJobCafeList}
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
