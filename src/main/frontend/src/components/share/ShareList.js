import React from "react";
import "../../styles/share/shareList.css";
import "../../styles/share/shareCard.css";
import ShareCard from "./ShareCard";

const ShareList = () => {
  return (
    <main>
      <div className="shareMain-top">
        <button className="shareRgBtn">등록</button>
      </div>
      <div className="shareCardList">
        <ShareCard></ShareCard>
        <ShareCard></ShareCard>
        <ShareCard></ShareCard>
        <ShareCard></ShareCard>
      </div>
    </main>
  );
};
export default ShareList;
