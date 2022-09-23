import React, { useState } from "react";
import styles from "../../styles/share/comment.module.css";
import SmallInfo from "../mypage/SmallInfo";

//대댓글 출력
const CommentReply = ({ commentReply }) => {
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
    <div className={styles.commentReplyTop}>
      <div className={styles.commentReplyBox}>
        <img
          src={`/upload/profile/${commentReply.user.userProfileName}`}
          alt="프로필사진"
          onClick={(e) => userSmallInfo(e)}
        />
        <div className={styles.commentReplyText}>
          <span className={styles.CommentReplyNick}>
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={(e) => userSmallInfo(e)}
            >
              {commentReply.user.userNick}
            </p>
            <div
              onClick={(e) => userSmallInfo(e)}
              style={{
                position: "absolute",
                marginLeft: "105px",
                marginTop: "-65px",
              }}
            >
              {infoVisible && (
                <SmallInfo user={commentReply.user} id="smallInfo" />
              )}
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
          </span>
          <p>{commentReply.shareReReplyContent}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
