import React from "react";
import styles from "../../styles/share/comment.moduel.css";
import CommentReply from "./CommentReply";
import CommentContainer from "./CommentContainer";
import defaultProfile from "../../images/defaultProfile.png";

//3. 댓글 출력
const Comment = ({ comment }) => {
  function togglecommentreply() {
    let commentReplyContainer = document.querySelector(
      ".commentReplyContainer" + comment.commentReplyIdx
    );
    if (commentReplyContainer.style.display === "none") {
      commentReplyContainer.style.display = "block";
    } else {
      commentReplyContainer.style.display = "none";
    }
  }

  return (
    <>
      <div id="askReplyBox" className="askReplyBox">
        <img
          id="profileImg"
          src={comment.userProfileName || defaultProfile}
          alt="프로필사진"
        />
        <div id="replyBox">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {comment.userId}
            <p style={{ fontSize: "0.8rem", color: "rgb(100, 100, 100)" }}>
              {comment.askReplyRegDate}
            </p>
          </div>
          <div className="askReplyContent">{comment.askReplyContent}</div>
          <div className="rereplyOpen">
            <p onClick={togglecommentreply}>답글</p>
          </div>
        </div>
      </div>
      <div
        className={"rereplyContainer" + comment.askReplyIdx}
        style={{ display: "none", marginLeft: "50px" }}
      >
        <div>
          <CommentContainer style={{ maxWidth: "410px" }} />
        </div>
        <div style={{ display: "flex" }}>
          <CommentReply />
        </div>
      </div>
    </>
  );
};

export default Comment;
