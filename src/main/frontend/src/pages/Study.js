import React, { useState } from "react";
import { Route, Routes } from "react-router";

import StudyContent from "../components/study/StudyContent";
import StudyMain from "../components/study/StudyMain";
import StudyReg from "../components/study/StudyReg";

const Study = () => {
  const [studyList, setStudyList] = useState([
    {
      id: 1,
      studyTitle:
        "공공데이터로 파이썬 데이터 분석 시작하기 공공데이터로 파이썬 데이터 분석 시작하기",
      userId: "소안대",
      regDate: "2022.08.29",
      contact: "http://open.kakao/a/dd0dd",
      studyContent: `어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1
어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1
어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1
어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1어쩌고 저쩌고1`,
      studyMemCnt: 3,
      studyImg:
        "https://velog.velcdn.com/images/kshired/post/d8a48a1f-4106-480f-8307-d20eae1f9486/image.png",
      studyState: 0,
    },
    {
      id: 2,
      studyTitle: "스터디 제목2",
      regDate: "2022.08.29",
      studyContent: "어쩌고 저쩌고2",
      studyMemCnt: 1,
      studyImg: "http://www.ujeil.com/news/photo/201807/200913_68933_1052.png",
      studyState: 1,
    },
    {
      id: 3,
      studyTitle: "스터디 제목3",
      regDate: "2022.08.29",
      studyContent: "어쩌고 저쩌고3",
      studyMemCnt: 5,
      studyImg:
        "https://i0.wp.com/wowtale.net/wp-content/uploads/2019/08/%E1%84%80%E1%85%AE%E1%84%85%E1%85%AE%E1%84%86%E1%85%B5%E1%84%8F%E1%85%A2%E1%86%B7%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC-%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A7%E1%86%AB.png?w=1920&ssl=1",
      studyState: 0,
    },
    {
      id: 4,
      studyTitle: "스터디 제목4",
      regDate: "2022.08.29",
      studyContent: "어쩌고 저쩌고4",
      studyMemCnt: 5,
      studyImg:
        "https://dimg.donga.com/wps/NEWS/IMAGE/2020/03/02/99972437.1.jpg",
      studyState: 0,
    },
    {
      id: 5,
      studyTitle: "스터디 제목1",
      regDate: "2022.08.29",
      userId: "소방 안전관리 대장",
      regDate: "2022.08.29",
      contact: "http://open.kakao/a/dd0dd",
      studyContent: "어쩌고 저쩌고1",
      studyMemCnt: 3,
      studyImg:
        "https://velog.velcdn.com/images/kshired/post/d8a48a1f-4106-480f-8307-d20eae1f9486/image.png",
      studyState: 0,
    },
    {
      id: 1,
      studyTitle: "스터디 제목1",
      regDate: "2022.08.29",
      userId: "소방 안전관리 대장",
      regDate: "2022.08.29",
      contact: "http://open.kakao/a/dd0dd",
      studyContent: "어쩌고 저쩌고1",
      studyMemCnt: 3,
      studyImg:
        "https://velog.velcdn.com/images/kshired/post/d8a48a1f-4106-480f-8307-d20eae1f9486/image.png",
      studyState: 0,
    },
    {
      id: 2,
      studyTitle: "스터디 제목2",
      regDate: "2022.08.29",
      studyContent: "어쩌고 저쩌고2",
      studyMemCnt: 1,
      studyImg: "http://www.ujeil.com/news/photo/201807/200913_68933_1052.png",
      studyState: 1,
    },
    {
      id: 3,
      studyTitle: "스터디 제목3",
      regDate: "2022.08.29",
      studyContent: "어쩌고 저쩌고3",
      studyMemCnt: 5,
      studyImg:
        "https://i0.wp.com/wowtale.net/wp-content/uploads/2019/08/%E1%84%80%E1%85%AE%E1%84%85%E1%85%AE%E1%84%86%E1%85%B5%E1%84%8F%E1%85%A2%E1%86%B7%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC-%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A7%E1%86%AB.png?w=1920&ssl=1",
      studyState: 0,
    },
    {
      id: 4,
      studyTitle: "스터디 제목4",
      regDate: "2022.08.29",
      studyContent: "어쩌고 저쩌고4",
      studyMemCnt: 5,
      studyImg:
        "https://dimg.donga.com/wps/NEWS/IMAGE/2020/03/02/99972437.1.jpg",
      studyState: 0,
    },
    {
      id: 5,
      studyTitle: "스터디 제목1",
      userId: "소방 안전관리 대장",
      regDate: "2022.08.29",
      contact: "http://open.kakao/a/dd0dd",
      studyContent: "어쩌고 저쩌고1",
      studyMemCnt: 3,
      studyImg:
        "https://velog.velcdn.com/images/kshired/post/d8a48a1f-4106-480f-8307-d20eae1f9486/image.png",
      studyState: 0,
    },
  ]);

  return (
    <div>
      <div className="titleContainer">
        <div
          className="titlewrap"
          onClick={() => {
            window.location = "/community";
          }}
        >
          마을회관
        </div>
        <div
          className="subtitlewrap"
          onClick={() => {
            window.location = "/community/study";
          }}
        >
          지식 품앗이👨‍👧‍👧
        </div>
      </div>
      <Routes>
        <Route path="/" element={<StudyMain studyList={studyList} />}></Route>
        <Route
          path="/:id"
          element={<StudyContent studyList={studyList} />}
        ></Route>
        <Route path="/register" element={<StudyReg />}></Route>
      </Routes>
    </div>
  );
};

export default Study;
