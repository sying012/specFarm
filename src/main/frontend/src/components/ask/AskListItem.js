import React from "react";
import defaultProfile from "../../images/defaultProfile.png";

const AskListItem = ({ ask }) => {
  return (
    <div id="askListItem">
      <div id="profile">
        <img
          id="profileImg"
          src={ask.userProfileName || defaultProfile}
          alt="기본 프로필사진"
        />
      </div>
      <div id="contentBox">
        <div id="title">
          [{ask.certIdx}]&nbsp;&nbsp;&nbsp;{ask.askTitle}
        </div>
        <div id="writer"> {ask.userId} </div>
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
            {ask.aCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AskListItem;
