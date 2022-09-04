import React, { useState } from "react";
import askWriteTop from "../../images/askWriteTop.png";
import askWriteBottom from "../../images/askWriteBottom.png";
import { TextField, Button, createTheme } from "@mui/material";
import Editer from "../Editer";

const AskReg = ({ certNames }) => {
  const [contentValue, setContentValue] = useState("");
  const handleContentValue = (value) => {
    setContentValue(value);
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
    <div id="container">
      <div id="RegContainer">
        <div id="certContainer">
          <form action="" id="searchCertForm">
            <TextField
              id="outlined-search"
              label="자격증 검색"
              type="search"
              style={{
                width: "80%",
                borderRadius: "30px",
              }}
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
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
          </form>
          <div id="certResultContainer">
            {certNames.map((cert) => (
              <div className="certItem">{cert.certName}</div>
            ))}
          </div>
        </div>
        <div id="writeContainer">
          <img
            src={askWriteTop}
            alt=""
            style={{ display: "block", maxWidth: "800px", width: "100%" }}
          />
          <div id="writeContent">
            <form action="#" id="regAskForm" method="post">
              <TextField
                id="standard-basic"
                label="제목"
                variant="standard"
                required={true}
                style={{ width: "100%" }}
                name="askTitle"
                autoComplete="off"
                sx={{
                  "& .MuiInputBase-root": {
                    "&.Mui-focused fieldset": {
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

              <input
                type="hidden"
                id="askContent"
                name="askContent"
                value={contentValue}
                required={true}
              />
              <Editer
                placeholder="내용을 입력하세요"
                value={contentValue}
                onChange={handleContentValue}
              ></Editer>
              <div className="askbtnBox">
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  href="/mypage"
                  theme={theme}
                  className="askRegButton"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  theme={theme}
                  className="askRegButton"
                >
                  등록
                </Button>
              </div>
            </form>
          </div>
          <img
            src={askWriteBottom}
            alt=""
            style={{ display: "block", maxWidth: "800px", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AskReg;
