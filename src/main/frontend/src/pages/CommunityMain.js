import React from "react";
import StudyContainer from "../components/community/study/StudyContainer";
import "../styles/community/CommunityMain.css";

const CommunityMain = () => {
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <div className="subtitlewrap">입구</div>
      </div>
      <div className="commSubtitle">
        <p>인기 품앗이👨‍👨‍👧‍👧</p>
      </div>
      <div className="popStudyContainer">
        <StudyContainer></StudyContainer>
        <StudyContainer></StudyContainer>
        <StudyContainer></StudyContainer>
        <StudyContainer></StudyContainer>
      </div>
      <div className="commSubtitle">
        <p>물어방 인기글🙋‍♀️</p>
      </div>
      <div className="popAskContainer"></div>
      <div className="commSubtitle">
        <p>나눔장터 인기글🧚‍♀️</p>
      </div>
      <div className="popShareContainer"></div>
      <div className="commSubtitle"></div>
    </div>
  );
};

export default CommunityMain;
