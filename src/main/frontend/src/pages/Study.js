import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import StudyContent from "../components/study/StudyContent";
import StudyMain from "../components/study/StudyMain";
import StudyReg from "../components/study/StudyReg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PrivateRoute from "../lib/PrivateRoute";
import axios from "axios";
import { API_BASE_URL } from "../app-config";

const Study = () => {
  const [studyList, setStudyList] = useState([]);
  const [page, setPage] = useState(1);

  const getStudyList = useCallback(() => {
    axios
      .get(API_BASE_URL + "/community/study", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setStudyList(response.data.studyList.content);
        // setCount(response.data.askList.totalPages);
        // window.scrollTo(0, 0);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, [page]);

  useEffect(() => {
    getStudyList();
  }, []);

  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/community/study">
          <div className="subtitlewrap">지식 품앗이</div>
        </NavLink>
      </div>
      <Routes>
        <Route path="/" element={<StudyMain studyList={studyList} />}></Route>
        <Route
          path="/:id"
          element={
            <StudyContent studyList={studyList} setStudyList={setStudyList} />
          }
        ></Route>

        <Route
          path="/register"
          element={<PrivateRoute component={StudyReg} />}
        />
      </Routes>
    </div>
  );
};

export default Study;
