import React from "react";
import defaultProfile from "../../images/defaultProfile.png";
import { OutlinedInput, IconButton } from "@mui/material";
import Send from "@mui/icons-material/Send";

const AskReplyRegBox = ({ style }) => {
  return (
    <div id="askReplyRegBox" className="askReplyBox" style={style}>
      <img id="profileImg" src={defaultProfile} alt="프로필사진" />
      <form action="" id="replyRegForm">
        <OutlinedInput
          name="askReplyContent"
          multiline={true}
          minRows="1"
          maxRows="5"
          style={{ width: "100%", padding: "10px", fontSize: "0.9rem" }}
        ></OutlinedInput>
        <IconButton
          style={{
            width: "40px",
            height: "40px",
          }}
        >
          <Send />
        </IconButton>
      </form>
    </div>
  );
};

export default AskReplyRegBox;
