import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import CourseContainer from "../components/findCourse/CourseContainer";
import CourseDetail from "../components/findCourse/CourseDetail";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const FindCourse = () => {
  const [searchList, setSearchList] = useState([]);
  const [areaItems, setAreaItems] = useState([]);
  const [jobItems, setJobItems] = useState([]);
  const [value, setValue] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);

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
        <Route
          path="/"
          element={
            <CourseContainer
              searchList={searchList}
              setSearchList={setSearchList}
              areaItems={areaItems}
              setAreaItems={setAreaItems}
              jobItems={jobItems}
              setJobItems={setJobItems}
              value={value}
              setValue={setValue}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          }
        />
        <Route
          path="/srchTrprId=:srchTrprId&srchTrprDegr=:srchTrprDegr&srchTorgId=:srchTorgId"
          element={<CourseDetail searchList={searchList} />}
        />
      </Routes>
    </div>
  );
};

export default FindCourse;
