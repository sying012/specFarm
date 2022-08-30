import React from "react";
import defaultProfile from "../../images/defaultProfile.png";

const AskReReply = () => {
  return (
    <div id="askReReplyBox" className="askReplyBox">
      <img id="profileImg" src={defaultProfile} alt="프로필사진" />
      <div id="replyBox">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          답변자
          <p style={{ fontSize: "0.8rem", color: "rgb(100, 100, 100)" }}>
            2022.08.29 11:34 PM
          </p>
        </div>
        <div className="askReplyContent">fdnbvn</div>
      </div>
    </div>
  );
};

export default AskReReply;
