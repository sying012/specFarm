import React from "react";
import CommentReply from "./CommentReply";
import CommentContainer from "./CommentContainer";
import defaultProfile from "../../images/defaultProfile.png";

//3. 댓글 출력
const Comment = ({ comment }) => {
  function togglecommentreply() {
    let commentReplyContainer = document.querySelector(
      ".rereplyContainer" + comment.shareReplyIdx
    );
    if (commentReplyContainer.style.display === "none") {
      commentReplyContainer.style.display = "block";
    } else {
      commentReplyContainer.style.display = "none";
    }
  }

  return (
    <>
      <div style={{ padding: "15px" }}>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <img
                  style={{ width: "40px", paddingRight: "8px" }}
                  src={comment.userProfileName || defaultProfile}
                  alt="프로필사진"
                />
                <p>{comment.userId}</p>
              </div>
              <p style={{ fontSize: "0.8rem" }}>{comment.shareReplyDate}</p>
            </div>

            <div style={{ padding: "5px" }}>{comment.shareReplyContent}</div>
            <div style={{ padding: "5px", display: "flex", float: "right" }}>
              <p onClick={togglecommentreply}>답글</p>
            </div>
          </div>
        </div>
        <div
          className={"rereplyContainer" + comment.shareReplyIdx}
          style={{ display: "none", marginLeft: "50px" }}
        >
          <div>
            <CommentContainer style={{ maxWidth: "410px" }} />
          </div>
          <div style={{ display: "flex" }}>
            <CommentReply />
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
