import React from "react";
import styles from "../styles/findcourse/findcourse.module.css";

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
      <div className></div>
    </div>
  );
};

export default FindCourse;
