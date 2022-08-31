import React, { useState } from "react";
import Editer from "../Editer";
import { TextField } from "@mui/material";

const RegNotice = () => {
  const [noticeContent, setNoticeContent] = useState("");
  const handleContent = (value) => {
    setNoticeContent(value);
  };

  return (
    <div id="noticeRegContainer">
      <form action="" method="post">
        <input type="hidden" name="noticeContent" value={noticeContent} />
        <TextField
          id="standard-basic"
          name="noticeTitle"
          label="제목"
          variant="standard"
          autoComplete="off"
          fullWidth
        />
        <Editer
          placeholder={"내용"}
          value={noticeContent}
          onChange={handleContent}
        ></Editer>
        <div className="noticeRegButton">
          <button type="button">취소하기</button> <button>등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default RegNotice;
