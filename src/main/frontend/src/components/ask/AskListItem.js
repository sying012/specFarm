import React from "react";
import defaultProfile from "../../images/defaultProfile.png";

const AskListItem = ({ ask }) => {
  return (
    <div id="askListItem">
      <div id="profile">
        <img
          id="profileImg"
          src={ask.user.userProfileName || defaultProfile}
          alt="프로필사진"
        />
      </div>
      <div id="contentBox">
        <div id="title">
          <span>
            [{ask.askCert}]&nbsp;&nbsp;&nbsp;{ask.askTitle}
          </span>
        </div>
        <div id="writer"> {ask.user.userNick} </div>
      </div>
      <div id="contentInfo">
        <div id="regdate">{ask.askRegDate}</div>
        <div id="count">
          <p
            style={{
              margin: "0",
              background: "red",
              padding: "3px 5px",
              borderRadius: "10px",
            }}
          >
            {ask.countReply}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AskListItem;
