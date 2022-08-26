import React from "react";
import "../../styles/share/shareList.css";
import ShareCard from "./ShareCard";

const ShareList = () => {
  return (
    <main>
      <div className="shareMain-top">
        <div className="shareSearchBar">
          <input type="text" className="shareSearch" />
          <button className="shareSearchBtn">검색</button>
        </div>
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
