import React, { useState } from "react";
import Editer from "../Editer";
import { TextField, Button, createTheme } from "@mui/material";

const RegNotice = ({ insertNotice }) => {
  const [noticeContent, setNoticeContent] = useState("");
  const handleContent = (value) => {
    setNoticeContent(value);
  };

  const submitNotice = (e) => {
    let noticeForm = new FormData(e.target);
    console.log(noticeForm.get("noticeContent"));
    e.preventDefault();
    insertNotice(noticeForm);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d5902",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div id="noticeRegContainer">
      <form
        onSubmit={submitNotice}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <input type="hidden" name="noticeContent" value={noticeContent || ""} />
        <TextField
          id="standard-basic"
          name="noticeTitle"
          label="제목"
          variant="standard"
          autoComplete="off"
          fullWidth
          required
          sx={{
            "& .MuiInput-root": {
              "&:after": {
                borderColor: "#8cbf75",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#1d5902",
              },
            },
          }}
        />
        <Editer
          placeholder={"내용"}
          place="cs/notice"
          value={noticeContent}
          onChange={handleContent}
        ></Editer>
        <div className="btnBox">
          <Button
            type="button"
            variant="outlined"
            color="primary"
            href="/cs"
            theme={theme}
            className="noticeRegButton"
          >
            취소
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            theme={theme}
            className="noticeRegButton"
          >
            등록
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegNotice;
