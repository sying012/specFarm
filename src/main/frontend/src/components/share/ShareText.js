import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "../styles/share/shareText.css";

const ShareText = () => {
  return (
    <div className="shareBody">
      <input className="shareTitle" placeholder="제목"></input>
      <textarea className="shareContent" placeholder="내용"></textarea>
      <div className="shareBtn">
        <Stack spacing={2} direction="row">
          <Button className="shareCancelBtn" variant="outlined">
            취소
          </Button>
          <Button className="shareRegBtn" variant="contained">
            등록
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default ShareText;
