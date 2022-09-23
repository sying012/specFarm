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
import StudyEdit from "../components/study/StudyEdit";

const Study = () => {
  const [studyList, setStudyList] = useState([]);
  const [studyMemberList, setStudyMemberList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  // console.log(searchKeyword);
  const getStudyList = useCallback(() => {
    axios
      .get(API_BASE_URL + "/community/study", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
          searchKeyword: searchKeyword,
        },
      })
      .then((response) => {
        // console.log(response.data);
        // console.log("아무글자");
        setStudyList(response.data.studyList.content);
        setCount(response.data.studyList.totalPages);
        // window.scrollTo(0, 0);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, [searchKeyword, page]);

  useEffect(() => {
    getStudyList();
  }, [studyMemberList, page]);

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
        <Route
          path="/"
          element={
            <StudyMain
              studyList={studyList}
              getStudyList={getStudyList}
              setStudyList={setStudyList}
              page={page}
              setPage={setPage}
              count={count}
              setCount={setCount}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <StudyContent
              setStudyList={setStudyList}
              studyMemberList={studyMemberList}
              setStudyMemberList={setStudyMemberList}
            />
          }
        ></Route>
        <Route
          path="/:id/edit"
          element={<StudyEdit setStudyList={setStudyList} />}
        ></Route>
        <Route
          path="/register"
          element={
            <PrivateRoute
              component={StudyReg}
              setStudyList={setStudyList}
              setStudyMemberList={setStudyMemberList}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Study;
