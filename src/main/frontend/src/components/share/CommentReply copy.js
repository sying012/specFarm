import React from "react";
import { Stack, Avatar } from "@mui/material";
import styles from "../../styles/share/commentReply.module.css";

const CommentReply = () => {
  return (
    <>
      <div>
        <Stack direction="row" spacing={2} className={styles.writer}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <p>writer</p>
          <div>2022.00.00 10:00 PM</div>
        </Stack>
        <div>댓글 내용</div>
      </div>
    </>
  );
};

export default CommentReply;
