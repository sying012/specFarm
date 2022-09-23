import React from "react";
import styles from "../../styles/share/comment.module.css";

//대댓글 출력
const CommentReply = ({ commentReply }) => {
  return (
    <div className={styles.commentReplyTop}>
      <div className={styles.commentReplyBox}>
        <img
          src={`/upload/profile/${commentReply.user.userProfileName}`}
          alt="프로필사진"
        />
        <div className={styles.commentReplyText}>
          <span className={styles.CommentReplyNick}>
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {commentReply.user.userNick}
            </p>

            <p
              style={{
                display: "flex",
                fontSize: "0.8rem",
                color: "rgb(100, 100, 100)",
              }}
            >
              {commentReply.shareReReplyRegDate}
            </p>
          </span>
          <p>{commentReply.shareReReplyContent}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
