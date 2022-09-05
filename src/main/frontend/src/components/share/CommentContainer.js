import React, { useState } from "react";
import defaultProfile from "../../images/defaultProfile.png";
import { OutlinedInput, IconButton } from "@mui/material";
import Send from "@mui/icons-material/Send";
import styles from "../../styles/share/commentContainer.module.css";

const CommentContainer = ({ style }) => {
  return (
    <div className={styles.inputContainer} style={style}>
      <div className={styles.containerTop}>
        <img
          className={styles.profileImg}
          src={defaultProfile}
          alt="프로필사진"
        />
        <form action="" className={styles.RegForm}>
          <div className={styles.RegForm}>
            <OutlinedInput
              name="askReplyContent"
              multiline={true}
              minRows="1"
              maxRows="5"
              style={{ width: "100%", padding: "10px", fontSize: "0.9rem" }}
            ></OutlinedInput>
            <div className={styles.sendBtn}>
              <IconButton>
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
