import React from "react";
import "../../../styles/community/share/ShareContainer.css";
import sampleimg from "../../../images/apples-1004886_960_720.jpg";

const ShareContainer = () => {
  return (
    <div className="shareContainer">
      <img className="shareImg" src={sampleimg} alt="sampleimg"></img>
      <div className="shareTitle">구황작물 나눔합니다</div>
      <div className="shareInfo">
        <div className="shareState">진행</div>
        <div className="shareUser">기부천사</div>
      </div>
    </div>
  );
};

export default ShareContainer;
