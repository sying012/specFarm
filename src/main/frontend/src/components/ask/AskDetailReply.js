import React from "react";
import defaultProfile from "../../images/defaultProfile.png";
import AskReReply from "./AskReReply";
import AskReplyRegBox from "./AskReplyRegBox";

const AskDetailReply = ({ reply }) => {
  function toggleRereply() {
    let rereplyContainer = document.querySelector(
      ".rereplyContainer" + reply.askReplyIdx
    );
    if (rereplyContainer.style.display === "none") {
      rereplyContainer.style.display = "block";
    } else {
      rereplyContainer.style.display = "none";
    }
  }

  return (
    <>
      <div id="askReplyBox" className="askReplyBox">
        <img
          id="profileImg"
          src={reply.userProfileName || defaultProfile}
          alt="프로필사진"
        />
        <div id="replyBox">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {reply.userId}
            <p style={{ fontSize: "0.8rem", color: "rgb(100, 100, 100)" }}>
              {reply.askReplyRegDate}
            </p>
          </div>
          <div className="askReplyContent">{reply.askReplyContent}</div>
          <div className="rereplyOpen">
            <p onClick={toggleRereply}>답글</p>
          </div>
        </div>
      </div>
      <div
        className={"rereplyContainer" + reply.askReplyIdx}
        style={{ display: "none", marginLeft: "50px" }}
      >
        <div>
          <AskReplyRegBox style={{ maxWidth: "410px" }} />
        </div>
        <div style={{ display: "flex" }}>
          <AskReReply />
        </div>
      </div>
    </>
  );
};

export default AskDetailReply;
