import React from "react";

//대댓글 출력
const CommentReply = ({ commentReply }) => {
  return (
    <div>
      <div
        style={{
          width: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ width: "40px", paddingRight: "8px" }}
            src={`/upload/profile/${commentReply.user.userProfileName}`}
            alt="프로필사진"
          />
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {commentReply.user.userNick}
          </p>
        </div>
        <p
          style={{
            display: "flex",
            fontSize: "0.8rem",
            color: "rgb(100, 100, 100)",
          }}
        >
          {commentReply.shareReReplyRegDate}
        </p>
      </div>
      <div>{commentReply.shareReReplyContent}</div>
    </div>
  );
};

export default CommentReply;
