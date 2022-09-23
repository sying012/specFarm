import React, { useState } from "react";
import defaultProfile from "../../images/defaultProfile.png";
import SmallInfo from "../mypage/SmallInfo";

const AskReReply = ({ reReply }) => {
  // 유저 프로필 모달
  const [infoVisible, setInfoVisible] = useState(false);
  const userSmallInfo = (e) => {
    console.log(infoVisible);
    if (!infoVisible) {
      setInfoVisible(true);
    } else {
      setInfoVisible(false);
    }
  };
  return (
    <div id="askReReplyBox" className="askReplyBox">
      <img
        id="profileImg"
        src={
          reReply.user.userProfileName
            ? "/upload/profile/" + reReply.user.userProfileName
            : defaultProfile
        }
        alt="프로필사진"
        onClick={(e) => userSmallInfo(e)}
      />
      <div id="replyBox">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div onClick={(e) => userSmallInfo(e)}>{reReply.user.userNick}</div>
          <div
            onClick={(e) => userSmallInfo(e)}
            style={{ position: "absolute", marginLeft: "-65px" }}
          >
            {infoVisible && <SmallInfo user={reReply.user} id="smallInfo" />}
          </div>
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
