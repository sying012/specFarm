import React, { useState } from "react";
import { OutlinedInput, IconButton } from "@mui/material";
import Send from "@mui/icons-material/Send";
import styles from "../../styles/share/commentContainer.module.css";

//댓글 입력
const CommentContainer = ({
  user,
  share,
  style,
  insertShareReply,
  shareIdx,
  shareReplyIdx,
  insertShareCommentReply,
}) => {
  const [shareReplyContent, setShareReplyContent] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!!user.userId) {
      if (!!!shareReplyIdx) {
        let shareReply = { shareReplyContent: shareReplyContent };
        setShareReplyContent("");
        insertShareReply(shareReply, shareIdx);
      } else {
        let shareReReply = {
          shareReply: {
            shareIdx: shareIdx,
            shareReplyIdx: shareReplyIdx,
          },
          shareReReplyContent: shareReplyContent,
        };
        setShareReplyContent("");
        insertShareCommentReply(shareReReply);
      }
    } else {
      alert("로그인 후 작성할 수 있습니다.");
    }
  };

  return (
    <div className={styles.inputContainer} style={style}>
      <div className={styles.containerTop}>
        {Object.keys(user).length !== 0 ? (
          <img
            className={styles.profileImg}
            id="profileImg"
            src={`/upload/profile/${user && user.userProfileName}`}
            alt="프로필사진"
            style={{ borderRadius: "50%" }}
          />
        ) : null}
        <form className={styles.RegForm} onSubmit={handleReplySubmit}>
          <div className={styles.RegForm}>
            <OutlinedInput
              name="shareReplyContent"
              value={shareReplyContent}
              onChange={(e) => setShareReplyContent(e.target.value)}
              multiline={true}
              minRows="1"
              maxRows="5"
              style={{ width: "90%", padding: "10px", fontSize: "0.9rem" }}
            ></OutlinedInput>
            <div className={styles.sendBtn}>
              <IconButton type="submit">
                <Send />
              </IconButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentContainer;
