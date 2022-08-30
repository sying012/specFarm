import React from "react";
import defaultProfile from "../../images/defaultProfile.png";
import AskReReply from "./AskReReply";
import AskReplyRegBox from "./AskReplyRegBox";
import rereplyImg from "../../images/rereply.png";

const AskDetailReply = ({ ask, id }) => {
  function toggleRereply() {
    let rereplyContainer = document.querySelector(".rereplyContainer" + id);
    if (rereplyContainer.style.display === "none") {
      rereplyContainer.style.display = "block";
    } else {
      rereplyContainer.style.display = "none";
    }
  }

  function toggleRegRereply() {
    let rereplyContainer = document.querySelector(".rereplyRegContainer" + id);
    if (
      document.querySelector(".rereplyContainer" + id).style.display === "none"
    ) {
      document.querySelector(".rereplyContainer" + id).style.display = "block";
      rereplyContainer.style.display = "none";
    }
    if (rereplyContainer.style.display === "none") {
      rereplyContainer.style.display = "flex";
    } else {
      rereplyContainer.style.display = "none";
    }
  }
  return (
    <>
      <div id="askReplyBox" className="askReplyBox">
        <img id="profileImg" src={defaultProfile} alt="프로필사진" />
        <div id="replyBox">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            답변자
            <p style={{ fontSize: "0.8rem", color: "rgb(100, 100, 100)" }}>
              2022.08.29 11:34 PM
            </p>
          </div>
          <div className="askReplyContent">
            fdnbvnbhgjsdfghjhgsdgjhfsdfasdfasdfasfjgkhjhdsfsdfgjhsdf sdfadsgf
            dfgagbjhgfhhdfghdfghdfg
          </div>
          <div className="rereplyOpen">
            <p onClick={toggleRereply}>답글</p>
            <p onClick={toggleRegRereply}>답글등록</p>
          </div>
        </div>
      </div>
      <div className={"rereplyContainer" + id} style={{ display: "none" }}>
        <div className={"rereplyRegContainer" + id} style={{ display: "none" }}>
          <img
            src={rereplyImg}
            alt=""
            style={{ width: "60px", height: "60px", opacity: "0.5" }}
          />
          <AskReplyRegBox />
        </div>
        <div style={{ display: "flex" }}>
          <img
            src={rereplyImg}
            alt=""
            style={{ width: "60px", height: "60px", opacity: "0.5" }}
          />
          <AskReReply />
        </div>
      </div>
    </>
  );
};

export default AskDetailReply;
