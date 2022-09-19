import React from "react";
import { Route, Routes } from "react-router";
import { Link, NavLink } from "react-router-dom";
import CourseContainer from "../components/findCourse/CourseContainer";
import CourseDetail from "../components/findCourse/CourseDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const FindCourse = () => {
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">Skills</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/skills/findcourse">
          <div className="subtitlewrap">직업훈련탐색</div>
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<CourseContainer />} />
        <Route path="/srchTrprId=:srchTrprId&srchTrprDegr=:srchTrprDegr&srchTorgId=:srchTorgId" element={<CourseDetail />} />
      </Routes>
    </div>
  );
};

export default FindCourse;
