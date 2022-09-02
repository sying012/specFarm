import React from "react";
import { Route, Routes } from "react-router";
import CourseContainer from "../components/findCourse/CourseContainer";
import CourseDetail from "../components/findCourse/CourseDetail";

const FindCourse = () => {
  return (
    <div>
      <div className="titleContainer">
        <div
          className="titlewrap"
          onClick={() => {
            window.location = "/skills";
          }}
        >
          Skills
        </div>
        <div
          className="subtitlewrap"
          onClick={() => {
            window.location = "/skills/findcourse";
          }}
        >
          직업훈련탐색
        </div>
      </div>
      <Routes>
        <Route path="/" element={<CourseContainer />} />
        <Route path="/:id" element={<CourseDetail />} />
      </Routes>
    </div>
  );
};

export default FindCourse;
