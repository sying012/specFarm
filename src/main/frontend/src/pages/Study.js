import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import StudyContent from "../components/study/StudyContent";
import StudyMain from "../components/study/StudyMain";
import StudyReg from "../components/study/StudyReg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PrivateRoute from "../lib/PrivateRoute";

const Study = () => {
  const [studyList, setStudyList] = useState([
    //     {
    //       id: 1,
    //       studyTitle:
    //         "공공데이터로 파이썬 데이터 분석 시작하기 공공데이터로 파이썬 데이터 분석 시작하기",
    //       userId: "소안대",
    //       regDate: "2022.08.29",
    //       contact: "http://open.kakao/a/dd0dd",
    //       studyContent: `어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1
    // 어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1
    // 어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1
    // 어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1`,
    //       studyMemCnt: 4,
    //       studyImg:
    //         "https://velog.velcdn.com/images/kshired/post/d8a48a1f-4106-480f-8307-d20eae1f9486/image.png",
    //       studyState: 0,
    //     },
  ]);

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
          element={<StudyContent studyList={studyList} />}
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
