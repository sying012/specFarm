import React from "react";
import defaultProfile from "../../images/defaultProfile.png";

const AskReplyRegBox = () => {
  return (
    <div id="askReplyRegBox" className="askReplyBox">
      <img id="profileImg" src={defaultProfile} alt="프로필사진" />
      <form action="" id="replyRegForm">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          답변자
          <button type="submit">등록</button>
        </div>
        <textarea
          name="askReplyContent"
          rows={4}
          style={{ width: "100%", boxSizing: "border-box", resize: "none" }}
        />
      </form>
    </div>
  );
};

export default AskReplyRegBox;
