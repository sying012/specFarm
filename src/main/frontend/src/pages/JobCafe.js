import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import JobCafeContainer from "../components/jobCafe/JobCafeContainer";
import JobCafeDetail from "../components/jobCafe/JobCafeDetail";

const JobCafe = () => {
  const [jobCafeList, setJobCafeList] = useState([
    {
      id: 1,
      cafeName: "서울시청년일자리센터",
      smplIntro: "우리 카페는~~~~~~~~~~~~~~~~~~",
      useDate: "평일 10시 ~ 18시",
      guGun: "서울시 강남구",
      cafeImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    },
    {
      id: 2,
      cafeName: "한겨레교육문화센터 신촌",
      smplIntro: "우리 카페는~~~~~~~~~~~~~~~~~~",
      useDate: "평일 10시 ~ 18시",
      guGun: "서울시 강남구",
      cafeImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    },
    {
      id: 3,
      cafeName: "해커스어학원 강남역캠퍼스",
      smplIntro: "우리 카페는~~~~~~~~~~~~~~~~~~",
      useDate: "평일 10시 ~ 18시",
      guGun: "서울시 강남구",
      cafeImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    },
    {
      id: 4,
      cafeName: "동대문도서관",
      smplIntro: "우리 카페는~~~~~~~~~~~~~~~~~~",
      useDate: "평일 10시 ~ 18시",
      guGun: "서울시 강남구",
      cafeImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    },
    {
      id: 1,
      cafeName: "서울시청년일자리센터",
      smplIntro: "우리 카페는~~~~~~~~~~~~~~~~~~",
      useDate: "평일 10시 ~ 18시",
      guGun: "서울시 강남구",
      cafeImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    },
    {
      id: 2,
      cafeName: "한겨레교육문화센터 신촌",
      smplIntro: "우리 카페는~~~~~~~~~~~~~~~~~~",
      useDate: "평일 10시 ~ 18시",
      guGun: "서울시 강남구",
      cafeImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    },
    {
      id: 3,
      cafeName: "해커스어학원 강남역캠퍼스",
      smplIntro: "우리 카페는~~~~~~~~~~~~~~~~~~",
      useDate: "평일 10시 ~ 18시",
      guGun: "서울시 강남구",
      cafeImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    },
    {
      id: 4,
      cafeName: "동대문도서관",
      smplIntro: "우리 카페는~~~~~~~~~~~~~~~~~~",
      useDate: "평일 10시 ~ 18시",
      guGun: "서울시 강남구",
      cafeImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    },
  ]);

  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">Skills</div>
        <div className="subtitlewrap">일자리 카페</div>
      </div>
      <h1>취업에 필요한 서비스 무료 제공</h1>
      <Routes>
        <Route
          path="/"
          element={<JobCafeContainer jobCafeList={jobCafeList} />}
        ></Route>
        <Route
          path="/:id"
          element={<JobCafeDetail jobCafeList={jobCafeList} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default JobCafe;
