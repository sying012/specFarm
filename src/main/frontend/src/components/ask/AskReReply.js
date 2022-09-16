import React from "react";
import defaultProfile from "../../images/defaultProfile.png";

const AskReReply = ({ reReply }) => {
  return (
    <div id="askReReplyBox" className="askReplyBox">
      <img
        id="profileImg"
        src={reReply.user.userProfileName || defaultProfile}
        alt="프로필사진"
      />
      <div id="replyBox">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {reReply.user.userNick}
          <p style={{ fontSize: "0.8rem", color: "rgb(100, 100, 100)" }}>
            {reReply.askReReplyRegDate}
          </p>
        </div>
        <div className="askReplyContent">{reReply.askReReplyContent}</div>
      </div>
    </div>
  );
};

export default AskReReply;
