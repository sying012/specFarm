import React from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import CourseContainer from "../components/findCourse/CourseContainer";
import CourseDetail from "../components/findCourse/CourseDetail";

const FindCourse = () => {
  return (
    <div>
      <div className="titleContainer">
        <Link to={"/skills"}>
          <div className="titlewrap">Skills</div>
        </Link>
        <Link to={"/skills/findcourse"}>
          <div className="subtitlewrap">직업훈련탐색</div>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<CourseContainer />} />
        <Route path="/:id" element={<CourseDetail />} />
      </Routes>
    </div>
  );
};

export default FindCourse;
