import React from "react";
import AskListItem from "../components/ask/AskListItem";
import ShareCard from "../components/share/ShareCard";
import StudyContainer from "../components/study/StudyContainer";
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
      <div className="popAskContainer">
        <AskListItem
          id={1}
          ask={{
            id: 1,
            askTitle: "제목11111111",
            askContent: "내용아러ㅣ너러ㅣㅏ너ㅘㄴsdkhflskjlfsjdf kdhfs",
            askRegDate: "2022.08.24 10:56 AM",
            userId: "관리자인 척",
            aCount: 12,
            certIdx: "정보처리기사",
            userProfileName: "/upload/profile/badge.png",
          }}
        ></AskListItem>
      </div>
      <div className="commSubtitle">
        <p>나눔장터 인기글🧚‍♀️</p>
      </div>
      <div className="popShareContainer">
        <ShareCard></ShareCard>
        <ShareCard></ShareCard>
        <ShareCard></ShareCard>
        <ShareCard></ShareCard>
      </div>
    </div>
  );
};

export default CommunityMain;
