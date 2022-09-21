import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AskListItem from "../components/ask/AskListItem";
import ShareList from "../components/share/ShareList";
import StudyCardList from "../components/study/StudyCardList";
import "../styles/community/CommunityMain.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CommunityMain = () => {
  const [studyList, setStudyList] = useState([
    {
      id: 1,
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
    {
      id: 2,
      studyTitle: "스터디 제목2",
      studyContent: "어쩌고 저쩌고2",
      studyMemCnt: 1,
      studyImg: "http://www.ujeil.com/news/photo/201807/200913_68933_1052.png",
      studyState: 1,
    },
    {
      id: 3,
      studyTitle: "스터디 제목3",
      studyContent: "어쩌고 저쩌고3",
      studyMemCnt: 5,
      studyImg:
        "https://i0.wp.com/wowtale.net/wp-content/uploads/2019/08/%E1%84%80%E1%85%AE%E1%84%85%E1%85%AE%E1%84%86%E1%85%B5%E1%84%8F%E1%85%A2%E1%86%B7%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC-%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A7%E1%86%AB.png?w=1920&ssl=1",
      studyState: 0,
    },
    {
      id: 4,
      studyTitle: "스터디 제목4",
      studyContent: "어쩌고 저쩌고4",
      studyMemCnt: 5,
      studyImg:
        "https://dimg.donga.com/wps/NEWS/IMAGE/2020/03/02/99972437.1.jpg",
      studyState: 0,
    },
  ]);
  const [shareList, setShareList] = useState([
    {
      id: 1,
      shareTitle: "나눔해요1",
      userId: "당근",
      regDate: "2022.08.01",
      content: "aaaa",
      itemImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
      shareState: 0,
    },
    {
      id: 2,
      shareTitle: "나눔해요2",
      userId: "당근",
      regDate: "2022.08.02",
      content: "aaaa",
      itemImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
      shareState: 1,
    },
    {
      id: 3,
      shareTitle: "나눔해요3",
      userId: "당근",
      regDate: "2022.08.03",
      content: "aaaa",
      itemImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
      shareState: 0,
    },
    {
      id: 4,
      shareTitle: "나눔해요4",
      userId: "당근",
      regDate: "2022.08.04",
      content: "aaaa",
      itemImg:
        "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
      shareState: 1,
    },
  ]);

  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to=".">
          <div className="subtitlewrap">입구</div>
        </NavLink>
      </div>
      <NavLink to="study">
        <div className="commSubtitle">
          <p>인기 품앗이👨‍👨‍👧‍👧</p>
        </div>
      </NavLink>
      <div className="popStudyContainer">
        <StudyCardList studyList={studyList} />
      </div>
      <NavLink to="ask">
        <div className="commSubtitle">
          <p>물어방 인기글🙋‍♀️</p>
        </div>
      </NavLink>
      <div className="popAskContainer">{/* <AskListItem></AskListItem> */}</div>
      <NavLink to="share">
        <div className="commSubtitle">
          <p>나눔장터 인기글🧚‍♀️</p>
        </div>
      </NavLink>
      <div className="popShareContainer">
        <ShareList shareList={shareList} />
      </div>
    </div>
  );
};

export default CommunityMain;
